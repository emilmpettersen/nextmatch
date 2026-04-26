import type { PageServerLoad } from "./$types";
import { fetchTeams, fetchTeamMatches } from "$lib/api";
import { error } from "@sveltejs/kit";
import { FOOTBALL_DATA_API_KEY } from "$env/static/private";
import { slugify } from "$lib/utils";

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

  const teamsData = await fetchTeams(FOOTBALL_DATA_API_KEY, code);
  const team = teamsData.teams.find(
    (t) => slugify(t.shortName) === params.team,
  );

  if (!team) {
    error(404, `Unknown team: ${params.team}`);
  }

  const matchesData = await fetchTeamMatches(FOOTBALL_DATA_API_KEY, team.id);

  return {
    team,
    matches: matchesData.matches,
    league: params.league,
  };
};
