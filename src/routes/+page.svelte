<script lang="ts">
    import type { PageData } from './$types';
    import MatchList from '$lib/components/MatchList.svelte';
    import RecentResults from '$lib/components/RecentResults.svelte';
    import SkeletonLayout from './components/SkeletonLayout.svelte';

    let { data }: { data: PageData } = $props();

    const skeletonLayout = false;
</script>

<main>
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
                <MatchList matches={matches.filter((m) => m.status !== 'FINISHED')} />
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

</style>