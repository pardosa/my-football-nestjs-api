import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TeamModule } from './team/team.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { VenueModule } from './venue/venue.module';
import { Team } from './typeorm/entities/team.entity';
import { Venue } from './typeorm/entities/venue.entity';
import { LeagueModule } from './league/league.module';
import { DataSource } from 'typeorm';
import { League } from './typeorm/entities/league.entity';
import { Country } from './typeorm/entities/country.entity';
import { LeagueTeam } from './typeorm/entities/leagueteam.entity';
import { User } from './typeorm/entities/user.entity';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'asdfasdf',
      database: 'football_app',
      synchronize: true,
      logging: true,
      entities: [Team, Venue, League, Country, LeagueTeam, User],
    }),
    VenueModule,
    TeamModule,
    AuthModule,
    UsersModule,
    LeagueModule,
    CountryModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
