<!-- src/lib/components/Breadcrumb.svelte -->
<script lang="ts">
    import { page } from '$app/state';

    const SLUG_LABELS: Record<string, string> = {
        'premier-league': 'Premier League',
        'champions-league': 'Champions League',
        'bundesliga': 'Bundesliga',
        'la-liga': 'La Liga',
    };

    function toLabel(slug: string): string {
        return SLUG_LABELS[slug] ?? slug
            .split('-')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
    }

    const crumbs = $derived.by(() => {
        const segments = page.url.pathname.split('/').filter(Boolean);
        return [
            { label: 'Home', href: '/' },
            ...segments.map((seg, i) => ({
                label: toLabel(seg),
                href: '/' + segments.slice(0, i + 1).join('/'),
            })),
        ];
    });
</script>

{#if crumbs.length > 1}
    <nav class="breadcrumb" aria-label="Breadcrumb">
        {#each crumbs as crumb, i}
            {#if i > 0}
                <span class="sep" aria-hidden="true">/</span>
            {/if}
            {#if i < crumbs.length - 1}
                <a href={crumb.href}>{crumb.label}</a>
            {:else}
                <span class="current" aria-current="page">{crumb.label}</span>
            {/if}
        {/each}
    </nav>
{/if}

<style>
    .breadcrumb {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.8rem;
        color: var(--color-text-muted);
        padding: 0.5rem 0 1rem;
    }

    a {
        color: var(--color-text-muted);
        text-decoration: none;
        transition: color 0.15s;
    }

    a:hover {
        color: #fff;
    }

    .sep {
        color: var(--color-border);
        padding: 0 0.1rem;
    }

    .current {
        color: #fff;
    }
</style>