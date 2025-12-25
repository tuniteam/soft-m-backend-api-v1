import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsEmail,
  IsOptional,
  Matches,
  MaxLength,
} from 'class-validator';
import { ClientType, AccountingSystem } from '../../common/enums';

export class CreateClientDto {
  @ApiProperty({
    enum: ClientType,
    example: 'MAIRIE',
    description: 'Type de collectivité',
  })
  @IsEnum(ClientType)
  clientType: ClientType;

  @ApiProperty({
    example: '21920063500014',
    description: 'SIRET (14 digits)',
  })
  @IsString()
  @Matches(/^[0-9]{14}$/, { message: 'SIRET must contain exactly 14 digits' })
  siret: string;

  @ApiProperty({
    example: 'Mairie de Saint-Cloud',
    description: 'Raison sociale',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiProperty({
    example: 'Place Charles de Gaulle',
    description: 'Adresse',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @ApiProperty({
    example: '92210',
    description: 'Code postal (5 digits)',
  })
  @IsString()
  @Matches(/^[0-9]{5}$/, { message: 'Postal code must contain 5 digits' })
  postalCode: string;

  @ApiProperty({
    example: 'Saint-Cloud',
    description: 'Ville',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string;

  @ApiProperty({
    example: 'contact@mairie-saint-cloud.fr',
    description: 'Email de contact',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+33146021234',
    description: 'Téléphone',
  })
  @IsString()
  @Matches(/^(\+33|0)[1-9](\s?[0-9]{2}){4}$/, {
    message: 'Invalid French phone format',
  })
  phone: string;

  @ApiPropertyOptional({
    enum: AccountingSystem,
    example: 'BERGER_LEVRAULT',
    description: 'Système comptable',
  })
  @IsOptional()
  @IsEnum(AccountingSystem)
  accountingSystem?: AccountingSystem;

  @ApiPropertyOptional({
    example: 'COLL92210',
    description: 'Code collectivité (max 15 chars)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  collectivityCode?: string;

  @ApiPropertyOptional({
    example: 'BUD2024',
    description: 'Code budget (max 15 chars)',
  })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  budgetCode?: string;
}
