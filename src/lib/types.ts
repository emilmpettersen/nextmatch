export interface SquadMember {
  id: number;
  name: string;
  position: string | null;
  dateOfBirth: string | null;
  nationality: string | null;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  crest: string;
  squad?: SquadMember[];
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  emblem: string;
}

export interface Score {
  fullTime: {
    home: number | null;
    away: number | null;
  };
  halfTime: {
    home: number | null;
    away: number | null;
  };
}

export interface Match {
  id: number;
  utcDate: string;
  status:
    | "SCHEDULED"
    | "LIVE"
    | "TIMED"
    | "IN_PLAY"
    | "PAUSED"
    | "FINISHED"
    | "CANCELLED"
    | "POSTPONED";
  minute: string | null;
  injuryTime: number | null;
  homeTeam: Team;
  awayTeam: Team;
  competition: Competition;
  score: Score;
}

export interface MatchesResponse {
  matches: Match[];
}

export interface StandingEntry {
  position: number;
  team: Team;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form: string | null;
}

export interface StandingGroup {
  stage: string;
  type: string;
  group: string | null;
  table: StandingEntry[];
}

export interface StandingsResponse {
  competition: Competition;
  standings: StandingGroup[];
}

export interface TeamsResponse {
  teams: Team[];
}

export interface ScorerPlayer {
  id: number;
  name: string;
  nationality: string | null;
  position: string | null;
}

export interface ScorerEntry {
  player: ScorerPlayer;
  team: Team;
  goals: number;
  assists: number | null;
  penalties: number | null;
}

export interface ScorersResponse {
  competition: Competition;
  scorers: ScorerEntry[];
}
