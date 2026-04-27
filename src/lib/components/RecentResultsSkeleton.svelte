<div class="skeleton-recent">
    {#each Array(5) as _}
        <div class="skeleton-result-row shimmer"></div>
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

    .skeleton-recent {
        margin-top:2.5rem;
        display: flex;
        flex-direction: column;
        border-radius: 8px;
        overflow: hidden;

    }

    .skeleton-result-row {
        height: 48px;
    }
</style>
