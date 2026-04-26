import type {
  MatchesResponse,
  StandingsResponse,
  ScorersResponse,
  TeamsResponse,
} from "./types";
import { error } from "@sveltejs/kit";

const BASE_URL = "https://api.football-data.org/v4";

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: MatchesResponse;
  expiresAt: number;
}

const cache = new Map<string, CacheEntry>();

async function apiFetch(
  url: string,
  apiKey: string,
  retries = 1,
): Promise<Response> {
  const response = await fetch(url, {
    headers: {
      "X-Auth-Token": apiKey,
    },
  });

  const remaining = response.headers.get("X-Requests-Available-Minute");
  const resetAt = response.headers.get("X-RequestCounter-Reset");

  if (response.status === 429 && retries > 0) {
    // Rate limited — wait until the counter resets then retry once
    const resetMs = resetAt
      ? parseInt(resetAt, 10) * 1000 - Date.now()
      : 60_000;
    const waitMs = Math.max(resetMs, 0) + 500; // small buffer
    await new Promise((resolve) => setTimeout(resolve, waitMs));
    return apiFetch(url, apiKey, retries - 1);
  }

  if (response.status === 429) {
    error(429, "API rate limit exceeded. Please try again in a minute.");
  }

  if (!response.ok) {
    throw new Error(
      `Football API error: ${response.status} ${response.statusText}`,
    );
  }

  // Warn in server logs when quota is getting low
  if (remaining !== null && parseInt(remaining, 10) <= 2) {
    console.warn(
      `[football-api] Only ${remaining} requests remaining this minute. Resets at ${resetAt}.`,
    );
  }

  return response;
}

export async function fetchUpcomingMatches(
  apiKey: string,
  daysBack = 3,
  daysAhead = 7,
): Promise<MatchesResponse> {
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - daysBack);
  const dateTo = new Date();
  dateTo.setDate(dateTo.getDate() + daysAhead);

  const params = new URLSearchParams({
    dateFrom: dateFrom.toISOString().split("T")[0],
    dateTo: dateTo.toISOString().split("T")[0],
  });

  const cacheKey = params.toString();
  const cached = cache.get(cacheKey);

  if (cached && Date.now() < cached.expiresAt) {
    console.log("[football-api] Returning cached matches.");
    return cached.data;
  }

  const response = await apiFetch(`${BASE_URL}/matches?${params}`, apiKey);
  const data: MatchesResponse = await response.json();

  cache.set(cacheKey, { data, expiresAt: Date.now() + CACHE_TTL_MS });

  return data;
}

interface StandingsCacheEntry {
  data: StandingsResponse;
  expiresAt: number;
}

const standingsCache = new Map<string, StandingsCacheEntry>();

export async function fetchStandings(
  apiKey: string,
  competitionCode: string,
): Promise<StandingsResponse> {
  const cached = standingsCache.get(competitionCode);
  if (cached && Date.now() < cached.expiresAt) {
    console.log(
      `[football-api] Returning cached standings for ${competitionCode}.`,
    );
    return cached.data;
  }

  const response = await apiFetch(
    `${BASE_URL}/competitions/${competitionCode}/standings`,
    apiKey,
  );
  const data: StandingsResponse = await response.json();

  standingsCache.set(competitionCode, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });

  return data;
}

interface ScorersCacheEntry {
  data: ScorersResponse;
  expiresAt: number;
}

const scorersCache = new Map<string, ScorersCacheEntry>();

export async function fetchScorers(
  apiKey: string,
  competitionCode: string,
  limit = 20,
): Promise<ScorersResponse> {
  const cacheKey = `${competitionCode}-${limit}`;
  const cached = scorersCache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt) {
    console.log(
      `[football-api] Returning cached scorers for ${competitionCode}.`,
    );
    return cached.data;
  }

  const response = await apiFetch(
    `${BASE_URL}/competitions/${competitionCode}/scorers?limit=${limit}`,
    apiKey,
  );
  const data: ScorersResponse = await response.json();

  scorersCache.set(cacheKey, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });

  return data;
}

const TEAMS_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface TeamsCacheEntry {
  data: TeamsResponse;
  expiresAt: number;
}

const teamsCache = new Map<string, TeamsCacheEntry>();

export async function fetchTeams(
  apiKey: string,
  competitionCode: string,
): Promise<TeamsResponse> {
  const cached = teamsCache.get(competitionCode);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data;
  }

  const response = await apiFetch(
    `${BASE_URL}/competitions/${competitionCode}/teams`,
    apiKey,
  );
  const data: TeamsResponse = await response.json();

  teamsCache.set(competitionCode, {
    data,
    expiresAt: Date.now() + TEAMS_CACHE_TTL_MS,
  });

  return data;
}

interface TeamMatchesCacheEntry {
  data: MatchesResponse;
  expiresAt: number;
}

const teamMatchesCache = new Map<string, TeamMatchesCacheEntry>();

export async function fetchTeamMatches(
  apiKey: string,
  teamId: number,
  daysBack = 30,
  daysAhead = 30,
): Promise<MatchesResponse> {
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() - daysBack);
  const dateTo = new Date();
  dateTo.setDate(dateTo.getDate() + daysAhead);

  const params = new URLSearchParams({
    dateFrom: dateFrom.toISOString().split("T")[0],
    dateTo: dateTo.toISOString().split("T")[0],
  });

  const cacheKey = `${teamId}-${params}`;
  const cached = teamMatchesCache.get(cacheKey);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data;
  }

  const response = await apiFetch(
    `${BASE_URL}/teams/${teamId}/matches?${params}`,
    apiKey,
  );
  const data: MatchesResponse = await response.json();

  teamMatchesCache.set(cacheKey, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });

  return data;
}
