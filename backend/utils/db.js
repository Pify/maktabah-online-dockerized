// utils/db.js
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');
const fs = require('fs');

// Resolve db.json path
const file = path.resolve(__dirname, '..', 'db.json');

// Ensure the file exists with an empty object (if not already created)
if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({ users: [], books: [], transactions: [], lastItemId: 0 }, null, 2));
}

// Create LowDB instance
const adapter = new JSONFile(file);
const db = new Low(adapter, { users: [], books: [], transactions: [], lastItemId: 0 });

// Export an init function that sets default data
async function initDB() {
    await db.read();

    // Only set defaults if db is empty
    db.data ||= { users: [], books: [], transactions: [], lastItemId: 0 };

    await db.write();
}

module.exports = { db, initDB };
