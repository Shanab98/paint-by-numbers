import type { Knex } from "knex";
require('dotenv').config()

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: process.env.DATABASE_URL,
    debug: true
  },
}

export default config;
