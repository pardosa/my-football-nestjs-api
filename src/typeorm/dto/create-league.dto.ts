import { ApiProperty } from '@nestjs/swagger';

export class CreateLeagueDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  logo?: string;
}
