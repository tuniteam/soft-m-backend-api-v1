# SOFT-M Backend - Claude Context

## Project Overview

School and extracurricular management system for French local authorities.
**Stack:** NestJS + Prisma + PostgreSQL

## ⚠️ MANDATORY: After Each Code Update

After ANY code modification, ALWAYS update:

1. **`docs/BACKEND_PROGRESS.md`**
   - Update counters (tables, endpoints, modules)
   - Mark completed items with date
2. **`postman/SOFT-M_API.postman_collection.json`**
   - Add/update endpoints
3. **`src/main.ts`** (Swagger)
   - Add new tags/enums if needed
4. **This file** (`.claude/context.md`)
   - Update tables, enums, endpoints sections

## Conventions & Best Practices

### Code Style

- **IDs:** CUID 
- **Validation:** class-validator for DTOs
- **Documentation:** Swagger on all endpoints
- **Naming:** snake_case (DB) → camelCase (TypeScript)
- **Language:** All API messages in English (i18n handled by frontend)

### Architecture Patterns

- **Messages:** Centralized in `src/common/messages.ts`
- **Enums:** Centralized in `src/common/enums.ts`
- **DTOs:** Separate folder per module (`module/dto/`)
- **Mappers:** Separate file for entity → DTO mapping
- **Services:** Business logic only, no HTTP concerns
- **Controllers:** HTTP handling only, delegate to services

### After Each Code Update (Checklist)

1. **Swagger Documentation**
   - [ ] Add/update `@ApiOperation` with description
   - [ ] Add/update `@ApiResponse` for all status codes
   - [ ] Add/update `@ApiParam` for path parameters
   - [ ] Add/update `@ApiQuery` for query parameters
   - [ ] Verify Swagger UI at `http://localhost:3000/api/docs`

2. **Postman Collection**
   - [ ] Add new endpoints to `postman/SOFT-M_API.postman_collection.json`
   - [ ] Update existing requests if parameters changed
   - [ ] Add test scripts to save IDs (`pm.collectionVariables.set()`)
   - [ ] Test the full workflow

3. **Messages**
   - [ ] Add error messages to `src/common/messages.ts`
   - [ ] Add Swagger descriptions to `ApiMessages.swagger`

4. **Documentation**
   - [ ] Update `docs/BACKEND_PROGRESS.md`
   - [ ] Update `.claude/context.md` if new module/enum added

## 🔧 Checklist: Modifying an API Endpoint

When adding/modifying fields in an API, follow these steps in order:

### 1️⃣ Database Layer
- [ ] **Update Prisma Schema** (`prisma/schema.prisma`)
  - Add new fields to the model with correct types
  - Use `@map("snake_case")` for field names
  - Mark optional fields with `?`
- [ ] **Create Migration**
  - Run: `npx prisma migrate dev --name descriptive_name`
  - Verify migration file in `prisma/migrations/`
- [ ] **Generate Prisma Client**
  - Automatically done by migrate, or run: `npx prisma generate`

### 2️⃣ DTO Layer
- [ ] **Update Create DTO** (`dto/create-*.dto.ts`)
  - Add fields with `@ApiProperty` or `@ApiPropertyOptional`
  - Add validation decorators (`@IsString`, `@IsOptional`, etc.)
  - Add examples in `@ApiProperty({ example: "..." })`
- [ ] **Update Response DTO** (`dto/*-response.dto.ts`)
  - Add fields with `@ApiProperty` or `@ApiPropertyOptional`
  - Ensure consistency with Prisma model
- [ ] **Update Other DTOs** (Update, Query, List, etc.)
  - Add fields where relevant

### 3️⃣ Service Layer
- [ ] **Update Service Methods** (`*.service.ts`)
  - Add new fields to `create()` data object
  - Add new fields to `update()` data object (if applicable)
  - Update mapper functions if using custom mapping
  - Ensure all DTO fields are passed to Prisma

### 4️⃣ Testing Layer
- [ ] **Update Unit Tests** (`*.spec.ts`)
  - Add test for controller and DTO if needed (no test on Service)
  - Add new fields to mock data objects
  - Add new fields to test DTOs
  - Add explicit assertions for new fields
  - Verify all tests pass: `npm test`
- [ ] **Run All Tests**
  - `npm test` - All tests must pass
  - `npm run test:cov` - Check coverage (optional)

### 5️⃣ Data Layer
- [ ] **Update Seed File** (`prisma/seed.ts`)
  - Add new fields to `create` objects
  - Add new fields to `update` objects in `upsert`
  - Run seed: `npx prisma db seed`
  - Verify data in database (Prisma Studio or query)

### 6️⃣ Build & Verify
- [ ] **Build Project**
  - Build using Docker cmd
  - Fix any TypeScript errors
- [ ] **Verify API**
  - Start server using Docker
  - Test endpoint with Postman or curl
  - Check Swagger UI: `http://localhost:3000/api/docs`

### 7️⃣ Documentation
- [ ] **Update Context File** (`.claude/context.md`)
  - Add new fields to API endpoint tables
- [ ] **Update Postman Collection** (`postman/*.json`)
  - Add new fields to request bodies
  - Update example values

### ⚠️ Common Mistakes to Avoid
- ❌ Forgetting to add field in Service `create()`/`update()` methods
- ❌ Not updating `upsert` in seed.ts (both `create` AND `update`)
- ❌ Not updating test mock data
- ❌ Missing validation decorators in DTOs
- ❌ Inconsistent naming (DB snake_case vs TS camelCase)

### ✅ Verification Checklist
- [ ] Migration created and applied
- [ ] All tests pass 
- [ ] Build succeeds
- [ ] Seed runs without errors
- [ ] Data visible in database
- [ ] API returns new fields in responses

```
