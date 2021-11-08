import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('image', table => {
    table.dropUnique(["name"])
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('image', table => {
    table.unique(['name'])
  })
}

