import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('country')
@Unique(['code'])
export class Country {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  code: string;
  @Column()
  flag?: string;
}
