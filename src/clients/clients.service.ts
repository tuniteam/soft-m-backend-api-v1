import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto, ClientResponseDto } from './dto';
import { ApiMessages } from '../common/messages';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateClientDto): Promise<ClientResponseDto> {
    // Check SIRET uniqueness
    const existing = await this.prisma.client.findUnique({
      where: { siret: dto.siret },
    });

    if (existing) {
      throw new ConflictException(ApiMessages.errors.CLIENT_SIRET_EXISTS);
    }

    // Create client (status = DRAFT by default)
    const client = await this.prisma.client.create({
      data: {
        ...dto,
        email: dto.email.toLowerCase().trim(),
      },
    });

    // Return only id and name (as per spec)
    return {
      id: client.id,
      name: client.name,
    };
  }
}
