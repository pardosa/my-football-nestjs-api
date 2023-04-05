import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Team } from '../typeorm/entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTeamDto } from '../typeorm/dto/create-team.dto';
import { UpdateTeamDto } from '../typeorm/dto/update-team.dto';
import { Venue } from '../typeorm/entities/venue.entity';
import { CreateVenueDto } from '../typeorm/dto/create-venue.dto';
import { CreateCountryDto } from '../typeorm/dto/create-country.dto';
import { Country } from '../typeorm/entities/country.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    @InjectRepository(Venue) private venueRepository: Repository<Venue>,
    @InjectRepository(Country) private countryRepository: Repository<Country>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const createdTeam = this.teamRepository.create(createTeamDto);
    await this.teamRepository.save(createdTeam);
    return createdTeam;
  }

  async createVenue(id: number, createVenueDto: CreateVenueDto): Promise<Team> {
    const team = await this.teamRepository.findOneBy({ id });
    if (!team)
      throw new HttpException('Team Not Found', HttpStatus.BAD_REQUEST);

    const createdVenue = this.venueRepository.create(createVenueDto);
    const teamVenue = await this.venueRepository.save(createdVenue);
    team.home_base = teamVenue;
    return this.teamRepository.save(team);
  }

  async createCountry(
    id: number,
    createCountryDto: CreateCountryDto,
  ): Promise<Team> {
    const team = await this.teamRepository.findOneBy({ id });
    if (!team)
      throw new HttpException('Team Not Found', HttpStatus.BAD_REQUEST);

    const createdVenue = this.countryRepository.create(createCountryDto);
    const teamCountry = await this.countryRepository.save(createdVenue);
    team.country = teamCountry;
    return this.teamRepository.save(team);
  }

  findAll(): Promise<Team[]> {
    return this.teamRepository.find({
      relations: ['home_base', 'country', 'leagues', 'leagues.country'],
    });
  }

  findOne(id: number): Promise<Team | null> {
    return this.teamRepository.findOne({
      where: { id: id },
      relations: ['home_base', 'country', 'leagues', 'leagues.country'],
    });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    await this.teamRepository.update(id, updateTeamDto);
    return await this.teamRepository.findOneBy({ id });
  }

  async updateCountry(id: number, countryId: number): Promise<Team> {
    const team = await this.teamRepository.findOneBy({ id });
    if (!team)
      throw new HttpException('Team Not Found', HttpStatus.BAD_REQUEST);

    const country = await this.countryRepository.findOneBy({ id: countryId });
    if (!country)
      throw new HttpException('Country Not Found', HttpStatus.BAD_REQUEST);

    team.country = country;
    return this.teamRepository.save(team);
  }

  async updateVenue(id: number, venueId: number): Promise<Team> {
    const team = await this.teamRepository.findOneBy({ id });
    if (!team)
      throw new HttpException('Team Not Found', HttpStatus.BAD_REQUEST);

    const venue = await this.venueRepository.findOneBy({ id: venueId });
    if (!venue)
      throw new HttpException('Country Not Found', HttpStatus.BAD_REQUEST);

    team.home_base = venue;
    return this.teamRepository.save(team);
  }

  async remove(id: string): Promise<void> {
    await this.teamRepository.delete(id);
  }
}
