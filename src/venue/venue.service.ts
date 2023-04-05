import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVenueDto } from '../typeorm/dto/create-venue.dto';
import { UpdateVenueDto } from '../typeorm/dto/update-venue.dto';
import { Venue } from '../typeorm/entities/venue.entity';

@Injectable()
export class VenueService {
  constructor(
    @InjectRepository(Venue) private venueRepository: Repository<Venue>,
  ) {}

  async create(createVenueDto: CreateVenueDto): Promise<Venue> {
    const createdObj = this.venueRepository.create(createVenueDto);
    await this.venueRepository.save(createdObj);
    return createdObj;
  }

  findAll(): Promise<Venue[]> {
    return this.venueRepository.find();
  }

  findOne(id: number): Promise<Venue | null> {
    return this.venueRepository.findOneBy({ id });
  }

  async update(id: number, updateVenueDto: UpdateVenueDto) {
    await this.venueRepository.update(id, updateVenueDto);
    return await this.venueRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.venueRepository.delete(id);
  }
}
