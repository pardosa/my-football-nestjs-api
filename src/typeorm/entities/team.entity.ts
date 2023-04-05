import { Country } from './country.entity';
import { League } from './league.entity';
import { Venue } from './venue.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
} from 'typeorm';

@Entity('Team')
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  founded: number;

  @Column({ default: false })
  national: boolean;

  @Column()
  logo: string;

  @Column({ default: false })
  winner: boolean;

  @OneToOne(() => Venue)
  @JoinColumn()
  home_base?: Venue;

  @OneToOne(() => Country)
  @JoinColumn()
  country: Country;

  @ManyToMany(() => League, (league) => league.teams, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  leagues?: League[];
}
