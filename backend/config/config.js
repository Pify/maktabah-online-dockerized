require("dotenv").config();

module.exports = {
  "development": {
    "username": process.env.POSTGRES_USER || "bookkeeper",
    "password": process.env.POSTGRES_PASSWORD || "xxx",
    "database": process.env.POSTGRES_DB  || "library_db",
    "host": "library",
    "port": process.env.POSTGRES_PORT || 5432,
    "dialect": "postgres"
  },
  "test": {
    "username": "bookkeeper",
    "password": "xxx",
    "database": "library_db",
    "host": "library",
    "port": 5432,
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.POSTGRES_USER || "bookkeeper",
    "password": process.env.POSTGRES_PASSWORD || "xxx",
    "database": process.env.POSTGRES_DB  || "library_db",
    "host": "library",
    "dialect": "postgres"
  }
}
