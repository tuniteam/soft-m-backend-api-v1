# SOFT-M Backend - Contexte pour Cursor AI

## Projet

SOFT-M est un système de gestion périscolaire pour les collectivités françaises.
Backend NestJS + Prisma + PostgreSQL.

## Stack technique

- **Framework** : NestJS (Node.js)
- **ORM** : Prisma
- **Base de données** : PostgreSQL
- **Documentation API** : Swagger (OpenAPI)
- **Validation** : class-validator

## Conventions de code

- UUID pour tous les IDs
- Soft delete (deletedAt) sur les entités principales
- DTOs avec class-validator pour la validation
- Swagger decorators sur tous les endpoints
- Commentaires en français pour les règles métier
- snake_case pour les colonnes DB (@map)
- camelCase pour le code TypeScript

## Architecture ERD complète

Le projet complet comprend **54 tables** réparties en **9 domaines** :

### Domaine 1 : Référentiel Territorial
- CLIENTS (collectivités)
- SCHOOLS (écoles)
- CLASSES
- TEACHERS
- CLASS_TEACHERS
- CLASS_CLOSURES
- PUBLIC_HOLIDAYS

### Domaine 2 : Adresses
- ADDRESSES
- ENTITY_ADDRESSES (polymorphique)

### Domaine 3 : Familles et Élèves
- FAMILIES
- LEGAL_RESPONSIBLES
- FAMILY_LEGAL_RESPONSIBLES
- STUDENTS
- STUDENT_FAMILY_LINKS
- FAMILY_QUOTIENT_HISTORY
- FAMILY_PAYMENT_PROFILES
- PRICING_BRACKETS

### Domaine 4 : Services Périscolaires
- SERVICES
- CLIENT_SERVICES (services autorisés par client)
- SCHOOL_SERVICES
- CANTEEN_SETTINGS
- DAYCARE_SETTINGS
- LEISURE_CENTER_SETTINGS
- COMMUNITY_HALL_SETTINGS
- CANTEEN_MENUS
- LEISURE_ACTIVITIES
- SERVICE_PRICING
- CLASS_PRICING

### Domaine 5 : Réservations et Pointages
- SCHEDULED_ACTIVITIES
- RESERVATIONS
- ATTENDANCE
- ATTENDANCE_HISTORY
- ATTENDANCE_VALIDATION
- COMMUNITY_HALL_RESERVATIONS
- COMMUNITY_HALL_RESERVATION_ITEMS

### Domaine 6 : Facturation et Paiements
- INVOICES
- INVOICE_LINES
- INVOICE_NOTES
- INVOICE_SETTINGS
- INVOICE_VALIDATION_LOGS
- INVOICE_EXPORTS
- PAYMENTS
- PAYMENT_ALLOCATIONS
- ACCOUNTING_EXPORT_SETTINGS
- ACCOUNTING_EXPORTS

### Domaine 7 : Notifications
- NOTIFICATION_SETTINGS
- NOTIFICATION_LOGS
- MOBILE_DEVICES
- OTP_CODES

### Domaine 8 : Sécurité et Utilisateurs
- USERS
- ROLES
- PERMISSIONS
- USER_ROLES
- ROLE_PERMISSIONS

### Domaine 9 : Gestion Régionale
- REGIONS
- DEPARTEMENTS
- POSTAL_CODES
- USER_REGIONS

## Tables implémentées dans Prisma (actuellement)

- ✅ CLIENTS
- ✅ CLIENT_SERVICES

## ENUMs importants

```typescript
// Types de clients
enum ClientType {
  MAIRIE, CCAS, SYNDICAT, CENTRE_LOISIRS
}

// Statuts client
enum ClientStatus {
  DRAFT, PENDING, ACTIVE, SUSPENDED, ARCHIVED
}

// Types de services
enum ServiceType {
  CANTEEN, DAYCARE, LEISURE_CENTER, COMMUNITY_HALL
}

// Statuts réservation
enum ReservationStatus {
  CONFIRMED, WAITING, CANCELLED
}

// Statuts pointage
enum AttendanceStatus {
  PRESENT, ABSENT_JUSTIFIED, ABSENT_UNJUSTIFIED
}

// Statuts facture
enum InvoiceStatus {
  DRAFT, VALIDATED, SENT, PAID, PARTIAL, OVERDUE, CANCELLED
}
```

## Règles métier clés

### Garde alternée simplifiée
- Un seul parent payeur par enfant (is_billing_responsible = true)
- Un seul QF utilisé (celui du parent payeur)
- Une seule facture émise par famille payeur

### Workflow Onboarding Client
1. **Étape 1** : POST /clients → status: DRAFT, onboardingStep: 1
2. **Étape 2** : PUT /clients/:id/services → onboardingStep: 2
3. **Étape 3** : POST /clients/:id/manager → status: PENDING

### Services
- Un client peut avoir 0 à 4 types de services
- maxConfigs = null signifie illimité
- Chaque service peut avoir plusieurs configurations (ex: Garderie Matin, Garderie Soir)

## Documentation disponible

Voir le dossier `docs/` pour :
- `SOFT_M_ERD_V1_1_FIXED.mermaid` : Schéma ERD complet (54 tables)
- `SOFT_M_ERD_SIMPLE_V1_1.mermaid` : Vue simplifiée
- `SOFT_M_GARDE_ALTERNEE_V1_1.mermaid` : Focus garde alternée
- `README_DIAGRAMMES_MERMAID.md` : Guide d'utilisation des ERD
