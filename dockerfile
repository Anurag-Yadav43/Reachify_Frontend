# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory for the React app
WORKDIR /app

# Copy package.json and package-lock.json (if available) and install dependencies
COPY react-fe/package.json react-fe/package-lock.json ./
RUN npm install

# Copy the entire React app into the container
COPY react-fe/ .

# Expose the port that Vite will run on (default: 5173 for development)
EXPOSE 5173

# Build the React app for production (using Vite)
RUN npm run build

# Install serve globally to serve the production build
RUN npm install -g serve

# Expose the port for serve to run on (5000)
EXPOSE 5000

# Command to run the production build using serve
CMD ["serve", "-s", "build", "-l", "5000"]
