import type { Knex } from "knex";
require('dotenv').config()

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "mysql",
    connection: process.env.DATABASE_URL,
    debug: true
  },
}
