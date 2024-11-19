import os
import sqlite3
import json

DB_PATH = os.path.join(os.path.dirname(__file__), "database.db")
JSON_PATH = os.path.join(os.path.dirname(__file__), "../frontend/src/data/products.json")

# Create or connect to the database
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Create the products table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            price REAL,
            discountPercentage REAL,
            thumbnail TEXT
        )
    """)

    # Create the cart table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS cart (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            productId INTEGER,
            quantity INTEGER,
            FOREIGN KEY(productId) REFERENCES products(id)
        )
    """)

    # Load data from the products JSON file
    try:
        with open(JSON_PATH, "r") as file:
            data = json.load(file)
            products = data.get("products", [])
            
            # Insert products into the database
            for product in products:
                cursor.execute("""
                    INSERT INTO products (id, title, price, discountPercentage, thumbnail)
                    VALUES (?, ?, ?, ?, ?)
                """, (
                    product["id"], 
                    product["title"], 
                    product["price"], 
                    product["discountPercentage"], 
                    product["thumbnail"]
                ))
                
    except Exception as e:
        print(f"Error loading products: {e}")

    # Commit changes and close the connection
    conn.commit()
    conn.close()
    print("Database initialized successfully.")

if __name__ == '__main__':
    init_db()
