import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../typeorm/entities/team.entity';
import { Venue } from '../typeorm/entities/venue.entity';
import { Country } from '../typeorm/entities/country.entity';
import { LeagueTeam } from '../typeorm/entities/leagueteam.entity';
import { League } from '../typeorm/entities/league.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, Venue, Country, LeagueTeam, League]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
