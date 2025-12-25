# Prompts prédéfinis pour Claude/Cline

## 1. Créer un nouveau module CRUD

```
Crée le module [NOM_MODULE] avec CRUD complet.

Contexte :
- Voir .claude/context.md pour les conventions
- Voir docs/SOFT_M_ERD_V1_1_FIXED.mermaid pour le schéma de la table

Fichiers à créer :
- src/[module]/[module].module.ts
- src/[module]/[module].controller.ts
- src/[module]/[module].service.ts
- src/[module]/dto/*.dto.ts

Endpoints :
- GET /api/v1/[module] → Liste paginée
- GET /api/v1/[module]/:id → Détail
- POST /api/v1/[module] → Créer
- PUT /api/v1/[module]/:id → Modifier
- DELETE /api/v1/[module]/:id → Soft delete

Mettre à jour :
- prisma/schema.prisma
- src/app.module.ts
- src/common/messages.ts (error messages + swagger descriptions)
- src/common/enums.ts (si nouveaux enums)

⚠️ OBLIGATOIRE après création :
1. Mettre à jour postman/SOFT-M_API.postman_collection.json
2. Vérifier Swagger UI (http://localhost:3000/api/docs)
3. Mettre à jour docs/BACKEND_PROGRESS.md (tables + endpoints + date)
4. Mettre à jour .claude/context.md (tables, enums, endpoints)
```

---

## 2. Ajouter une table Prisma

```
Ajoute la table [NOM_TABLE] au schema Prisma.

Voir docs/SOFT_M_ERD_V1_1_FIXED.mermaid pour la définition.

Conventions :
- @id @default(uuid())
- @map("snake_case") pour les colonnes
- @@map("table_name") pour la table
- Relations avec @relation

⚠️ Après ajout :
1. npx prisma migrate dev --name add_[table]
2. npx prisma generate
3. Mettre à jour docs/BACKEND_PROGRESS.md
4. Mettre à jour .claude/context.md
```

---

## 3. Créer un endpoint spécifique

```
Crée l'endpoint [METHOD] /api/v1/[route].

Description : [ce que fait l'endpoint]

Tables concernées : [tables]

Règles métier :
1. [règle 1]
2. [règle 2]

DTO entrée : { ... }
DTO sortie : { ... }

⚠️ OBLIGATOIRE après création :
1. Ajouter messages dans src/common/messages.ts
2. Ajouter endpoint dans postman/SOFT-M_API.postman_collection.json
3. Vérifier Swagger UI
4. Mettre à jour docs/BACKEND_PROGRESS.md
5. Mettre à jour .claude/context.md
```

---

## 4. Corriger une erreur

```
J'ai cette erreur :
[coller l'erreur]

Fichier concerné : [chemin]

Contexte : [ce que tu faisais]
```

---

## 5. Générer les tests

```
Génère les tests unitaires pour src/[module]/[module].service.ts

Utiliser Jest.
Mocker PrismaService.
Tester les cas : succès, not found, conflit.
```

---

## 6. Mettre à jour la documentation

```
Mets à jour la documentation après ajout de [fonctionnalité] :

1. docs/BACKEND_PROGRESS.md
   - Marquer tables/endpoints comme complétés
   - Ajouter la date
   - Mettre à jour les compteurs (tables, endpoints, modules)

2. .claude/context.md
   - Ajouter nouvelles tables dans "Implemented"
   - Ajouter nouveaux enums
   - Ajouter nouveaux endpoints

3. postman/SOFT-M_API.postman_collection.json
   - Ajouter tous les nouveaux endpoints
   - Ajouter les scripts de test pour sauvegarder les IDs

4. Swagger (src/main.ts)
   - Ajouter nouveaux tags si nouveau module
   - Ajouter nouveaux enums dans la description
```

---

## 7. Revue de code complète

```
Faire une revue complète du projet :

1. Vérifier compilation : npm run build
2. Vérifier Prisma : npx prisma validate
3. Vérifier fichiers inutiles/doublons
4. Vérifier que tous les messages sont en anglais
5. Vérifier Swagger : descriptions complètes
6. Vérifier Postman : tous les endpoints présents
7. Vérifier docs/BACKEND_PROGRESS.md : à jour
```

---

## 8. Ajouter un écran frontend

```
Analyser l'écran [NOM_ECRAN] et créer les APIs nécessaires.

1. Identifier les endpoints requis
2. Créer les DTOs
3. Implémenter le service
4. Implémenter le controller
5. Mettre à jour src/common/messages.ts
6. Mettre à jour src/common/enums.ts (si besoin)

⚠️ OBLIGATOIRE après création :
7. Mettre à jour postman/SOFT-M_API.postman_collection.json
8. Vérifier Swagger UI
9. Mettre à jour docs/BACKEND_PROGRESS.md
10. Mettre à jour .claude/context.md
```

---

## 9. Checklist après chaque modification de code

```
Après chaque modification de code, vérifier :

□ Compilation : npm run build (aucune erreur)
□ Prisma : npx prisma validate (si schema modifié)
□ Messages : tous en anglais dans src/common/messages.ts
□ Swagger : descriptions complètes, vérifier http://localhost:3000/api/docs
□ Postman : tous les endpoints dans postman/SOFT-M_API.postman_collection.json
□ Progress : docs/BACKEND_PROGRESS.md à jour (compteurs, dates)
□ Context : .claude/context.md à jour (tables, enums, endpoints)
```
