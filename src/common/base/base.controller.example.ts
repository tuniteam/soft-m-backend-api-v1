// ============================================
// SOFT-M - Example Controller with Common Decorators
// Template à copier pour nouveaux controllers
// ============================================

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  ApiGetResponse,
  ApiPostResponse,
  ApiPutResponse,
  ApiDeleteResponse,
  ApiUuidParam,
  ApiGetById,
  ApiPutById,
  ApiDeleteById,
} from '../decorators';

// ============================================
// EXEMPLE 1 : Utilisation des décorateurs individuels
// ============================================

@ApiTags('Resources')
@Controller('resources')
export class ResourcesControllerBasic {
  // GET /resources/:id - Avec décorateurs individuels
  @Get(':id')
  @ApiOperation({ summary: 'Get resource by ID' })
  @ApiUuidParam('id', 'Resource unique identifier')
  @ApiGetResponse(Object) // Remplacer par votre DTO
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return { id, name: 'Example' };
  }

  // POST /resources - Création
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create resource' })
  @ApiPostResponse(Object) // Remplacer par votre DTO
  async create(@Body() dto: any) {
    return { id: 'new-uuid', ...dto };
  }

  // PUT /resources/:id - Modification
  @Put(':id')
  @ApiOperation({ summary: 'Update resource' })
  @ApiUuidParam('id', 'Resource unique identifier')
  @ApiPutResponse(Object) // Remplacer par votre DTO
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: any
  ) {
    return { id, ...dto };
  }

  // DELETE /resources/:id - Suppression
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete resource' })
  @ApiUuidParam('id', 'Resource unique identifier')
  @ApiDeleteResponse()
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    // Delete logic
  }
}

// ============================================
// EXEMPLE 2 : Utilisation des décorateurs combinés (recommandé)
// ============================================

@ApiTags('Resources')
@Controller('resources')
export class ResourcesControllerAdvanced {
  // GET /resources/:id - Décorateur combiné
  @Get(':id')
  @ApiOperation({ summary: 'Get resource by ID' })
  @ApiGetById('id', 'Resource unique identifier', Object)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return { id, name: 'Example' };
  }

  // PUT /resources/:id - Décorateur combiné
  @Put(':id')
  @ApiOperation({ summary: 'Update resource' })
  @ApiPutById('id', 'Resource unique identifier', Object)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: any
  ) {
    return { id, ...dto };
  }

  // DELETE /resources/:id - Décorateur combiné
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete resource' })
  @ApiDeleteById('id', 'Resource unique identifier')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    // Delete logic
  }
}

// ============================================
// EXEMPLE 3 : Pattern CRUD complet
// ============================================

@ApiTags('Resources')
@Controller('resources')
export class ResourcesControllerCRUD {
  constructor(private readonly service: any) {}

  // LIST - GET /resources
  @Get()
  @ApiOperation({ summary: 'List all resources' })
  @ApiGetResponse(Object) // Remplacer par ListResponseDto
  async findAll(@Query() query: any) {
    return this.service.findAll(query);
  }

  // READ - GET /resources/:id
  @Get(':id')
  @ApiOperation({ summary: 'Get resource by ID' })
  @ApiGetById('id', 'Resource UUID', Object)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  // CREATE - POST /resources
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create resource' })
  @ApiPostResponse(Object) // Remplacer par CreateResponseDto
  async create(@Body() dto: any) {
    return this.service.create(dto);
  }

  // UPDATE - PUT /resources/:id
  @Put(':id')
  @ApiOperation({ summary: 'Update resource' })
  @ApiPutById('id', 'Resource UUID', Object)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: any
  ) {
    return this.service.update(id, dto);
  }

  // DELETE - DELETE /resources/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete resource' })
  @ApiDeleteById('id', 'Resource UUID')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.service.delete(id);
  }
}

// ============================================
// EXEMPLE 4 : Endpoints avec relations (parent/child)
// ============================================

@ApiTags('Resources')
@Controller()
export class ResourcesWithRelationsController {
  constructor(private readonly service: any) {}

  // GET /parents/:parentId/children
  @Get('parents/:parentId/children')
  @ApiOperation({ summary: 'List children of parent' })
  @ApiUuidParam('parentId', 'Parent UUID')
  @ApiGetResponse(Object) // Remplacer par ChildListDto
  async findChildren(@Param('parentId', ParseUUIDPipe) parentId: string) {
    return this.service.findChildren(parentId);
  }

  // POST /parents/:parentId/children
  @Post('parents/:parentId/children')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create child for parent' })
  @ApiUuidParam('parentId', 'Parent UUID')
  @ApiPostResponse(Object) // Remplacer par ChildDto
  async createChild(
    @Param('parentId', ParseUUIDPipe) parentId: string,
    @Body() dto: any
  ) {
    return this.service.createChild(parentId, dto);
  }

  // PUT /children/:childId - Simplified endpoint
  @Put('children/:childId')
  @ApiOperation({ summary: 'Update child' })
  @ApiPutById('childId', 'Child UUID', Object)
  async updateChild(
    @Param('childId', ParseUUIDPipe) childId: string,
    @Body() dto: any
  ) {
    return this.service.updateChild(childId, dto);
  }

  // DELETE /children/:childId - Simplified endpoint
  @Delete('children/:childId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete child' })
  @ApiDeleteById('childId', 'Child UUID')
  async deleteChild(@Param('childId', ParseUUIDPipe) childId: string): Promise<void> {
    return this.service.deleteChild(childId);
  }
}
