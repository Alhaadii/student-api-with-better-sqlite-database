const Database = require("better-sqlite3");

const database = Database("database.school");

module.exports = database;
