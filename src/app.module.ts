// ============================================
// SOFT-M - App Module
// Module principal de l'application
// ============================================

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { ClientsModule } from "./clients/clients.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
    PrismaModule,
    ClientsModule,
  ],
})
export class AppModule {}
