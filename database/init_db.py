import sqlite3

# Create or connect to the database
def init_db():
    conn = sqlite3.connect('database/mydatabase.db')
    cursor = conn.cursor()

    # Create a sample table
    cursor.execute('''CREATE TABLE IF NOT EXISTS items (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT NOT NULL,
                        price REAL NOT NULL
                    )''')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
