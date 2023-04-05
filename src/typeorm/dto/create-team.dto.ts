import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ description: 'The name of team', minimum: 5 })
  name: string;
  @ApiPropertyOptional()
  founded: number;
  @ApiPropertyOptional()
  national: boolean;
  @ApiPropertyOptional()
  logo: string;
  @ApiPropertyOptional()
  winner: boolean;
}
