<script lang="ts">
    import type { PageData } from './$types';
    import MatchList from '$lib/components/MatchList.svelte';
    import { nationalityFlag } from '$lib/utils';

    let { data }: { data: PageData } = $props();

    const POSITION_ORDER = [
        'Goalkeeper',
        'Right-Back', 'Centre-Back', 'Left-Back',
        'Defensive Midfield', 'Central Midfield', 'Attacking Midfield',
        'Right Winger', 'Left Winger',
        'Centre-Forward',
        'Defence', 'Midfield', 'Offence',
    ];

    const POSITION_GROUP: Record<string, string> = {
        'Goalkeeper': 'Goalkeepers',
        'Right-Back': 'Defenders', 'Centre-Back': 'Defenders', 'Left-Back': 'Defenders', 'Defence': 'Defenders',
        'Defensive Midfield': 'Midfielders', 'Central Midfield': 'Midfielders',
        'Attacking Midfield': 'Midfielders', 'Midfield': 'Midfielders',
        'Right Winger': 'Forwards', 'Left Winger': 'Forwards',
        'Centre-Forward': 'Forwards', 'Offence': 'Forwards',
    };

    const GROUP_ORDER = ['Goalkeepers', 'Defenders', 'Midfielders', 'Forwards'];

    const squadByGroup = $derived.by(() => {
        if (!data.team.squad) return [];
        const groups: Record<string, typeof data.team.squad> = {};
        for (const p of data.team.squad) {
            const group = (p.position && POSITION_GROUP[p.position]) ?? 'Other';
            (groups[group] ??= []).push(p);
        }
        return GROUP_ORDER
            .filter(g => groups[g]?.length)
            .map(g => ({
                label: g,
                players: groups[g].sort((a, b) =>
                    POSITION_ORDER.indexOf(a.position ?? '') - POSITION_ORDER.indexOf(b.position ?? '')
                ),
            }));
    });

    function positionClass(position: string | null): string {
        const group = (position && POSITION_GROUP[position]) ?? 'Other';
        return {
            'Goalkeepers': 'pos-gk',
            'Defenders':   'pos-def',
            'Midfielders': 'pos-mid',
            'Forwards':    'pos-fwd',
        }[group] ?? '';
    }

    function age(dob: string | null): string {
        if (!dob) return '—';
        const diff = Date.now() - new Date(dob).getTime();
        return String(Math.floor(diff / (365.25 * 24 * 3600 * 1000)));
    }
</script>

<main>
    <div class="layout">
        <aside>
        <div class="team-header">
                <img
                    class="emblem"
                    src={data.team.crest}
                    alt={data.team.name}
                    height="100"
                />
                <h1>{data.team.name}</h1>
            </div>
            <div class="squad">
                <h2>SQUAD</h2>
            {#if data.team.squad}
                {#each squadByGroup as group}
                    <h3>{group.label}</h3>
                    <ul>
                        {#each group.players as player}
                            <li><span class="position-indicator {positionClass(player.position)}"></span><span class="player-name">{player.name}</span>{#if nationalityFlag(player.nationality)}<span class="player-flag" title={player.nationality ?? ''}>{nationalityFlag(player.nationality)}</span>{/if}</li>
                        {/each}
                    </ul>
                {/each}
            {/if}
            </div>
        </aside>
        <section>
            <MatchList matches={data.matches} />
        </section>
    </div>
</main>
<style>

    main {
        max-width: 1440px;
        margin: 0 auto;
        padding: 2rem 1rem;
    }

    .squad {
        width:400px;
        background-color: var(--color-bg-card);
        border-radius:0px 0px 8px 8px;
        color:#fff;
        padding-bottom:0.25rem;

        h2 {
            margin:0;
            padding:0.75rem;
            text-align: center;
            background: var(--color-border);
        }

        h3 {
            padding:0 0.5rem;
        }
    }

    .layout {
        display: flex;
        gap: 2rem;
        align-items: flex-start;
    }

    .team-header {
        display: flex;
        align-items: center;
        text-align: center;
        gap: 1.5rem;
        padding: 1.5rem;
        background:#1d142b;
        border: 1px solid var(--color-border);
        border-radius: 8px 8px 0px 0px;
    }

    .team-header img {
        object-fit: contain;
        filter:
            drop-shadow(0 0 1px rgba(255, 255, 255, 0.6))
            drop-shadow(0 0 1px rgba(255, 255, 255, 0.6));
    }

    h1 {
        margin: 0;
        font-size: 1.75rem;
        font-weight: 700;
        color: #fff;
    }

    ul {
        display:flex;
        flex-direction: column;
        gap:0.5rem;
        list-style: none;
        margin-top: 0;
        padding:0 1rem;
    }

    li {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .position-indicator {
        display: inline-block;
        width: 4px;
        height: 24px;
        flex-shrink: 0;
    }

    .pos-gk  { background: #f59e0b; }
    .pos-def { background: #d4f63b; }
    .pos-mid { background: #22c55e; }
    .pos-fwd { background: #3b82f6; }

    .player-flag {
        margin-left: auto;
        font-size: 1rem;
        line-height: 1;
    }

</style>
