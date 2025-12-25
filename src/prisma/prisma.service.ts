// ============================================
// SOFT-M - Prisma Service
// Connexion à la base de données PostgreSQL
// ============================================

import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log("✅ Database connected");
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log("🔌 Database disconnected");
  }
}
