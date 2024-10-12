# Use the official Node.js image from the Docker Hub
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of your application files to the container
COPY . .

# Expose the port that your application runs on
EXPOSE 3000

# Command to run your application
CMD ["node", "src/index.js"]
