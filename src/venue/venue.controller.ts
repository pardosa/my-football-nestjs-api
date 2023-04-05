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
import { VenueService } from './venue.service';
import { CreateVenueDto } from '../typeorm/dto/create-venue.dto';
import { UpdateVenueDto } from '../typeorm/dto/update-venue.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Venue } from '../typeorm/entities/venue.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('venue')
@Controller('venue/crud')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Venue,
  })
  async create(@Body() createVenueDto: CreateVenueDto): Promise<Venue> {
    return this.venueService.create(createVenueDto);
  }

  @Get()
  findAll() {
    return this.venueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.update(+id, updateVenueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueService.remove(id);
  }
}
