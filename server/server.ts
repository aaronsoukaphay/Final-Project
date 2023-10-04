/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';

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

// POSTS details from selected product into carts
app.post('/api/carts', async (req, res, next) => {
  try {
    const { productId, size, quantity } = req.body;
    validateId(productId);
    validateReq(size, quantity);
    const sql = `
      insert into "carts" ("productId", "size", "quantity")
        values ($1, $2, $3)
        returning *
    `;
    const result = await db.query(sql, [productId, size, quantity]);
    const teamInfo = result.rows[0];
    validateResult(teamInfo, productId);
    res.json(teamInfo);
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
    throw new ClientError(
      404,
      `cannot find products for team with teamId: ${id}`
    );
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
