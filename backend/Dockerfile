# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY ./src ./src
COPY ../database ../database
COPY requirements.txt  .


RUN pip install -r requirements.txt

# Copy the backend code to the container
# COPY . /app

# Expose the port the app runs on
EXPOSE 8000

# Define the command to run the app
CMD ["python", "src/server.py"]
