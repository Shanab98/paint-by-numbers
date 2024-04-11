import { knex } from "knex";

require('dotenv').config()

const dbConfig = {
    client: "mysql",
    connection: process.env.DATABASE_URL,
    debug: true
}

export const knexInstance = knex(dbConfig);
