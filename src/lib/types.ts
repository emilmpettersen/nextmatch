export interface Team {
  id: number;
  name: string;
  shortName: string;
  crest: string;
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
  homeTeam: Team;
  awayTeam: Team;
  competition: Competition;
  score: Score;
}

export interface MatchesResponse {
  matches: Match[];
}
