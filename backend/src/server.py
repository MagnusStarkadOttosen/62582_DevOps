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

from flask import Flask, send_from_directory
import os


app = Flask(__name__, static_folder="../frontend/build")


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
