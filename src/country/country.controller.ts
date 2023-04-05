import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto } from '../typeorm/dto/create-country.dto';
import { UpdateCountryDto } from '../typeorm/dto/update-country.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Country } from '../typeorm/entities/country.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('country')
@Controller('country/crud')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Country,
  })
  async create(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countryService.create(createCountryDto);
  }

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(+id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(id);
  }
}
