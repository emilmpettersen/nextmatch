<div class="skeleton-emblem-wrapper shimmer"></div>
<div class="skeleton-standings">
    {#each Array(20) as _}
        <div class="skeleton-row shimmer"></div>
    {/each}
</div>

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

    .skeleton-emblem-wrapper {
        height: 136px;
        border-radius: 8px 8px 0 0;
        border: 1px solid var(--color-border);
        border-bottom: none;
    }

    .skeleton-standings {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 0.5rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: 0 0 8px 8px;
    }

    .skeleton-row {
        height: 32px;
        border-radius: 4px;
    }
</style>
