import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLeagueDto } from '../typeorm/dto/create-league.dto';
import { UpdateLeagueDto } from '../typeorm/dto/update-league.dto';
import { League } from '../typeorm/entities/league.entity';
import { LeagueTeam } from '../typeorm/entities/leagueteam.entity';
import { CreateCountryDto } from 'src/typeorm/dto/create-country.dto';
import { Country } from '../typeorm/entities/country.entity';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League) private leagueRepository: Repository<League>,
    @InjectRepository(LeagueTeam)
    private leagueTeamRepository: Repository<LeagueTeam>,
    @InjectRepository(Country) private countryRepository: Repository<Country>,
  ) {}

  async create(createLeagueDto: CreateLeagueDto) {
    const createdObj = this.leagueRepository.create(createLeagueDto);
    await this.leagueRepository.save(createdObj);
    return createdObj;
  }

  async createLeagueTeam(createLeagueTeam: {
    teamId: number;
    leagueId: number;
  }): Promise<LeagueTeam> {
    const league = await this.leagueRepository.findOne({
      where: { id: createLeagueTeam.leagueId },
    });
    if (!league) {
      throw new NotFoundException();
    }
    const createdObj = this.leagueTeamRepository.create(createLeagueTeam);
    const leagueTeam = await this.leagueTeamRepository.save(createdObj);
    return leagueTeam;
  }

  async createCountry(
    id: number,
    createCountryDto: CreateCountryDto,
  ): Promise<League> {
    const league = await this.leagueRepository.findOneBy({ id });
    if (!league)
      throw new HttpException('Team Not Found', HttpStatus.BAD_REQUEST);

    const createdVenue = this.countryRepository.create(createCountryDto);
    const leagueCountry = await this.countryRepository.save(createdVenue);
    league.country = leagueCountry;
    return this.leagueRepository.save(league);
  }

  findAll(): Promise<League[]> {
    return this.leagueRepository.find({
      relations: ['country', 'teams', 'teams.country'],
    });
  }

  findOne(id: number): Promise<League | null> {
    return this.leagueRepository.findOne({
      where: { id },
      relations: ['country', 'teams', 'teams.country'],
    });
  }

  async update(id: number, updateLeagueDto: UpdateLeagueDto) {
    await this.leagueRepository.update(id, updateLeagueDto);
    return await this.leagueRepository.findOneBy({ id });
  }

  async updateCountry(id: number, countryId: number): Promise<League> {
    const team = await this.leagueRepository.findOneBy({ id });
    if (!team)
      throw new HttpException('League Not Found', HttpStatus.BAD_REQUEST);

    const country = await this.countryRepository.findOneBy({ id: countryId });
    if (!country)
      throw new HttpException('Country Not Found', HttpStatus.BAD_REQUEST);

    team.country = country;
    return this.leagueRepository.save(team);
  }

  async remove(id: number): Promise<void> {
    await this.leagueRepository.delete(id);
  }
}
