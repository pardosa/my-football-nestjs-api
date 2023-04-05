import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { League } from './league.entity';
import { Team } from './team.entity';

@Entity('league_team')
export class LeagueTeam {
  @PrimaryColumn({ name: 'league_id' })
  leagueId: number;

  @PrimaryColumn({ name: 'team_id' })
  teamId: number;

  @ManyToOne(() => League, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn([{ name: 'league_id', referencedColumnName: 'id' }])
  leagues: League[];

  @ManyToOne(() => Team, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn([{ name: 'team_id', referencedColumnName: 'id' }])
  teams: Team[];
}
