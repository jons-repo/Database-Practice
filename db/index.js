const { Pool } = require("pg");
// Set Pool information in .env file, pg knows what to look for
const pool = new Pool()

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}