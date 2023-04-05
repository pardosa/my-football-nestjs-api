import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The username', minimum: 5 })
  username: string;
  @ApiPropertyOptional()
  password: string;
}
