// Update with your config settings.
import { Knex } from 'knex'
import path from 'path'

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve('src/database/dev.sqlite3'),
  },
  migrations: {
    directory: path.resolve('src/database/migrations')
  }
} as Knex.Config