#!/bin/bash
# ============================================
# SOFT-M - Development Workflow Script
# ============================================
# Automatise le cycle : Build → Test → Docker Rebuild → Swagger Check
# Usage: npm run dev:workflow

set -e  # Exit on error

echo "🚀 Starting SOFT-M Development Workflow..."
echo ""

# Step 1: Build
echo "📦 Step 1/5: Building TypeScript..."
npm run build
echo "✅ Build successful"
echo ""

# Step 2: Tests
echo "🧪 Step 2/5: Running tests..."
npm test
echo "✅ Tests passed"
echo ""

# Step 3: Docker Rebuild (fast)
echo "🐳 Step 3/5: Rebuilding Docker container..."
docker-compose build api
echo "✅ Docker image built"
echo ""

# Step 4: Restart container
echo "🔄 Step 4/5: Restarting API container..."
docker-compose up -d api
echo "✅ Container restarted"
echo ""

# Step 5: Wait and check Swagger
echo "⏳ Step 5/5: Waiting for API to be ready..."
sleep 5

echo "📚 Checking Swagger documentation..."
SWAGGER_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/docs-json)

if [ "$SWAGGER_CHECK" = "200" ]; then
  echo "✅ Swagger is available at: http://localhost:3000/api/docs"
  echo ""
  echo "🎉 Workflow completed successfully!"
  echo ""
  echo "Next steps:"
  echo "  - Open Swagger UI: http://localhost:3000/api/docs"
  echo "  - Check logs: npm run docker:logs"
else
  echo "⚠️  Swagger check failed (HTTP $SWAGGER_CHECK)"
  echo "Check logs: npm run docker:logs"
  exit 1
fi
