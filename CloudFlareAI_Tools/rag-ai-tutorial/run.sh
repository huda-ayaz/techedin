#!/bin/bash

echo "Removing existing container and image..."
# Remove the container if it exists
docker rm -f match-maker-cloudflareai || true

# Remove the image if it exists
docker rmi -f match-maker-cloudflareai || true

echo "Building new image with no cache..."
# Build the image without cache
docker build --no-cache -t match-maker-cloudflareai .

echo "Running new container..."
# Run the container
docker run -d -p 8081:8081 -e CLOUDFLARE_API_KEY=your_api_key --name match-maker-cloudflareai match-maker-cloudflareai

echo "Container rebuilt and restarted."
