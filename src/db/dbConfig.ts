import { knex } from "knex";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

const dbConfig = {
  client: "mysql",
  connection: process.env.DATABASE_URL,
  debug: false,
};

export const knexInstance = knex(dbConfig);

export async function closeConnections() {
  await knexInstance.destroy();
}
