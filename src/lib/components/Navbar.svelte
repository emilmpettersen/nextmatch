<script lang="ts">
    import { page } from '$app/state';
    import type { Team } from '$lib/types';
    import { slugify } from '$lib/utils';

    let { leagueTeams }: { leagueTeams: Record<string, Team[]> } = $props();

    const leagues = [
        { slug: 'premier-league', label: 'Premier League' },
        { slug: 'champions-league', label: 'Champions League' },
        { slug: 'bundesliga', label: 'Bundesliga' },
        { slug: 'la-liga', label: 'La Liga' },
    ];
</script>

<nav>
    <a href="/" class:active={page.url.pathname === '/'}>Home</a>
    {#each leagues as league}
        <div class="nav-item">
            <a
                href="/{league.slug}"
                class:active={page.url.pathname === `/${league.slug}`}
            >{league.label}</a>
            <div class="dropdown">
                {#each (leagueTeams[league.slug] ?? []).sort((a, b) => a.shortName.localeCompare(b.shortName)) as team}
                    <a class="dropdown-item" href="/{league.slug}/{slugify(team.shortName)}">
                        {#if team.crest}
                            <img src={team.crest} alt="" width="18" height="18" />
                        {/if}
                        {team.shortName}
                    </a>
                {/each}
            </div>
        </div>
    {/each}
</nav>

<style>
    nav {
        display: flex;
        align-items: center;
        padding: 0 1.5rem;
        height: 56px;
        background: var(--color-bg-card);
        border-bottom: 1px solid var(--color-border);
        position: relative;
        z-index: 100;
    }

    a {
        font-size: 0.9rem;
        font-weight: 500;
        height: 100%;
        display: flex;
        align-items: center;
        color: var(--color-text-muted);
        text-decoration: none;
        padding: 0 2rem;
        border-bottom: 2px solid transparent;
        transition: color 0.15s, border-color 0.15s;

        &:hover {
            color: #fff;
            background-color: var(--color-border);
        }

        &.active {
            color: #fff;
            border-bottom-color: var(--color-bg);
            background-color: var(--color-bg);
        }
    }

    .nav-item {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
    }

    .dropdown {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 200px;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-top: none;
        border-radius: 0 0 6px 6px;
        overflow-y: auto;
        max-height: 400px;
        z-index: 200;
    }

    .nav-item:hover .dropdown {
        display: block;
    }

    .dropdown-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        height: auto;
        font-size: 0.85rem;
        color: var(--color-text-muted);
        border-bottom: none;
        white-space: nowrap;

        &:hover {
            background-color: var(--color-border);
            color: #fff;
        }
    }
</style>
