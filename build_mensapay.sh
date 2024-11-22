#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Print each command before executing it (for debugging)
set -x

echo "Starting build process for MensaPay platform..."

# Navigate to the ui-dashboard directory and build
echo "Building UI Dashboard..."
cd ui-dashboard || { echo "ui-dashboard directory not found!"; exit 1; }
make build
cd ..

# Navigate to the ui-payment directory and build
echo "Building UI Payment..."
cd ui-payment || { echo "ui-payment directory not found!"; exit 1; }
make build
cd ..

# Run Docker Compose to build and start the services
echo "Bringing up Docker containers with build..."
docker-compose up --build -d

echo "MensaPay platform successfully built and started!"
