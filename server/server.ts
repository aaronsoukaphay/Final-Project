/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware, authMiddleware } from './lib/index.js';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// POSTS new user information to customers table
app.post('/api/customers/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new ClientError(400, 'username and password are required fields');
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "customers" ("username", "hashedPassword")
        values ($1, $2)
        returning *
    `;
    const result = await db.query(sql, [username, hashedPassword]);
    const data = result.rows[0];
    res.status(201).json(data);
  } catch (err: any) {
    console.log(err.message);
    next(err);
  }
});

// VERIFIES that customer password and username match a customer in 'customers' table
app.post('/api/customers/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new ClientError(401, 'invalid login');
    const sql = `
      select "customerId", "hashedPassword"
        from "customers"
        where "username" = $1
    `;
    const result = await db.query(sql, [username]);
    const data = result.rows[0];
    if (!data) throw new ClientError(401, `invalid login`);
    const { customerId, hashedPassword } = data;
    if (!(await argon2.verify(hashedPassword, password)))
      throw new ClientError(401, 'invalid login');
    const payload = { customerId, password };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET!);
    res.json({ token, user: payload });
  } catch (err: any) {
    console.log(err.message);
    next(err);
  }
});

// GETS all teams that have a team logo
app.get('/api/teams', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "teams"
        where "teamLogo" != ''
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err: any) {
    next(err);
  }
});

// GETS all products in a specific category
app.get('/api/products/:category', async (req, res, next) => {
  try {
    const category = req.params.category;
    const sql = `
      select *
        from "products"
        where "category" = $1
    `;
    const result = await db.query(sql, [category]);
    const products = result.rows;
    if (!products[0]) {
      throw new ClientError(
        404,
        `cannot find products with category: ${category}`
      );
    }
    res.json(products);
  } catch (err: any) {
    next(err);
  }
});

// GETS all products from one team
app.get('/api/products/teams/:teamId', async (req, res, next) => {
  try {
    const teamId = Number(req.params.teamId);
    validateId(teamId);
    const sql = `
      select *
        from "products"
        where "teamId" = $1
    `;
    const result = await db.query(sql, [teamId]);
    const products = result.rows;
    validateResult(products[0], teamId);
    res.json(products);
  } catch (err: any) {
    next(err);
  }
});

// GETS details from one team
app.get('/api/teams/:teamId', async (req, res, next) => {
  try {
    const teamId = Number(req.params.teamId);
    validateId(teamId);
    const sql = `
      select *
        from "teams"
        where "teamId" = $1
    `;
    const result = await db.query(sql, [teamId]);
    const teamInfo = result.rows[0];
    validateResult(teamInfo, teamId);
    res.json(teamInfo);
  } catch (err: any) {
    next(err);
  }
});

// GETS details from one product
app.get('/api/products/selected/:productId', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    validateId(productId);
    const sql = `
      select *
        from "products"
        where "productId" = $1
    `;
    const result = await db.query(sql, [productId]);
    const teamInfo = result.rows[0];
    validateResult(teamInfo, productId);
    res.json(teamInfo);
  } catch (err: any) {
    next(err);
  }
});

// GETS products from 'products' table responds with matching productNames
app.get('/api/search', async (req, res, next) => {
  try {
    const { query } = req.query;
    const sql = `
      select *
        from "products"
        where lower("productName") like '%' || lower($1) || '%';
    `;
    const result = await db.query(sql, [query]);
    const foundProducts = result.rows;
    // if (!foundProducts[0]) {
    //   throw new ClientError(
    //     404,
    //     `cannot find data for data with the search: ${query}`
    //   );
    // }
    res.json(foundProducts);
  } catch (err: any) {
    next(err);
  }
});

// POSTS details from selected product into carts
app.post('/api/carts/add-to-cart', authMiddleware, async (req, res, next) => {
  try {
    const { productId, size, quantity } = req.body;
    validateId(productId);
    validateReq(size, quantity);
    const sql = `
      insert into "carts" ("customerId", "productId", "size", "quantity")
        values ($1, $2, $3, $4)
        returning *
    `;
    const result = await db.query(sql, [
      req.user!.customerId,
      productId,
      size,
      quantity,
    ]);
    const cartInfo = result.rows[0];
    validateResult(cartInfo, productId);
    res.json(cartInfo);
  } catch (err: any) {
    next(err);
  }
});

// GETS product information JOINED with quantity and subtotal for the cart
app.get('/api/carts/read-in-cart', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
      select "p"."productImage", "p"."productName", "p"."price", "c"."cartId", "c"."size", "c"."quantity"
        from "products" as "p"
        join "carts" as "c" using ("productId")
        where "customerId" = $1
    `;
    const result = await db.query(sql, [req.user!.customerId]);
    const cartInfo = result.rows;
    res.json(cartInfo);
  } catch (err: any) {
    next(err);
  }
});

// PUTS updated size and quantity into cart table
app.put('/api/carts/:cartId', authMiddleware, async (req, res, next) => {
  try {
    const cartId = Number(req.params.cartId);
    validateId(cartId);
    const { size, quantity } = req.body;
    validateReq(size, quantity);
    const sql = `
      update "carts"
        set "quantity" = $1,
            "size" = $2
        where "cartId" = $3 and "customerId" = $4
        returning *
    `;
    const result = await db.query(sql, [
      quantity,
      size,
      cartId,
      req.user!.customerId,
    ]);
    const cartInfo = result.rows[0];
    validateResult(cartInfo, cartId);
    res.json(cartInfo);
  } catch (err: any) {
    next(err);
  }
});

// DELETES selected cart from the database
app.delete('/api/carts/:cartId', authMiddleware, async (req, res, next) => {
  try {
    const cartId = Number(req.params.cartId);
    validateId(cartId);
    const sql = `
      delete
        from "carts"
        where "cartId" = $1 and "customerId" = $2
        returning *
    `;
    const result = await db.query(sql, [cartId, req.user!.customerId]);
    const cartInfo = result.rows[0];
    validateResult(cartInfo, cartId);
    res.sendStatus(204);
  } catch (err: any) {
    next(err);
  }
});

function validateId(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new ClientError(400, 'id must be a positive integer');
  }
}

const sizes = ['S', 'M', 'L', 'XL'];

function validateReq(size: string, quantity: number) {
  if (!sizes.includes(size))
    throw new ClientError(400, `${size} is not a valid size`);
  if (quantity <= 0 || !Number.isInteger(quantity))
    throw new ClientError(400, 'quantity must be a positive integer');
}

function validateResult(result: object, id: number) {
  if (!result) {
    throw new ClientError(404, `cannot find data for data with id: ${id}`);
  }
}

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Vite server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
