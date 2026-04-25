import type { PageServerLoad } from "./$types";
import { fetchUpcomingMatches } from "$lib/api";
import { error } from "@sveltejs/kit";
import { FOOTBALL_DATA_API_KEY } from "$env/static/private";

export const load: PageServerLoad = async () => {
  if (!FOOTBALL_DATA_API_KEY) {
    error(
      500,
      "Football Data API key is not configured. Add FOOTBALL_DATA_API_KEY to your .env file.",
    );
  }

  const data = await fetchUpcomingMatches(FOOTBALL_DATA_API_KEY);

  return {
    matches: data.matches,
  };
};
