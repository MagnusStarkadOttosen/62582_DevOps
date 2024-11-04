import sqlite3
from flask import Flask, jsonify, request

app = Flask(__name__)

# Connect to the SQLite database in the new 'database/' folder
def connect_db():
    conn = sqlite3.connect('database/mydatabase.db')
    return conn

# Example route to fetch items from the database
@app.route('/items', methods=['GET'])
def get_items():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM items")
    items = cursor.fetchall()
    conn.close()
    
    return jsonify(items)

if __name__ == '__main__':
    app.run(debug=True)
