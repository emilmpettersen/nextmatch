<script lang="ts">
    import { page } from '$app/stores';
    import ErrorMessage from '$lib/components/ErrorMessage.svelte';
</script>

<main>
    <ErrorMessage status={$page.status} message={$page.error?.message ?? 'An unexpected error occurred.'} />
</main>

<style>
    main {
        max-width: 1440px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }
</style>
