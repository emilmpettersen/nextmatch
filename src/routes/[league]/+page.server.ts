// src/routes/[league]/+page.server.ts
import type { PageServerLoad } from "./$types";
import { fetchUpcomingMatches, fetchStandings, fetchScorers } from "$lib/api";
import { error } from "@sveltejs/kit";
import { FOOTBALL_DATA_API_KEY } from "$env/static/private";

const COMPETITION_MAP: Record<string, string> = {
  "champions-league": "CL",
  "premier-league": "PL",
  bundesliga: "BL1",
  "la-liga": "PD",
  "serie-a": "SA",
};

export const load: PageServerLoad = async ({ params }) => {
  const code = COMPETITION_MAP[params.league];

  if (!code) {
    error(404, `Unknown league: ${params.league}`);
  }

  return {
    league: params.league,
    pageData: Promise.all([
      fetchUpcomingMatches(FOOTBALL_DATA_API_KEY),
      fetchStandings(FOOTBALL_DATA_API_KEY, code),
      fetchScorers(FOOTBALL_DATA_API_KEY, code, 50),
    ]).then(([matchesData, standingsData, scorersData]) => ({
      matches: matchesData.matches.filter((m) => m.competition.code === code),
      standings: standingsData.standings,
      competition: standingsData.competition,
      scorers: scorersData.scorers,
    })),
  };
};
