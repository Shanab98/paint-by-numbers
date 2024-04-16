import type { Knex } from "knex";
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: process.env.DATABASE_URL,
    debug: true
  },
}
