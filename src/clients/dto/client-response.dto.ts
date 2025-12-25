import { ApiProperty } from '@nestjs/swagger';

export class ClientResponseDto {
  @ApiProperty({
    example: 'cjld2cjxh0000qzrmn831i7rn',
    description: 'Unique identifier',
  })
  id: string;

  @ApiProperty({
    example: 'Mairie de Saint-Cloud',
    description: 'Raison sociale',
  })
  name: string;
}
