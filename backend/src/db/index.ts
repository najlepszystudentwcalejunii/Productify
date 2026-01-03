import { drizzle } from "drizzle-orm/node-postgres";
import { ENV } from "../config/env";
import { Pool } from "pg";
import * as schema from "./schema";

if (!ENV.DB_URL) {
  throw new Error("DB_URL url is not set in environmental variable");
}

const pool = new Pool({ connectionString: ENV.DB_URL });

pool.on("connect", () => {
  console.log("Database connected successfully");
});

pool.on("error", (err) => {
  console.error("Error when connecting to database", err);
});

export const db = drizzle({ client: pool, schema });
