<script>
    import MatchListSkeleton from '$lib/components/MatchListSkeleton.svelte';
</script>

<aside class="skeleton-aside">
    <div class="skeleton-team-header shimmer"></div>
    <div class="skeleton-squad">
        {#each Array(18) as _}
            <div class="skeleton-player-row shimmer"></div>
        {/each}
    </div>
</aside>
<section class="skeleton-section">
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

    .skeleton-team-header {
        height: 140px;
        border-radius: 8px 8px 0 0;
        border: 1px solid var(--color-border);
        border-bottom: none;
    }

    .skeleton-squad {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 0.5rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: 0 0 8px 8px;
    }

    .skeleton-player-row {
        height: 28px;
        border-radius: 4px;
    }

    .skeleton-aside {
        width: 400px;
        flex-shrink: 0;
    }

    .skeleton-section {
        flex: 1;
        min-width: 0;
    }

    </style>