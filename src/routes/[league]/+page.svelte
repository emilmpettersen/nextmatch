<script lang="ts">
    import type { PageData } from './$types';
    import MatchList from '$lib/components/MatchList.svelte';
    import StandingsTable from '$lib/components/StandingsTable.svelte';
    import RecentResults from '$lib/components/RecentResults.svelte';
    import SkeletonLayout from './components/SkeletonLayout.svelte';
    import { nationalityFlag } from '$lib/utils';
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';

    let { data }: { data: PageData } = $props();

    let hoveredTeamIds = $state<number[]>([]);

    const skeletonLayout = false;
</script>

<main>
    <Breadcrumb />
    <div class="layout">
        {#if skeletonLayout}
            <SkeletonLayout />
        {:else}
        {#await data.pageData}
            <SkeletonLayout />
        {:then { standings, competition, matches, scorers }}
        {console.log(matches)}
            <aside>
                <div class="emblem-wrapper">
                    <img
                        class="emblem"
                        src={competition.emblem}
                        alt={competition.name}
                        style:height={competition.code === 'PL' ? '180px' : '120px'}
                    />
                </div>
                <StandingsTable {standings} {hoveredTeamIds}/>
                <RecentResults {matches} />
            </aside>

            <section>
                {#if scorers.length > 0}
                    {@const topScorer = scorers.reduce((best, s) => (s.goals ?? 0) > (best.goals ?? 0) ? s : best, scorers[0])}
                    {@const topAssister = scorers.reduce((best, s) => (s.assists ?? 0) > (best.assists ?? 0) ? s : best, scorers[0])}
                    <div class="stat-cards">
                        <div class="stat-card">
                            <span class="stat-label">Top Scorer</span>
                            <div class="stat-player">
                                <div class="stat-player-info">
                                    {#if topScorer.team.crest}
                                        <img src={topScorer.team.crest} alt={topScorer.team.shortName} width="24" height="24" />
                                    {/if}
                                    {#if nationalityFlag(topScorer.player.nationality)}
                                        <span class="stat-flag" title={topScorer.player.nationality ?? ''}>{nationalityFlag(topScorer.player.nationality)}</span>
                                    {/if}
                                </div>
                                <span class="stat-name">{topScorer.player.name}</span>
                            </div>
                            <span class="stat-value">{topScorer.goals} <span class="stat-unit">goals</span></span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-label">Top Assister</span>
                            <div class="stat-player">
                                <div class="stat-player-info">
                                    {#if topAssister.team.crest}
                                        <img src={topAssister.team.crest} alt={topAssister.team.shortName} width="24" height="24" />
                                    {/if}
                                    {#if nationalityFlag(topAssister.player.nationality)}
                                        <span class="stat-flag" title={topAssister.player.nationality ?? ''}>{nationalityFlag(topAssister.player.nationality)}</span>
                                    {/if}
                                </div>
                                <span class="stat-name">{topAssister.player.name}</span>
                            </div>
                            <span class="stat-value">{topAssister.assists} <span class="stat-unit">assists</span></span>
                        </div>
                    </div>
                {/if}
                <MatchList 
                    matches={matches.filter((m) => m.status !== 'FINISHED')} 
                    onTeamHover={(ids) => hoveredTeamIds = ids}
                />
            </section>
        {/await}
        {/if}

    </div>
</main>

<style>
    main {
        max-width: 1440px;
        margin: 0 auto;
        padding: 1rem;
        font-family: sans-serif;
    }

    

    .emblem-wrapper {
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        background:#1d142b;
        border-radius:8px 8px 0px 0px;
        border: 1px solid var(--color-border);
        border-bottom:none;
        padding:1rem 0;
    }

    .emblem {
        object-fit: contain;
        filter:
            drop-shadow(0 0 1px rgba(255, 255, 255, 1))
            drop-shadow(0 0 1px rgba(255, 255, 255, 1))
            drop-shadow(0 0 1px rgba(255, 255, 255, 1))
            drop-shadow(0 0 1px rgba(255, 255, 255, 1))
            drop-shadow(0 0 1px rgba(255, 255, 255, 1))
            drop-shadow(0 0 1px rgba(255, 255, 255, 1))
            drop-shadow(0 0 1px rgba(255, 255, 255, 1))
            drop-shadow(0 0 1px rgba(255, 255, 255, 1));
    }

    .layout {
        display: flex;
        gap: 2rem;
        align-items: flex-start;
    }

    aside {
        flex: 0 0 420px;
    }

    section {
        flex: 1;
        min-width: 0;
    }

    .stat-cards {
        display: flex;
        gap: 1rem;
        margin-bottom: 0.5rem;
    }

    .stat-card {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem 1.25rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: 8px;
    }

    .stat-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--color-text-muted);
    }

    .stat-player {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .stat-player-info {
        display:flex;
        align-items: center;
        gap:0.25rem;
    }

    .stat-name {
        font-size: 0.95rem;
        font-weight: 600;
        color: #fff;
    }

    .stat-flag {
        font-size: 1.25rem;
        line-height: 1;
        flex-shrink: 0;
    }

    .stat-value {
        font-size: 1.75rem;
        font-weight: 700;
        color: #fff;
        line-height: 1;
    }

    .stat-unit {
        font-size: 0.8rem;
        font-weight: 400;
        color: var(--color-text-muted);
    }

</style>