import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from '../typeorm/dto/create-team.dto';
import { UpdateTeamDto } from '../typeorm/dto/update-team.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateVenueDto } from '../typeorm/dto/create-venue.dto';
import { CreateCountryDto } from '../typeorm/dto/create-country.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('team')
@Controller('team/crud')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Post(':id/venue')
  createTeamVenue(
    @Param('id', ParseIntPipe) id: number,
    @Body() createVenueDto: CreateVenueDto,
  ) {
    return this.teamService.createVenue(id, createVenueDto);
  }

  @Post(':id/country')
  createTeamCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCountryDto: CreateCountryDto,
  ) {
    return this.teamService.createCountry(id, createCountryDto);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Patch(':id/country/:countryId')
  updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Param('countryId', ParseIntPipe) countryId: number,
  ) {
    return this.teamService.updateCountry(+id, +countryId);
  }

  @Patch(':id/venue/:venueId')
  updateVenue(
    @Param('id', ParseIntPipe) id: number,
    @Param('venueId', ParseIntPipe) venueId: number,
  ) {
    return this.teamService.updateVenue(+id, +venueId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
