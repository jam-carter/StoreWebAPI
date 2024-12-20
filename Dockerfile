# Use the Node.js base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY src ./src

# Expose the port your app runs on
EXPOSE 8080

# Set the default command to start your app
CMD ["npm", "run", "start"]
