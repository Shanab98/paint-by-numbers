import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('User', function (table) {
      table.increments('id').primary();
      table.string('username', 50).unique();
      table.string('password', 50);
      table.string('email', 320).unique();
      table.boolean('isActive');
      table
        .timestamp('createdAt')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
      table
        .timestamp('updatedAt')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable("User")
}

