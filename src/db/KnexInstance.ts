import Knex from "knex";
import config from "../../knexfile";

const environment = process.env.NODE_ENV || "development";
export const knexInstance = Knex(config[environment]);
