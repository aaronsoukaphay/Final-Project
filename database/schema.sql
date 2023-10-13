set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "teams" (
  "teamId" serial PRIMARY KEY,
  "teamName" text,
  "teamLogo" text,
  "teamIcon" text,
  "bannerColor" text,
  "navColor" text
);

CREATE TABLE "players" (
  "playerId" serial PRIMARY KEY,
  "teamId" integer,
  "firstName" text,
  "lastName" text
);

CREATE TABLE "products" (
  "productId" serial PRIMARY KEY,
  "playerId" integer,
  "teamId" integer,
  "category" text,
  "productImage" text,
  "productName" text,
  "price" integer,
  "gender" text
);

CREATE TABLE "carts" (
  "cartId" serial PRIMARY KEY,
  "customerId" integer,
  "productId" integer,
  "size" text,
  "quantity" integer
);

CREATE TABLE "customers" (
  "customerId" serial PRIMARY KEY,
  "username" text,
  "hashedPassword" text
);

ALTER TABLE "players" ADD FOREIGN KEY ("teamId") REFERENCES "teams" ("teamId");

ALTER TABLE "products" ADD FOREIGN KEY ("playerId") REFERENCES "players" ("playerId");

ALTER TABLE "carts" ADD FOREIGN KEY ("productId") REFERENCES "products" ("productId");
