import type { LayoutServerLoad } from "./$types";
import { fetchTeams } from "$lib/api";
import { FOOTBALL_DATA_API_KEY } from "$env/static/private";
import type { Team } from "$lib/types";

const LEAGUES: { slug: string; code: string }[] = [
  { slug: "premier-league", code: "PL" },
  { slug: "champions-league", code: "CL" },
  { slug: "bundesliga", code: "BL1" },
  { slug: "la-liga", code: "PD" },
  { slug: "serie-a", code: "SA" },
];

export const load: LayoutServerLoad = async () => {
  const results = await Promise.all(
    LEAGUES.map(async ({ slug, code }) => {
      const data = await fetchTeams(FOOTBALL_DATA_API_KEY, code);
      return [slug, data.teams] as [string, Team[]];
    }),
  );

  return {
    leagueTeams: Object.fromEntries(results) as Record<string, Team[]>,
  };
};
