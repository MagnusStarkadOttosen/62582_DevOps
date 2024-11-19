""" import sqlite3
from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder='../../frontend/public')

# # Connect to the SQLite database in the new 'database/' folder
# def connect_db():
#     conn = sqlite3.connect('database/mydatabase.db')
#     return conn

# # Example route to fetch items from the database
# @app.route('/items', methods=['GET'])
# def get_items():
#     conn = connect_db()
#     cursor = conn.cursor()
#     cursor.execute("SELECT * FROM items")
#     items = cursor.fetchall()
#     conn.close()
    
#     return jsonify(items)

# if __name__ == '__main__':
#     app.run(debug=True)


@app.route('/')
def hello_world():
    # return 'Hello, World!'
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
 """

import sqlite3
from flask import Flask, jsonify, send_from_directory
import os


app = Flask(__name__, static_folder="../../frontend/build")
DB_PATH = os.path.join(os.path.dirname(__file__), "../../database/database.db")


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

def connect_db():
    return sqlite3.connect(DB_PATH)

@app.route("/api/products", methods=["GET"])
def get_products():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, price, discountPercentage, thumbnail FROM products")
    rows = cursor.fetchall()
    conn.close()

    # Format rows into JSON
    products = [
        {"id": row[0], "title": row[1], "price": row[2], "discountPercentage": row[3], "thumbnail": row[4]}
        for row in rows
    ]
    return jsonify(products)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
