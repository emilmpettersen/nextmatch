<script lang="ts">
    import type { PageData } from './$types';
    import MatchList from '$lib/components/MatchList.svelte';
    import RecentResults from '$lib/components/RecentResults.svelte';
    import SkeletonLayout from './components/SkeletonLayout.svelte';

    let { data }: { data: PageData } = $props();

    let search = $state('');
    const skeletonLayout = false;

    function filterMatches(matches: import('$lib/types').Match[]) {
        const query = search.trim().toLowerCase();
        return matches.filter((m) => {
            if (m.status === 'FINISHED') return false;
            if (!query) return true;
            return (
                m.homeTeam.name.toLowerCase().includes(query) ||
                m.awayTeam.name.toLowerCase().includes(query) ||
                m.competition.name.toLowerCase().includes(query)
            );
        });
    }
</script>

<main>
    <div class="search-container">
        <input
            class="search"
            type="search"
            placeholder="Search teams or leagues…"
            bind:value={search}
        />
    </div>
    <div class="layout">
        {#if skeletonLayout}
            <SkeletonLayout />
        {:else}
        {#await data.matchesData}
            <SkeletonLayout />
        {:then { matches }}
            <aside>
                <RecentResults {matches} />
            </aside>
            <section>
                
                <MatchList matches={filterMatches(matches)} />
            </section>
        {/await}
        {/if}
    </div>
</main>

<style>
    main {
        max-width: 1440px;
        margin: 0 auto;
        padding: 2rem 1rem;
        font-family: sans-serif;
    }

    .layout {
        display: flex;
        gap: 2rem;
        align-items: flex-start;
    }

    aside {
        flex: 0 0 320px;
        top: 1rem;
    }

    section {
        flex: 1;
        min-width: 0;
    }

    .search-container {
        position: fixed;
        left: 50%;
        bottom: 0px;
        transform: translateX(-50%);
        margin: 0 auto;
        width: 30%;
        z-index: 2;
        padding: 0.5rem 0.2rem 0.5rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-bottom: none;
        border-radius: 12px 12px 0 0;
    }

    .search-container::before,
    .search-container::after {
        content: '';
        position: absolute;
        bottom: 0;
        width: 24px;
        height: 24px;
        /*background: var(--color-bg);*/
        border: 1px solid var(--color-border);
        z-index:-1;
    }

    .search-container::before {
        left: -25px;
        border-radius: 0 0 50px 0;
        border-top: none;
        border-left: none;
        box-shadow: 6px 6px 0 6px var(--color-bg-card);
    }

    .search-container::after {
        right: -25px;
        border-radius: 0 0 0 50px;
        border-top: none;
        border-right: none;
        box-shadow: -6px 6px 0 6px var(--color-bg-card);
    }
    
    .search {
        width: 100%;
        box-sizing: border-box;
        padding: 0.5rem 0.75rem;
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 6px;
        color: #fff;
        font-size: 0.95rem;
        outline: none;
    }

    .search:focus {
        border-color: var(--color-primary);
    }
</style>