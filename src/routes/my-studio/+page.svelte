<script lang="ts">
	import { browser } from '$app/environment';
	import { trackedMatches } from '$lib/stores/trackedMatches.svelte';
    import StudioMatchList from './components/StudioMatchList.svelte';
    import LiveFeed from './components/LiveFeed.svelte';

	$effect(() => {
		if (browser) trackedMatches.init();
	});

    const selectedMatch  = trackedMatches.matches[0];
</script>

<main>
	<div class="header">
		<h1>My Studio</h1>
		<p class="subtitle">Matches you're tracking</p>
	</div>
    <div class="layout">
        <aside>
        {#if trackedMatches.matches.length === 0}
            <p class="empty">No tracked matches yet. Hit the ★ on any match to track it.</p>
        {:else}
            <StudioMatchList matches={trackedMatches.matches} />
        {/if}
        </aside>
        <section>
            <LiveFeed 
                match={selectedMatch}
                feedMessages={[
                    {type: "goal", message:"Erling Braut Haaland", minute: 38},
                    {type: "yellow-card", message:"Virgil van Dijk", minute: 24}
                ]}
            />
        </section>
    </div>

</main>

<style>
	main {
		max-width: 1440px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

    .layout {
        display: flex;
        gap: 2rem;
        align-items: flex-start;
    }

    aside {
        flex: 0 0 420px;
    }

    section {
        flex: 1;
        min-width: 0;
        min-height:70dvh;
    }

	.header {
		margin-bottom: 1.5rem;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.25rem;
	}

	.subtitle {
		font-size: 0.9rem;
		color: var(--color-text-muted);
		margin: 0;
	}

	.empty {
		color: var(--color-text-muted);
		font-size: 0.95rem;
	}
</style>
