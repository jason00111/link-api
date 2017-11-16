const pgp = require('pg-promise')()

const dbName = process.env.NODE_ENV === 'testing' ? 'linq-test' : 'linq'

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: dbName
})

module.exports = db
