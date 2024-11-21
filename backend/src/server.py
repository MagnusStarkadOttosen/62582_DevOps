import sqlite3
from flask import Flask, jsonify, request, send_from_directory
import os
from flask_cors import CORS
import jwt
import datetime
from functools import wraps

app = Flask(__name__, static_folder="../../frontend/build")
CORS(app, origins=["http://16.171.42.209:3000"])

# Secret key for JWT
# Replace with a secure key or environment variable
app.config["SECRET_KEY"] = "your-secret-key"
DB_PATH = os.path.join(os.path.dirname(__file__), "../database/database.db")


# Connect to the database
def connect_db():
    return sqlite3.connect(DB_PATH)


# JWT Decorator to protect routes
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Get the token from the Authorization header
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"message": "Token is missing!"}), 401

        try:
            # Decode the token
            jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired!"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token!"}), 401

        return f(*args, **kwargs)

    return decorated


# Login route to generate JWT
@app.route("/api/login", methods=["POST"])
def login():
    data = request.json  # Get username and password from the request
    username = data.get("username")
    password = data.get("password")

    # Basic validation (replace with database authentication as needed)
    if username == "admin" and password == "password123":  # Replace with real credentials
        # Generate a token
        token = jwt.encode(
            {
                "user": username,
                # Expires in 30 minutes
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            },
            app.config["SECRET_KEY"],
            algorithm="HS256",
        )
        return jsonify({"token": token})

    return jsonify({"message": "Invalid credentials!"}), 401


# Serve frontend files
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


# Protected route: Get products (requires token)
@app.route("/api/products", methods=["GET"])
@token_required  # Protect this route with JWT
def get_products():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, title, price, discountPercentage, thumbnail FROM products"
    )
    rows = cursor.fetchall()
    conn.close()

    # Format rows into JSON
    products = [
        {
            "id": row[0],
            "title": row[1],
            "price": row[2],
            "discountPercentage": row[3],
            "thumbnail": row[4],
        }
        for row in rows
    ]
    return jsonify(products)


if __name__ == "_main_":
    app.run(host="0.0.0.0", port=8000)
