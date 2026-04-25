<script lang="ts">
    import type { PageData } from './$types';
    import MatchList from '$lib/components/MatchList.svelte';
    import StandingsTable from '$lib/components/StandingsTable.svelte';
    import RecentResults from '$lib/components/RecentResults.svelte';

    let { data }: { data: PageData } = $props();

    const upcoming = $derived(data.matches.filter((m) => m.status !== 'FINISHED'));
</script>

<main>
    <h1>
        {#if data.competition.emblem}
            <img src={data.competition.emblem} alt="" height="80" />
        {/if}
        {data.competition.name}
    </h1>
    <div class="layout">
        <aside>
            <StandingsTable standings={data.standings} />
            <RecentResults matches={data.matches} />
        </aside>
        <section>
            <MatchList matches={upcoming} />
        </section>
    </div>
</main>

<style>
    main {
        max-width: 1440px;
        margin: 0 auto;
        padding: 2rem 1rem;
        font-family: sans-serif;
    }

    h1 {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 1.75rem;
        margin-bottom: 1.5rem;
    }

    h1 img {
        object-fit: contain;
        filter:
            drop-shadow(0 0 1px rgba(255, 255, 255, 0.9))
            drop-shadow(0 0 1px rgba(255, 255, 255, 0.9));
    }

    .layout {
        display: flex;
        gap: 2rem;
        align-items: flex-start;
    }

    aside {
        flex: 0 0 420px;
        position: sticky;
        top: 1rem;
    }

    section {
        flex: 1;
        min-width: 0;
    }
</style>