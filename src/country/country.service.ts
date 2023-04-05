import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from '../typeorm/dto/create-country.dto';
import { UpdateCountryDto } from '../typeorm/dto/update-country.dto';
import { Country } from '../typeorm/entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country) private countryRepository: Repository<Country>,
  ) {}

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const createdObj = this.countryRepository.create(createCountryDto);
    await this.countryRepository.save(createdObj);
    return createdObj;
  }

  findAll(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  findOne(id: number): Promise<Country | null> {
    return this.countryRepository.findOneBy({ id });
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    await this.countryRepository.update(id, updateCountryDto);
    return await this.countryRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.countryRepository.delete(id);
  }
}
