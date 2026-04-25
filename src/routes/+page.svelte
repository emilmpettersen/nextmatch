<script lang="ts">
    import type { PageData } from './$types';
    import MatchList from '$lib/components/MatchList.svelte';
    import RecentResults from '$lib/components/RecentResults.svelte';

    let { data }: { data: PageData } = $props();

    const upcoming = $derived(data.matches.filter((m) => m.status !== 'FINISHED'));
</script>

<main>
    <div class="layout">
        <aside>
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