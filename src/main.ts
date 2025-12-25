// ============================================
// SOFT-M - Main Entry Point
// Point d'entrée de l'application NestJS
// ============================================

import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ============================================
  // Global Prefix
  // ============================================
  app.setGlobalPrefix("api/v1");

  // ============================================
  // Validation Pipe
  // ============================================
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés non décorées
      forbidNonWhitelisted: true, // Erreur si propriétés inconnues
      transform: true, // Transforme les types automatiquement
    })
  );

  // ============================================
  // CORS
  // ============================================
  app.enableCors({
    origin: ["http://localhost:5173", "http://localhost:3001"],
    credentials: true,
  });

  // ============================================
  // Swagger Configuration
  // ============================================
  const config = new DocumentBuilder()
    .setTitle("SOFT-M API")
    .setDescription(
      `
## Overview

REST API for SOFT-M - School and extracurricular management system for French local authorities.

## Features

- **Clients**: Manage local authorities (Mairies, CCAS, etc.)
- **Treasury**: Configure treasury and accounting system information
- **Services**: Configure available services (Canteen, Daycare, Leisure Center)
- **Users**: Manage managers and staff
- **Schools**: Manage schools and classes

## Authentication

> ⚠️ Authentication not yet implemented. JWT will be added later.

## Enums

| Enum | Values |
|------|--------|
| ClientType | MAIRIE, CCAS, SYNDICAT, CENTRE_LOISIRS |
| ClientStatus | DRAFT, PENDING, ACTIVE, SUSPENDED, ARCHIVED |
| ServiceType | CANTEEN, DAYCARE, LEISURE_CENTER, COMMUNITY_HALL |
| RoleType | SUPER_ADMIN, GESTIONNAIRE_MAIRIE, AGENT_ECOLE, CUISINIER |
| UserStatus | DRAFT, PENDING, ACTIVE, SUSPENDED, ARCHIVED |
| SchoolType | MATERNELLE, ELEMENTAIRE, GROUPE, COLLEGE, LYCEE |
| SchoolStatus | DRAFT, ACTIVE, ARCHIVED |
| AccountingSystem | MAGNUS, CIRIL, SEGILOG, BERGER_LEVRAULT, JVS, COSOLUCE, OTHER |

## Onboarding Workflow (3 Steps)

1. **Step 1**: Create client (POST /clients) → status: DRAFT
2. **Step 2**: Configure treasury (PUT /clients/{id}/treasury)
3. **Step 3**: Create manager (POST /clients/{id}/manager) → status: PENDING (auto)
4. **Activation**: When manager activates account → status: ACTIVE (auto)

Note: PENDING and ACTIVE statuses are managed automatically.
Admin can only set SUSPENDED or ARCHIVED via PATCH /clients/{id}/status.
    `
    )
    .setVersion("1.0.0")
    .setContact("SOFT-M Team", "https://soft-m.fr", "contact@soft-m.fr")
    .setLicense("Proprietary", "")
    .addTag("Clients", "Local authorities management")
    .addTag("Treasury", "Treasury and accounting system configuration")
    .addTag("Services", "Service types configuration")
    .addTag("Users", "Users and roles management")
    .addTag("Schools", "Schools and classes management")
    .addServer("http://localhost:3000", "Development")
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api/docs", app, document, {
    customSiteTitle: "SOFT-M API Documentation",
    customfavIcon: "https://nestjs.com/img/logo_text.svg",
    customCss: ".swagger-ui .topbar { display: none }",
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: "list",
      filter: true,
      showRequestDuration: true,
    },
  });

  // ============================================
  // Start Server
  // ============================================
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log("");
  console.log("🚀 ====================================");
  console.log("   SOFT-M API Server");
  console.log("====================================");
  console.log(`📡 Server:  http://localhost:${port}`);
  console.log(`📚 Swagger: http://localhost:${port}/api/docs`);
  console.log(`🔗 API:     http://localhost:${port}/api/v1`);
  console.log("====================================");
  console.log("");
}

bootstrap();
