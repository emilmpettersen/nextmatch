<script>
    const cardCount = 6;
    const listCount = 2;
</script>

{#each Array(listCount) as _}
    <ul class="skeleton-matchlist">
        {#each Array(cardCount) as _}
            <li class="skeleton-match-card shimmer"></li>
        {/each}
    </ul>
{/each}

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

    .skeleton-matchlist {
        margin-top:2rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        list-style-type: none;
        padding: 0;
    }

    @media screen and (max-width: 1024px) {
        .skeleton-matchlist {
            grid-template-columns: 1fr;
        }
    }

    .skeleton-match-card {
        height: 140px;
        border-radius: 8px;
    }
</style>
