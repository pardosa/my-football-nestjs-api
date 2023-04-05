import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ILeague } from '../interfaces/league.interface';
import { Team } from './team.entity';
import { Country } from './country.entity';

@Entity('League')
export class League implements ILeague {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  type: string;
  @Column()
  logo?: string;

  @OneToOne(() => Country)
  @JoinColumn()
  country: Country;

  @ManyToMany(() => Team, (team) => team.leagues, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'league_team',
    joinColumn: {
      name: 'league_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'team_id',
      referencedColumnName: 'id',
    },
  })
  teams?: Team[];
}
