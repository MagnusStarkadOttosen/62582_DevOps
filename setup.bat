@echo off

REM Navigate to backend folder and set up Python environment
echo Setting up backend...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
call venv\Scripts\deactivate
cd ..

REM Navigate to frontend folder and install Node.js dependencies
echo Setting up frontend...
cd frontend
npm install
cd ..

REM Database setup
echo Setting up database...
python database\init_db.py