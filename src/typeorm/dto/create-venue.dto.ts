import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVenueDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  address: string;
  @ApiPropertyOptional()
  city: string;
  @ApiProperty()
  capacity: number;
  @ApiPropertyOptional()
  surface?: string;
  @ApiPropertyOptional()
  image?: string;
}
