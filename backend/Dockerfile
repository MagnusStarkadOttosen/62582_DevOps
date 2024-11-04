# Backend Dockerfile

# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose port 5000 for the Flask app
EXPOSE 5000

# Set the environment variable to enable development mode
ENV FLASK_ENV=development

# Run the Flask server
CMD ["flask", "run", "--host=0.0.0.0"]
