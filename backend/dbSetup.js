// dbSetup.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const db = new sqlite3.Database('./database.db');

const filePath = path.join(__dirname, '../frontend/src/data/products.json');
const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

db.serialize(() => {
  // create products table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    price REAL,
    discountPercentage REAL,
    thumbnail TEXT
  )`);
// create cart table
  db.run(`CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER,
    quantity INTEGER,
    FOREIGN KEY(productId) REFERENCES products(id)
  )`);
  const stmt = db.prepare('INSERT INTO products (id, title, price, discountPercentage, thumbnail) VALUES (?, ?, ?, ?, ?)');
  products.forEach(product => {
    stmt.run(product.id, product.title, product.price, product.discountPercentage, product.thumbnail);
  });
  stmt.finalize();

  console.log("Data has been inserted into the database.");
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Closed the database connection.");
});
