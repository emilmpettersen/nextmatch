<script lang="ts">
    import type { StandingGroup } from '$lib/types';

    interface Props {
        standings?: StandingGroup[];
        hoveredTeamIds?: number[];
    }
    let { standings = [], hoveredTeamIds = [] }: Props = $props();

    // Prefer the TOTAL type table, fall back to the first available
    const table = $derived(
        standings.find((s) => s.type === 'TOTAL')?.table ?? standings[0]?.table ?? []
    );
</script>

<section class="standings">
    <table>
        <thead>
            <tr>
                <th class="pos">#</th>
                <th class="team">Team</th>
                <th title="Played">P</th>
                <th title="Won">W</th>
                <th title="Drawn">D</th>
                <th title="Lost">L</th>
                <!--<<th title="Goals For">GF</th>
                th title="Goals Against">GA</th>-->
                <th title="Goal Difference">GD</th>
                <th title="Points">Pts</th>
            </tr>
        </thead>
        <tbody>
            {#each table as row}
                <tr class:highlighted={hoveredTeamIds.includes(row.team.id)}>
                    <td class="pos">{row.position}</td>
                    <td class="team">
                        <img src={row.team.crest} alt={row.team.shortName} width="20" height="20" />
                        <span>{row.team.shortName}</span>
                    </td>
                    <td class="number">{row.playedGames}</td>
                    <td class="number">{row.won}</td>
                    <td class="number">{row.draw}</td>
                    <td class="number">{row.lost}</td>
                    <!--<td>{row.goalsFor}</td>
                    <td>{row.goalsAgainst}</td>-->
                    <td class="number">{row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}</td>
                    <td class="pts">{row.points}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</section>

<style>
    .standings {
        background-color: var(--color-bg-card);
        border-radius:0px 0px 8px 8px;
        color:#fff;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.9rem;
    }

    thead {
        background: var(--color-border);
    }

    th,
    td {
        padding: 0.5rem 0.5rem;
        text-align: center;
    }

    tr {
        border-bottom: 1px solid #54565a;
        &:last-of-type {
            border-bottom: none;
        }
        &.highlighted {
            background: var(--color-border);
            transition: background 0.15s;
        }
    }

    th {
        font-weight: 600;
        color: #6b7280;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    td.team {
        text-align: left;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    td.pos,
    th.pos {
        color: #9ca3af;
        width: 2rem;
    }

    td.pts {
        font-weight: 700;
    }

    td.number {
        padding: 0.5rem 0.25rem;
    }

    img {
        object-fit: contain;
        flex-shrink: 0;
    }
</style>
