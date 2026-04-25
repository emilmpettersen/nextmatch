<script lang="ts">
    import type { PageData } from './$types';
    import MatchList from '$lib/components/MatchList.svelte';

    let { data }: { data: PageData } = $props();
</script>

<main>
    <MatchList matches={data.matches} />
</main>

<style>
    main {
        max-width: 1024px;
        margin: 0 auto;
        padding: 2rem 1rem;
        font-family: sans-serif;
    }

    h1 {
        font-size: 2rem;
        margin-bottom: 2rem;
    }
</style>