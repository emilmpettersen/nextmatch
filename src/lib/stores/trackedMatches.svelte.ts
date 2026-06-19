import type { Match } from "$lib/types";

const STORAGE_KEY = "tracked-matches";

function load(): Match[] {
  if (typeof localStorage === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function createTrackedMatches() {
  let matches = $state<Match[]>([]);

  return {
    init() {
      matches = load();
    },
    get matches() {
      return matches;
    },
    toggle(match: Match) {
      const idx = matches.findIndex((m) => m.id === match.id);
      if (idx >= 0) {
        matches = matches.filter((m) => m.id !== match.id);
      } else {
        matches = [...matches, match];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
    },
    isTracked(id: number) {
      return matches.some((m) => m.id === id);
    },
  };
}

export const trackedMatches = createTrackedMatches();
