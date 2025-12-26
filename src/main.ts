// ============================================
// SOFT-M - Main Entry Point
// Point d'entrée de l'application NestJS
// ============================================

import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/pipes/all-exceptions.filter";

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
app.useGlobalFilters(new AllExceptionsFilter());
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

## Authentication

> ⚠️ Authentication not yet implemented. JWT will be added later.

## Enums

| Enum | Values |
|------|--------|
| ClientType | MAIRIE, CCAS, SYNDICAT, CENTRE_LOISIRS |
| ClientStatus | DRAFT, ACTIVE, SUSPENDED, ARCHIVED |
| AccountingSystem | JVS, BERGER_LEVRAULT, COSOLUCE |
    `
    )
    .setVersion("1.0.0")
    .setContact("SOFT-M Team", "https://soft-m.fr", "contact@soft-m.fr")
    .setLicense("Proprietary", "")
    .addTag("Clients", "Local authorities management")
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
