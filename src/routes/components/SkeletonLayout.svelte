<script>
    import RecentResultsSkeleton from '$lib/components/RecentResultsSkeleton.svelte';
    import MatchListSkeleton from '$lib/components/MatchListSkeleton.svelte';
</script>

<aside class="skeleton-aside">
    <RecentResultsSkeleton />
    <RecentResultsSkeleton />
    <RecentResultsSkeleton />
</aside>
<section class="skeleton-section">
    <MatchListSkeleton />
</section>

<style>
    .skeleton-aside {
        flex: 0 0 320px;
    }

    .skeleton-section {
        flex: 1;
        min-width: 0;
    }
</style>
