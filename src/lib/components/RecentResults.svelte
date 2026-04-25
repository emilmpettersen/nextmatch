<script lang="ts">
    import type { Match } from '$lib/types';

    let { matches = [] }: { matches: Match[] } = $props();

    const finished = $derived(matches.filter((m) => m.status === 'FINISHED'));

    type Group = { competition: Match['competition']; matches: Match[] };

    // The `plan` field is not included in competition objects embedded in match responses.
    // Use a hardcoded priority by competition code instead.
    const COMPETITION_PRIORITY: Record<string, number> = {
        CL: 0,  // UEFA Champions League
        PL: 1,  // Premier League
        PD: 2,  // La Liga
        BL1: 3, // Bundesliga
        SA: 4,  // Serie A
        FL1: 5, // Ligue 1
        PPL: 6, // Primeira Liga
        ELC: 7, // Championship
    };

    const grouped = $derived(
        finished
            .reduce<Group[]>((acc, match) => {
                const existing = acc.find((g) => g.competition.id === match.competition.id);
                if (existing) {
                    existing.matches.push(match);
                } else {
                    acc.push({ competition: match.competition, matches: [match] });
                }
                return acc;
            }, [])
            .sort((a, b) => {
                const prioA = COMPETITION_PRIORITY[a.competition.code] ?? 99;
                const prioB = COMPETITION_PRIORITY[b.competition.code] ?? 99;
                return prioA - prioB;
            })
    );

    const collapsed = $state(new Set<number>());

    function toggle(id: number) {
        if (collapsed.has(id)) {
            collapsed.delete(id);
        } else {
            collapsed.add(id);
        }
    }
</script>

{#if grouped.length > 0}
    <section>
        <h2>Recent Results</h2>
        {#each grouped as group}
            <div class="competition-group">
                <button class="competition-header" onclick={() => toggle(group.competition.id)}>
                    {#if group.competition.emblem}
                        <img src={group.competition.emblem} alt="" width="18" height="18" />
                    {/if}
                    <span>{group.competition.name}</span>
                    <svg class="chevron" class:open={!collapsed.has(group.competition.id)} xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
                {#if !collapsed.has(group.competition.id)}
                <ul>
                    {#each group.matches as match}
                        {@const homeWon = (match.score.fullTime.home ?? 0) > (match.score.fullTime.away ?? 0)}
                        {@const awayWon = (match.score.fullTime.away ?? 0) > (match.score.fullTime.home ?? 0)}
                        <li>
                            <div class="match-row" class:home-won={homeWon} class:away-won={awayWon}>
                                <div class="team-line">
                                    <span class="goals" class:winner={homeWon}>{match.score.fullTime.home}</span>
                                    {#if match.homeTeam.crest}
                                        <img src={match.homeTeam.crest} alt="" width="18" height="18" />
                                    {/if}
                                    <span class="name" class:winner={homeWon}>{match.homeTeam.shortName}</span>
                                </div>
                                <div class="team-line">
                                    <span class="goals" class:winner={awayWon}>{match.score.fullTime.away}</span>
                                    {#if match.awayTeam.crest}
                                        <img src={match.awayTeam.crest} alt="" width="18" height="18" />
                                    {/if}
                                    <span class="name" class:winner={awayWon}>{match.awayTeam.shortName}</span>
                                </div>
                            </div>
                        </li>
                    {/each}
                </ul>
                {/if}
            </div>
        {/each}
    </section>
{/if}

<style>
    section {
        margin-top: 2rem;
    }

    h2 {
        font-size: 1rem;
		font-weight: 600;
		color: #666;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 2rem 0 0.5rem;
    }

    .competition-group {
        margin-bottom: 1.25rem;
        border-radius:8px;
        border: 1px solid var(--color-border);
        overflow: hidden;
    }

    .competition-header {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8rem;
        font-weight: 700;
        padding: 0.4rem 0.5rem;
        background: var(--color-border);
        color: #cac8c8;
        width: 100%;
        border: none;
        cursor: pointer;
        text-align: left;
    }

    .competition-header span {
        flex: 1;
    }

    .chevron {
        transition: transform 0.2s ease;
        transform: rotate(-90deg);
        flex-shrink: 0;
    }

    .chevron.open {
        transform: rotate(0deg);
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
    }

    li {
        overflow: hidden;
    }

    li + li {
        border-top: 1px solid #2a2a2a;
    }

    .match-row {
        display: flex;
        flex-direction: column;
        padding: 0.4rem 0.6rem;
        gap: 0.3rem;
        background: var(--color-bg-card);
    }

    .team-line {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.82rem;
    }

    .goals {
        width: 1.2rem;
        text-align: right;
        font-weight: 400;
        color: #9ca3af;
        flex-shrink: 0;
    }

    .goals.winner {
        font-weight: 700;
        color: #b8c0cf;
    }

    .name {
        color: #9ca3af;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .name.winner {
        font-weight: 700;
        color: #b8c0cf;
    }

    img {
        object-fit: contain;
        flex-shrink: 0;
        filter:
            drop-shadow(0 0 1px rgba(255, 255, 255, 0.9))
            drop-shadow(0 0 1px rgba(255, 255, 255, 0.9));
    }
</style>

