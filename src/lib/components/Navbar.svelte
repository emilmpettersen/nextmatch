<script lang="ts">
    import { page } from '$app/state';
</script>

<nav>
    <a href="/" class:active={page.url.pathname === '/'}>Home</a>
    <a href="/premier-league" class:active={page.url.pathname === '/premier-league'}>Premier League</a>
    <a href="/champions-league" class:active={page.url.pathname === '/champions-league'}>Champions League</a>
    <a href="/bundesliga" class:active={page.url.pathname === '/bundesliga'}>Bundesliga</a>
    <a href="/la-liga" class:active={page.url.pathname === '/la-liga'}>La Liga</a>
</nav>

<style>
    nav {
        display: flex;
        align-items: center;
        padding: 0 1.5rem;
        height: 56px;
        background: var(--color-bg-card);
        border-bottom: 1px solid var(--color-border);
    }

    a {
        font-size: 0.9rem;
        font-weight: 500;
        height:100%;
        display:flex;
        align-items: center;
        color: var(--color-text-muted);
        text-decoration: none;
        padding: 0 2rem;
        border-bottom: 2px solid transparent;
        transition: color 0.15s, border-color 0.15s;

        &:hover {
            color: #fff;
            background-color: var(--color-border);
        }

        &.active {
            color: #fff;
            border-bottom-color: var(--color-bg);
            background-color: var(--color-bg);
        }
    }
</style>