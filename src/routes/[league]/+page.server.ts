// src/routes/[league]/+page.server.ts
import type { PageServerLoad } from "./$types";
import { fetchUpcomingMatches } from "$lib/api";
import { error } from "@sveltejs/kit";
import { FOOTBALL_DATA_API_KEY } from "$env/static/private";

const COMPETITION_MAP: Record<string, string> = {
  "champions-league": "CL",
  "premier-league": "PL",
  bundesliga: "BL1",
  "la-liga": "PD",
};

export const load: PageServerLoad = async ({ params }) => {
  const code = COMPETITION_MAP[params.league];

  if (!code) {
    error(404, `Unknown league: ${params.league}`);
  }

  const data = await fetchUpcomingMatches(FOOTBALL_DATA_API_KEY);

  return {
    matches: data.matches.filter((m) => m.competition.code === code),
    league: params.league,
  };
};
