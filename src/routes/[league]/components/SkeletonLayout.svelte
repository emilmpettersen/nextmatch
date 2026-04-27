<script>
    import StandingsTableSkeleton from '$lib/components/StandingsTableSkeleton.svelte';
    import RecentResultsSkeleton from '$lib/components/RecentResultsSkeleton.svelte';
    import MatchListSkeleton from '$lib/components/MatchListSkeleton.svelte';
</script>

<aside class="skeleton-aside">
    <StandingsTableSkeleton />
    <RecentResultsSkeleton />
</aside>
<section class="skeleton-section">
    <div class="skeleton-stat-cards">
        <div class="skeleton-stat-card shimmer"></div>
        <div class="skeleton-stat-card shimmer"></div>
    </div>
    <MatchListSkeleton />
</section>

<style>
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }

    .shimmer {
        background: linear-gradient(
            90deg,
            var(--color-bg-card) 25%,
            #2e2550 50%,
            var(--color-bg-card) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }

    .skeleton-aside {
        flex: 0 0 420px;
        position: sticky;
        top: 1rem;
    }

    .skeleton-section {
        flex: 1;
        min-width: 0;
    }

    .skeleton-stat-cards {
        display: flex;
        gap: 1rem;
        margin-bottom: 2.5rem;
    }

    .skeleton-stat-card {
        flex: 1;
        height: 100px;
        border-radius: 8px;
    }
</style>
