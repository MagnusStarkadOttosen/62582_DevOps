# Use node to build the React app
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY frontend/ .

# Build the React app
RUN npm run build

# Serve the static files using a lightweight server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
