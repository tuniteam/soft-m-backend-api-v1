# SOFT-M Backend - Prompt Guidelines

## Language

- **Code:** English (variables, functions, comments)
- **API Messages:** English only
- **Documentation:** English preferred
- **Git commits:** English

---

## MANDATORY Rules for Every Endpoint

When creating or modifying any endpoint, you **MUST** follow these rules:

### 1. Centralize All Messages

All messages (success, error, parameters, responses, Swagger descriptions) **MUST** be defined in `src/common/messages.ts`.

```typescript
// src/common/messages.ts
export const ApiMessages = {
  errors: {
    CLIENT_NOT_FOUND: (id: string) => `Client ${id} not found`,
    // Add new error messages here
  },
  swagger: {
    clients: {
      tag: "Clients",
      create: {
        summary: "Create client",
        description: "Creates a new client",
      },
      // Add new swagger messages here
    },
    params: {
      clientId: "Client unique identifier (CUID)",
      // Add new param descriptions here
    },
    responses: {
      200: "Success",
      201: "Created successfully",
      400: "Invalid request data",
      404: "Resource not found",
      409: "Resource already exists",
    },
  },
} as const;
```

**Usage in code:**
```typescript
import { ApiMessages } from "../common/messages";

// In service
throw new NotFoundException(ApiMessages.errors.CLIENT_NOT_FOUND(id));

// In controller
@ApiOperation(ApiMessages.swagger.clients.create)
```

### 2. Update Postman Collection

After creating/updating any endpoint, you **MUST** update the Postman collection in `postman/` folder:

- File: `postman/SOFT-M-API.postman_collection.json`
- Include: request examples, expected responses, environment variables
- Group endpoints by module/tag

### 3. Update Swagger Documentation

Every endpoint **MUST** have complete Swagger documentation:

- `@ApiTags()` - Group by module
- `@ApiOperation()` - Summary and description from `ApiMessages`
- Response decorators - Use common decorators
- `@ApiProperty()` on all DTO fields with `example` and `description`

### 4. Use Common Decorators

**MANDATORY:** Use decorators from `src/common/decorators/` to reduce boilerplate.

```typescript
import {
  ApiGetResponse,
  ApiPostResponse,
  ApiPutResponse,
  ApiPatchResponse,
  ApiDeleteResponse,
  ApiListResponse,
  ApiGetById,
  ApiPutById,
  ApiDeleteById,
  ApiCuidParam,
} from "../common/decorators";

// Example usage
@Get(':id')
@ApiOperation({ summary: 'Get client' })
@ApiGetById('id', 'Client CUID', ClientResponseDto)
async findOne(@Param('id', ParseCuidPipe) id: string) { }
```

**Available decorators:**

| Decorator | Responses | Use Case |
|-----------|-----------|----------|
| `@ApiGetResponse(type)` | 200, 404 | GET single item |
| `@ApiPostResponse(type)` | 201, 400, 409 | POST create |
| `@ApiPutResponse(type)` | 200, 400, 404 | PUT update |
| `@ApiPatchResponse(type?)` | 200, 400, 404 | PATCH partial update |
| `@ApiDeleteResponse()` | 204, 404 | DELETE |
| `@ApiListResponse(type)` | 200 | GET list |
| `@ApiGetById(param, desc, type)` | Param + 200, 404 | GET by ID (combined) |
| `@ApiPutById(param, desc, type)` | Param + 200, 400, 404 | PUT by ID (combined) |
| `@ApiDeleteById(param, desc)` | Param + 204, 404 | DELETE by ID (combined) |
| `@ApiCuidParam(name, desc)` | - | CUID parameter |

---

## When Creating New Endpoints

### Required Steps Checklist

- [ ] Define messages in `src/common/messages.ts`
- [ ] Create DTOs with proper decorators
- [ ] Use common decorators in controller
- [ ] Update Postman collection in `postman/`
- [ ] Verify Swagger documentation is complete
- [ ] Export enums from `src/common/enums.ts` if new enums added

### Required Information

1. HTTP method and path
2. Request body (if any)
3. Response format
4. Error cases

### Example Prompt

```
Create endpoint POST /api/v1/clients to create a new client.
- Required fields: siret, name, clientType
- Optional fields: email, phone
- Returns: created client with ID
- Errors: 404 if not found, 409 if SIRET exists
```

---

## File Structure for New Module

```
src/[module]/
├── [module].module.ts
├── [module].controller.ts
├── [module].service.ts
└── dto/
    ├── index.ts                    # Barrel export
    ├── create-[entity].dto.ts      # Request DTO
    ├── update-[entity].dto.ts      # Partial update DTO
    ├── [entity]-response.dto.ts    # Response DTO
    └── [entity]-list.dto.ts        # List + pagination DTO
```

---

## When Modifying Existing Code

### Do

- Reference existing patterns in the codebase
- Maintain consistency with `src/common/messages.ts`
- Follow DTO structure in `src/[module]/dto/`
- Use common decorators from `src/common/decorators/`
- Update Postman collection if endpoint changes

### Don't

- Create duplicate enum definitions
- Hardcode error messages
- Mix French and English
- Duplicate Swagger response decorators manually
- Skip Postman collection update

---

## Code Review Checklist

Ask Claude to verify:

- [ ] Messages are centralized in `messages.ts`
- [ ] Common decorators are used (no manual `@ApiResponse`)
- [ ] Swagger documentation is complete
- [ ] DTOs have all required decorators
- [ ] Postman collection is updated
- [ ] No duplicate files or imports
- [ ] Enums exported from `enums.ts`

---

## Common Tasks

### Add a new table

```
Add table [name] to Prisma schema based on specifications.
Then export any new enums in src/common/enums.ts.
```

### Fix compilation errors

```
Fix TypeScript errors in src/[path]
```

### Review code quality

```
Review code in src/[module]/ for:
- Centralized messages usage
- Common decorators usage
- Swagger completeness
- Postman collection sync
```

---

## File Naming Conventions

| Type           | Pattern                  | Example                  |
| -------------- | ------------------------ | ------------------------ |
| Module         | `[name].module.ts`       | `clients.module.ts`      |
| Controller     | `[name].controller.ts`   | `clients.controller.ts`  |
| Service        | `[name].service.ts`      | `clients.service.ts`     |
| DTO (create)   | `create-[name].dto.ts`   | `create-client.dto.ts`   |
| DTO (response) | `[name]-response.dto.ts` | `client-response.dto.ts` |
| DTO (update)   | `update-[name].dto.ts`   | `update-client.dto.ts`   |
| DTO (list)     | `[name]-list.dto.ts`     | `client-list.dto.ts`     |

---

## Error Handling Pattern

```typescript
// Always use centralized messages
import { ApiMessages } from "../common/messages";

// In service
if (!entity) {
  throw new NotFoundException(ApiMessages.errors.ENTITY_NOT_FOUND(id));
}
```

---

## Controller Pattern with Common Decorators

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiMessages } from '../common/messages';
import {
  ApiGetResponse,
  ApiPostResponse,
  ApiGetById,
  ApiPutById,
  ApiDeleteById,
} from '../common/decorators';
import { ParseCuidPipe } from '../common/pipes';

const swagger = ApiMessages.swagger.clients;

@ApiTags(swagger.tag)
@Controller('clients')
export class ClientsController {
  constructor(private readonly service: ClientsService) {}

  // LIST
  @Get()
  @ApiOperation(swagger.list)
  @ApiGetResponse(ClientListResponseDto)
  async findAll(@Query() query: ClientListQueryDto) {
    return this.service.findAll(query);
  }

  // READ
  @Get(':id')
  @ApiOperation(swagger.findOne)
  @ApiGetById('id', ApiMessages.swagger.params.clientId, ClientResponseDto)
  async findOne(@Param('id', ParseCuidPipe) id: string) {
    return this.service.findOne(id);
  }

  // CREATE
  @Post()
  @ApiOperation(swagger.create)
  @ApiPostResponse(ClientResponseDto)
  async create(@Body() dto: CreateClientDto) {
    return this.service.create(dto);
  }

  // UPDATE
  @Put(':id')
  @ApiOperation(swagger.update)
  @ApiPutById('id', ApiMessages.swagger.params.clientId, ClientResponseDto)
  async update(
    @Param('id', ParseCuidPipe) id: string,
    @Body() dto: UpdateClientDto
  ) {
    return this.service.update(id, dto);
  }

  // DELETE
  @Delete(':id')
  @ApiOperation(swagger.delete)
  @ApiDeleteById('id', ApiMessages.swagger.params.clientId)
  async delete(@Param('id', ParseCuidPipe) id: string): Promise<void> {
    return this.service.delete(id);
  }
}
```

---

## DTO Decorator Patterns (MANDATORY)

### Required Imports

```typescript
// Request DTOs (validation)
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  IsBoolean,
  IsArray,
  IsEmail,
  IsUrl,
  Length,
  MaxLength,
  Min,
  Max,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsCuid } from '../common/decorators';

// Response DTOs (documentation only)
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
```

### Request DTO Pattern (Create/Update)

Every field in a Request DTO **MUST** have:

1. `@ApiProperty()` or `@ApiPropertyOptional()` with `example` and `description`
2. Validation decorators (`@IsString()`, `@IsNotEmpty()`, etc.)

```typescript
export class CreateEntityDto {
  // Required string field
  @ApiProperty({
    example: 'Example value',
    description: 'Field description',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  // Optional string field
  @ApiPropertyOptional({
    example: 'Optional value',
    description: 'Optional field description',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  // Enum field
  @ApiProperty({
    enum: EntityStatus,
    example: EntityStatus.ACTIVE,
    description: 'Status of the entity',
  })
  @IsEnum(EntityStatus)
  status: EntityStatus;

  // CUID field
  @ApiProperty({
    example: 'cjld2cjxh0000qzrmn831i7rn',
    description: 'Related entity ID',
  })
  @IsCuid()
  relatedId: string;

  // Integer with range
  @ApiProperty({
    example: 10,
    description: 'Quantity value',
    minimum: 1,
    maximum: 100,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  quantity: number;

  // Boolean field
  @ApiProperty({
    example: true,
    description: 'Whether entity is active',
  })
  @IsBoolean()
  isActive: boolean;

  // Email field
  @ApiProperty({
    example: 'user@example.com',
    description: 'Contact email',
  })
  @IsEmail()
  email: string;

  // Nested object array
  @ApiProperty({
    type: [NestedDto],
    description: 'List of nested objects',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NestedDto)
  nestedItems: NestedDto[];
}
```

### French-Specific Validation Patterns

```typescript
// SIRET (14 digits)
@ApiProperty({
  example: '12345678901234',
  description: 'SIRET number (14 digits)',
})
@IsString()
@Matches(/^[0-9]{14}$/, {
  message: 'SIRET must contain exactly 14 digits',
})
siret: string;

// SIREN (9 digits)
@ApiProperty({
  example: '123456789',
  description: 'SIREN number (9 digits)',
})
@IsString()
@Matches(/^[0-9]{9}$/, {
  message: 'SIREN must contain exactly 9 digits',
})
siren: string;

// French postal code (5 digits)
@ApiProperty({
  example: '75001',
  description: 'French postal code',
})
@IsString()
@Matches(/^[0-9]{5}$/, {
  message: 'Postal code must contain exactly 5 digits',
})
postalCode: string;

// French IBAN
@ApiProperty({
  example: 'FR7612345678901234567890123',
  description: 'French IBAN',
})
@IsString()
@Matches(/^FR[0-9]{2}[0-9A-Z]{23}$/, {
  message: 'Invalid French IBAN format',
})
iban: string;

// BIC code
@ApiProperty({
  example: 'BNPAFRPP',
  description: 'BIC/SWIFT code',
})
@IsString()
@Matches(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, {
  message: 'Invalid BIC code format',
})
bic: string;

// Phone number (10 digits)
@ApiProperty({
  example: '0612345678',
  description: 'French phone number',
})
@IsString()
@Matches(/^[0-9]{10}$/, {
  message: 'Phone must contain exactly 10 digits',
})
phone: string;

// School year format
@ApiProperty({
  example: '2024-2025',
  description: 'School year in format YYYY-YYYY',
})
@IsString()
@Matches(/^\d{4}-\d{4}$/, {
  message: 'School year must be in format YYYY-YYYY',
})
schoolYear: string;
```

### Response DTO Pattern

Response DTOs only need `@ApiProperty()` decorators (no validation):

```typescript
export class EntityResponseDto {
  @ApiProperty({
    description: 'Unique identifier',
    example: 'cjld2cjxh0000qzrmn831i7rn',
  })
  id: string;

  @ApiProperty({
    description: 'Entity name',
    example: 'Example Entity',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Optional description',
  })
  description?: string;

  @ApiProperty({
    enum: EntityStatus,
    example: EntityStatus.ACTIVE,
    description: 'Current status',
  })
  status: EntityStatus;

  @ApiProperty({
    description: 'Creation timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
  })
  updatedAt: Date;
}
```

### Query/Pagination DTO Pattern

```typescript
export class EntityListQueryDto {
  @ApiPropertyOptional({
    default: 1,
    description: 'Page number',
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    default: 10,
    description: 'Items per page',
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Search term',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: EntityStatus,
    description: 'Filter by status',
  })
  @IsOptional()
  @IsEnum(EntityStatus)
  status?: EntityStatus;
}

export class PaginationMetaDto {
  @ApiProperty({ description: 'Total number of items' })
  total: number;

  @ApiProperty({ description: 'Current page' })
  page: number;

  @ApiProperty({ description: 'Items per page' })
  limit: number;

  @ApiProperty({ description: 'Total number of pages' })
  totalPages: number;
}

export class EntityListResponseDto {
  @ApiProperty({ type: [EntityResponseDto] })
  data: EntityResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
```

### DTO Inheritance Pattern

Use NestJS mapped types for DRY code:

```typescript
import { PartialType, PickType, OmitType } from '@nestjs/swagger';

// Update DTO = all fields optional
export class UpdateEntityDto extends PartialType(CreateEntityDto) {}

// Pick specific fields
export class EntityStatusDto extends PickType(CreateEntityDto, ['status']) {}

// Omit specific fields
export class CreateEntityWithoutIdDto extends OmitType(CreateEntityDto, ['id']) {}
```

---

## Decorator Checklist

When creating/reviewing DTOs:

- [ ] Every field has `@ApiProperty` or `@ApiPropertyOptional`
- [ ] Every `@ApiProperty` has `example` and `description`
- [ ] Enums use `enum:` and `example:` in `@ApiProperty`
- [ ] Required fields have `@IsNotEmpty()`
- [ ] Optional fields have `@IsOptional()`
- [ ] Strings have `@IsString()` and `@MaxLength()`
- [ ] Numbers have `@IsInt()` or `@IsDecimal()` with `@Min()`/`@Max()`
- [ ] Arrays have `@IsArray()` with proper `{ each: true }` validators
- [ ] Nested objects have `@ValidateNested()` and `@Type()`
- [ ] French-specific fields use appropriate `@Matches()` patterns
- [ ] Query params have `@Type(() => Number)` for numeric values
- [ ] CUID fields use `@IsCuid()` decorator from `src/common/decorators`

---

## Postman Collection Structure

The Postman collection in `postman/SOFT-M-API.postman_collection.json` must follow this structure:

```json
{
  "info": {
    "name": "SOFT-M API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "variable": [
    { "key": "baseUrl", "value": "http://localhost:3000/api/v1" }
  ],
  "item": [
    {
      "name": "Clients",
      "item": [
        {
          "name": "Create Client",
          "request": {
            "method": "POST",
            "url": "{{baseUrl}}/clients",
            "header": [
              { "key": "Content-Type", "value": "application/json" }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"siret\": \"12345678901234\",\n  \"name\": \"Mairie de Paris\",\n  \"clientType\": \"MAIRIE\"\n}"
            }
          },
          "response": []
        }
      ]
    }
  ]
}
```

**Requirements:**
- Group requests by module/tag
- Include example request bodies
- Use environment variables (`{{baseUrl}}`)
- Add description for each request
- Include expected response examples

---

## See Also

- [Common Decorators README](../src/common/decorators/README.md)
- [Controller Examples](../src/common/base/base.controller.example.ts)