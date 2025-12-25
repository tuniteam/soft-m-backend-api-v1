import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto, ClientResponseDto } from './dto';
import { ApiPostResponse } from '../common/decorators';
import { ApiMessages } from '../common/messages';

const swagger = ApiMessages.swagger.clients;

@ApiTags(swagger.tag)
@Controller('clients')
export class ClientsController {
  constructor(private readonly service: ClientsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation(swagger.create)
  @ApiPostResponse(ClientResponseDto)
  async create(@Body() dto: CreateClientDto): Promise<ClientResponseDto> {
    return this.service.create(dto);
  }
}
