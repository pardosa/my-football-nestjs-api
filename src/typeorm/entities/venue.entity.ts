import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IVenue } from '../interfaces/venue.interface';

@Entity('Venue')
export class Venue implements IVenue {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  city?: string;
  @Column()
  capacity: number;
  @Column()
  surface?: string;
  @Column()
  image?: string;
}
