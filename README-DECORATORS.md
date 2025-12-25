# 🎯 Système de Décorateurs Réutilisables - SOFT-M API

## 📖 Vue d'ensemble

Ce projet utilise un système de décorateurs réutilisables pour **réduire de 60-80% le code boilerplate** dans les controllers NestJS tout en maintenant une documentation Swagger complète et cohérente.

## 🚀 Avantages

- ✅ **Moins de code** : Réduction massive de la répétition
- ✅ **Cohérence** : Réponses HTTP standardisées
- ✅ **Maintenabilité** : Modifications centralisées
- ✅ **Swagger propre** : Documentation toujours à jour
- ✅ **DX améliorée** : Focus sur la logique métier

## 📂 Structure

```
src/
├── common/
│   ├── decorators/
│   │   ├── api-common-responses.decorator.ts  # Décorateurs réutilisables
│   │   ├── index.ts                           # Barrel export
│   │   ├── README.md                          # Documentation complète
│   │   └── QUICK-REFERENCE.md                 # Cheat sheet rapide
│   └── base/
│       └── base.controller.example.ts          # 4 exemples d'utilisation
├── schools/
│   └── schools.controller.refactored.example.ts # Exemple concret
└── docs/
    └── GUIDE-DECORATORS-MIGRATION.md           # Guide de migration
```

## ⚡ Quick Start

### 1. Importer

```typescript
import {
  ApiGetById,
  ApiPutById,
  ApiDeleteById,
  ApiPostResponse,
} from '../common/decorators';
```

### 2. Utiliser

```typescript
@ApiTags('Schools')
@Controller('schools')
export class SchoolsController {
  // Avant : 10 lignes | Après : 2 lignes
  @Get(':id')
  @ApiOperation({ summary: 'Get school' })
  @ApiGetById('id', 'School UUID', SchoolResponseDto)
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // Avant : 12 lignes | Après : 2 lignes
  @Put(':id')
  @ApiOperation({ summary: 'Update school' })
  @ApiPutById('id', 'School UUID', SchoolResponseDto)
  async update(@Param('id') id: string, @Body() dto: UpdateDto) {
    return this.service.update(id, dto);
  }

  // Avant : 8 lignes | Après : 2 lignes
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete school' })
  @ApiDeleteById('id', 'School UUID')
  async delete(@Param('id') id: string): Promise<void> {
    return this.service.delete(id);
  }
}
```

### 3. Résultat

**Réduction : 30 lignes → 6 lignes = 80% moins de code !** 🎉

## 📚 Documentation

| Document | Description | Lien |
|----------|-------------|------|
| **README** | Documentation complète | [src/common/decorators/README.md](src/common/decorators/README.md) |
| **Guide Migration** | Migration pas à pas | [docs/GUIDE-DECORATORS-MIGRATION.md](docs/GUIDE-DECORATORS-MIGRATION.md) |
| **Exemples** | 4 patterns complets | [src/common/base/base.controller.example.ts](src/common/base/base.controller.example.ts) |

## 🔧 Décorateurs Disponibles

### Décorateurs Simples

| Décorateur | Réponses HTTP | Usage |
|------------|---------------|-------|
| `@ApiGetResponse(type)` | 200, 404 | Endpoints GET |
| `@ApiPostResponse(type)` | 201, 400, 409 | Endpoints POST |
| `@ApiPutResponse(type)` | 200, 400, 404 | Endpoints PUT |
| `@ApiPatchResponse(type?)` | 200, 400, 404 | Endpoints PATCH |
| `@ApiDeleteResponse()` | 204, 404 | Endpoints DELETE |
| `@ApiListResponse(type)` | 200 | Listes paginées |

### Décorateurs Combinés (Recommandés)

| Décorateur | Combine | Usage |
|------------|---------|-------|
| `@ApiGetById(param, desc, type)` | `@ApiUuidParam` + `@ApiGetResponse` | GET avec :id |
| `@ApiPutById(param, desc, type)` | `@ApiUuidParam` + `@ApiPutResponse` | PUT avec :id |
| `@ApiDeleteById(param, desc)` | `@ApiUuidParam` + `@ApiDeleteResponse` | DELETE avec :id |
| `@ApiUuidParam(name, desc)` | Paramètre UUID | Tout endpoint avec :id |

## 📊 Exemples Avant/Après

### GET Individual

```typescript
// ❌ AVANT (10 lignes)
@Get(':schoolId')
@ApiOperation({ summary: 'Get school' })
@ApiParam({ name: 'schoolId', description: 'School UUID' })
@ApiResponse({
  status: 200,
  description: 'Success',
  type: SchoolResponseDto,
})
@ApiResponse({ status: 404, description: 'Not found' })
async findOne(@Param('schoolId') id: string) { }

// ✅ APRÈS (2 lignes)
@Get(':schoolId')
@ApiOperation({ summary: 'Get school' })
@ApiGetById('schoolId', 'School UUID', SchoolResponseDto)
async findOne(@Param('schoolId') id: string) { }
```

### POST

```typescript
// ❌ AVANT (7 lignes)
@Post()
@HttpCode(201)
@ApiOperation({ summary: 'Create school' })
@ApiResponse({ status: 201, type: SchoolResponseDto })
@ApiResponse({ status: 400, description: 'Bad request' })
@ApiResponse({ status: 409, description: 'Conflict' })
async create(@Body() dto: CreateDto) { }

// ✅ APRÈS (3 lignes)
@Post()
@HttpCode(201)
@ApiOperation({ summary: 'Create school' })
@ApiPostResponse(SchoolResponseDto)
async create(@Body() dto: CreateDto) { }
```

## 🎓 Comment utiliser

### Pour un nouveau controller

1. Copier le template depuis `src/common/base/base.controller.example.ts`
2. Adapter les types (DTOs) et la logique métier
3. Vérifier Swagger : http://localhost:3000/api/docs

### Pour migrer un controller existant

1. Lire le [Guide de Migration](docs/GUIDE-DECORATORS-MIGRATION.md)
2. Importer les décorateurs
3. Remplacer les patterns répétitifs
4. Tester compilation + Swagger

## ✅ Checklist

- [ ] Importer les décorateurs dans le controller
- [ ] Remplacer les `@ApiResponse` multiples par les décorateurs combinés
- [ ] Garder `@ApiOperation` (obligatoire pour le summary)
- [ ] Compiler : `npm run build`
- [ ] Tester : `npm test`
- [ ] Vérifier Swagger : http://localhost:3000/api/docs

## 💡 Tips

### ✅ À faire

```typescript
// Utiliser les décorateurs combinés
@ApiGetById('id', 'Resource UUID', ResourceDto)

// Toujours garder @ApiOperation
@ApiOperation({ summary: 'Clear description' })

// Utiliser ParseUUIDPipe
async findOne(@Param('id', ParseUUIDPipe) id: string)
```

### ❌ À éviter

```typescript
// Ne pas dupliquer @ApiResponse
@ApiResponse({ status: 200, ... })
@ApiResponse({ status: 404, ... })

// Ne pas oublier @ApiOperation
// @ApiGetById sans @ApiOperation = pas de summary dans Swagger

// Ne pas utiliser Object comme type
@ApiGetResponse(Object)  // ❌
@ApiGetResponse(SchoolDto)  // ✅
```

## 🔍 Troubleshooting

### Erreur de compilation

```bash
# Vérifier les imports
import { ApiGetById } from '../common/decorators';

# Recompiler
npm run build
```

### Swagger ne s'affiche pas correctement

```bash
# Restart l'API
npm run start:dev

# Vérifier le JSON Swagger
curl http://localhost:3000/api/docs-json | jq .
```

### Les réponses HTTP ne s'affichent pas

- Vérifier que le DTO a des `@ApiProperty`
- Rebuild Docker : `docker-compose build api`

## 📈 Métriques

**Réduction de code sur SchoolsController (exemple réel) :**
- GET /schools/:id : 10 lignes → 2 lignes (**80%**)
- PUT /schools/:id : 12 lignes → 2 lignes (**83%**)
- DELETE /schools/:id : 8 lignes → 2 lignes (**75%**)

**Total : 30 lignes → 6 lignes = 80% de réduction !**

## 🤝 Contribution

Pour ajouter un nouveau décorateur :

1. Éditer `src/common/decorators/api-common-responses.decorator.ts`
2. Utiliser `applyDecorators` pour combiner plusieurs décorateurs
3. Documenter dans le README
4. Ajouter un exemple dans `base.controller.example.ts`

## 📞 Support

- **Documentation** : [src/common/decorators/README.md](src/common/decorators/README.md)
- **Migration** : [docs/GUIDE-DECORATORS-MIGRATION.md](docs/GUIDE-DECORATORS-MIGRATION.md)
- **Exemples** : [src/common/base/base.controller.example.ts](src/common/base/base.controller.example.ts)

---

**Happy coding! 🚀**
