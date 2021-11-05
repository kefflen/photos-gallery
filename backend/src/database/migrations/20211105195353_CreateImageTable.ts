import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('image', table => {
    table.increments('id').primary()
    table.string('name').unique().notNullable()
    table.string('path').unique().notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('image')
}

