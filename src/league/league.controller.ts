import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { LeagueService } from './league.service';
import { CreateLeagueDto } from '../typeorm/dto/create-league.dto';
import { UpdateLeagueDto } from '../typeorm/dto/update-league.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCountryDto } from 'src/typeorm/dto/create-country.dto';

@UseGuards(JwtAuthGuard)
@ApiTags('league')
@Controller('league/crud')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Post()
  create(@Body() createLeagueDto: CreateLeagueDto) {
    return this.leagueService.create(createLeagueDto);
  }

  @Post('teams')
  createLeagueTeam(
    @Body()
    createLeagueTeam: {
      teamId: number;
      leagueId: number;
    },
  ) {
    return this.leagueService.createLeagueTeam(createLeagueTeam);
  }

  @Post(':id/country')
  createLeagueCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCountryDto: CreateCountryDto,
  ) {
    return this.leagueService.createCountry(id, createCountryDto);
  }

  @Get()
  findAll() {
    return this.leagueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leagueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeagueDto: UpdateLeagueDto) {
    return this.leagueService.update(+id, updateLeagueDto);
  }

  @Patch(':id/country/:countryId')
  updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Param('countryId', ParseIntPipe) countryId: number,
  ) {
    return this.leagueService.updateCountry(+id, +countryId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leagueService.remove(+id);
  }
}
