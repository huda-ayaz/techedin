#!/bin/bash

echo "Removing existing container and image..."
# Remove the container if it exists
docker rm -f match-maker

# Remove the image if it exists
docker rmi -f match-maker

echo "Building new image with no cache..."
# Build the image without cache
docker build --no-cache -t match-maker .

echo "Running new container..."
# Run the container
docker run -d -p 8080:8080 --name match-maker match-maker

echo "Container rebuilt and restarted."
