#!/bin/bash
set -e

APP_NAME="kasoria-funnels"
PORT=3018

echo "=== Deploying $APP_NAME ==="

# Ensure pm2 log directory exists
mkdir -p logs

# Install dependencies
echo "[1/3] Installing dependencies..."
npm install

# Build the application
echo "[2/3] Building..."
npm run build

# Restart or start with pm2
echo "[3/3] Restarting pm2 process..."
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
  pm2 reload ecosystem.config.cjs --update-env
else
  pm2 start ecosystem.config.cjs
fi

pm2 save

echo "=== $APP_NAME deployed on port $PORT ==="
