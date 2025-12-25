@echo off
REM ============================================
REM SOFT-M - Development Workflow Script (Windows)
REM ============================================
REM Automatise le cycle : Build → Test → Docker Rebuild → Swagger Check
REM Usage: npm run dev:workflow

echo 🚀 Starting SOFT-M Development Workflow...
echo.

REM Step 1: Build
echo 📦 Step 1/5: Building TypeScript...
call npm run build
if %errorlevel% neq 0 exit /b %errorlevel%
echo ✅ Build successful
echo.

REM Step 2: Tests
echo 🧪 Step 2/5: Running tests...
call npm test
if %errorlevel% neq 0 exit /b %errorlevel%
echo ✅ Tests passed
echo.

REM Step 3: Docker Rebuild (fast)
echo 🐳 Step 3/5: Rebuilding Docker container...
docker-compose build api
if %errorlevel% neq 0 exit /b %errorlevel%
echo ✅ Docker image built
echo.

REM Step 4: Restart container
echo 🔄 Step 4/5: Restarting API container...
docker-compose up -d api
if %errorlevel% neq 0 exit /b %errorlevel%
echo ✅ Container restarted
echo.

REM Step 5: Wait and check Swagger
echo ⏳ Step 5/5: Waiting for API to be ready...
ping 127.0.0.1 -n 6 >nul

echo 📚 Checking Swagger documentation...
for /f %%i in ('curl -s -o nul -w "%%{http_code}" http://localhost:3000/api/docs-json') do set SWAGGER_CHECK=%%i

if "%SWAGGER_CHECK%"=="200" (
  echo ✅ Swagger is available at: http://localhost:3000/api/docs
  echo.
  echo 🎉 Workflow completed successfully!
  echo.
  echo Next steps:
  echo   - Open Swagger UI: http://localhost:3000/api/docs
  echo   - Check logs: npm run docker:logs
) else (
  echo ⚠️  Swagger check failed (HTTP %SWAGGER_CHECK%^)
  echo 💡 API may still be starting. Wait a few seconds and check:
  echo    http://localhost:3000/api/docs
  echo.
  echo Check logs: npm run docker:logs
  exit /b 0
)
