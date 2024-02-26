import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('User', function (table) {
      table.increments('id');
      table.string('username');
      table.string('password');
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

