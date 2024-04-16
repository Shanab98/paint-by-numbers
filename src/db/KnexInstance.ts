import { knex } from "knex";
import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

const dbConfig = {
  client: "mysql",
  connection: process.env.DATABASE_URL,
  debug: true,
};

export const knexInstance = knex(dbConfig);

export const closeConnections = async () => {
  await knexInstance.destroy();
};
