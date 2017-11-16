const path = require('path')
const QueryFile = require('pg-promise').QueryFile

const db = require('../database/setup');

const seedQueryFile = new QueryFile(path.join(__dirname, '../database/seed.sql'))

function seedTables () {
  return db.none(seedQueryFile)
}

function truncateTables () {
  return db.none(`TRUNCATE users RESTART IDENTITY CASCADE`)
}

function resetTables () {
  return truncateTables().then(() => seedTables())
}

module.exports = resetTables
