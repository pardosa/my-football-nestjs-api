import { Module } from '@nestjs/common';
import { LeagueService } from './league.service';
import { LeagueController } from './league.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { League } from '../typeorm/entities/league.entity';
import { Team } from '../typeorm/entities/team.entity';
import { LeagueTeam } from '../typeorm/entities/leagueteam.entity';
import { Country } from '../typeorm/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([League, Team, LeagueTeam, Country])],
  controllers: [LeagueController],
  providers: [LeagueService],
})
export class LeagueModule {}
