-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('MAIRIE', 'CCAS', 'SYNDICAT', 'CENTRE_LOISIRS');

-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('DRAFT', 'ACTIVE', 'SUSPENDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AccountingSystem" AS ENUM ('JVS', 'BERGER_LEVRAULT', 'COSOLUCE');

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "client_type" "ClientType" NOT NULL,
    "siret" VARCHAR(14) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "postal_code" VARCHAR(5) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "accounting_system" "AccountingSystem",
    "collectivity_code" VARCHAR(15),
    "budget_code" VARCHAR(15),
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "status" "ClientStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_siret_key" ON "clients"("siret");

-- CreateIndex
CREATE INDEX "clients_siret_idx" ON "clients"("siret");

-- CreateIndex
CREATE INDEX "clients_status_idx" ON "clients"("status");

-- CreateIndex
CREATE INDEX "clients_client_type_idx" ON "clients"("client_type");
