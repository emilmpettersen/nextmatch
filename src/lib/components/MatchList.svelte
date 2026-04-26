<script lang="ts">
	import type { Match } from '$lib/types';

	let { matches }: { matches: Match[] } = $props();

	function formatDate(utcDate: string): string {
		return new Date(utcDate).toLocaleString(undefined, {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	type StatusGroup = 'live' | 'finished' | 'upcoming';

	function getStatusGroup(match: Match): StatusGroup {
		if (match.status === 'LIVE' || match.status === 'IN_PLAY' || match.status === 'PAUSED') {
			return 'live';
		}
		if (match.status === 'FINISHED') {
			return 'finished';
		}
		return 'upcoming';
	}

	const live = $derived(matches.filter((m: Match) => getStatusGroup(m) === 'live'));
	const finished = $derived(matches.filter((m: Match) => getStatusGroup(m) === 'finished'));
	const upcoming = $derived(matches.filter((m: Match) => getStatusGroup(m) === 'upcoming'));

	let now = $state(Date.now());

	$effect(() => {
		const interval = setInterval(() => { now = Date.now(); }, 1000);
		return () => clearInterval(interval);
	});

	function formatCountdown(utcDate: string): string {
		const diff = new Date(utcDate).getTime() - now;
		if (diff <= 0) return 'Starting soon';
		const totalSeconds = Math.floor(diff / 1000);
		const days = Math.floor(totalSeconds / 86400);
		const hours = Math.floor((totalSeconds % 86400) / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;
		if (days > 0) return `${days}d ${hours}h ${minutes}m`;
		return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
	}
</script>

	{#if matches.length === 0}
		<p class="empty">No matches found.</p>
	{:else}
		{#each [{ label: 'Live', matches: live }, { label: 'Finished', matches: finished }, { label: 'Upcoming', matches: upcoming }] as group}
			{#if group.matches.length > 0}
			<section>
				<h2>{group.label}</h2>
				<ul>
					{#each group.matches as match}
						<li class="match-card"
                            class:scheduled={match.status === 'SCHEDULED' || match.status === 'TIMED'}
                            class:live={match.status === 'LIVE' || match.status === 'IN_PLAY' || match.status === 'PAUSED'}
                            class:finished={match.status === 'FINISHED'}>
							<span class="competition">
								{#if match.competition.emblem}
									<img src={match.competition.emblem} alt={match.competition.name} width="24" height="24" />
								{/if}
								{match.competition.name}
							</span>
							<div class="teams">
								<span class="team">
									{#if match.homeTeam.crest}
										<img src={match.homeTeam.crest} alt="" width="32" height="32" />
									{/if}
									{match.homeTeam.name}
								</span>
								<span class="score">
                                    {match.score.fullTime.home} - {match.score.fullTime.away}
                                </span>
								<span class="team">
									{#if match.awayTeam.crest}
										<img src={match.awayTeam.crest} alt="" width="32" height="32" />
									{/if}
									{match.awayTeam.name}
								</span>
							</div>
							{#if match.status === 'LIVE' || match.status === 'IN_PLAY' || match.status === 'PAUSED'}
                            <span class="live-indicator">
                                <span class="dot"></span>
                                <span>LIVE</span>
                            </span>
                        {:else if match.status === 'FINISHED'}
                            <span class="time">{formatDate(match.utcDate)}</span>
                        {:else}
						<div class="times">
                            <span class="time">{formatDate(match.utcDate)}</span>
                            <span class="countdown">
                                <span class="countdown-dot"></span>
                                {formatCountdown(match.utcDate)}
                            </span>
						</div>
                        {/if}
						</li>
					{/each}
				</ul>
			</section>
			{/if}
		{/each}
	{/if}

<style>


	h2 {
		font-size: 1rem;
		font-weight: 600;
		color: #666;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 2rem 0 0.5rem;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
        column-count: 2;
		gap: 0.5rem;
	}

	.match-card {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding: 1rem;
		border-radius: 8px;
        color: #fff;
        &.scheduled {
            background: var(--color-scheduled);
            border-color: var(--color-border-scheduled)
        }
        &.finished {
            background: var(--color-finished);
            border-color: var(--color-border-finished)
        }
        &.live {
            background: var(--color-live);
            border-color: var(--color-border-live)
        }
	}

	.competition {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.75rem;
		color: #888;
	}


	.teams {
		display: grid;
        grid-template-columns: repeat(3, 1fr);
		align-items: center;
		gap: 1rem;
		font-size: 1rem;
		font-weight: 500;
	}

	.team {
		display: flex;
		align-items: center;
        flex-direction: column;
        text-align: center;
		gap: 0.4rem;
	}

	.score {
		color: #aaa;
		font-size: 1.85rem;
        text-align: center;
	}

	.times {
		display:flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.time {
		font-size: 0.8rem;
		color: #666;
	}

	.countdown {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.8rem;
		font-weight: 600;
		color: #93c5fd;
		letter-spacing: 0.03em;
	}

	.countdown-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #93c5fd;
		flex-shrink: 0;
	}

	.empty {
		color: #888;
	}

    .live-indicator {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-weight: 700;
    color: #ff4444;

    span {
        line-height: 1;
    }
}

    .dot {
        position:relative;
        top: -1px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ff4444;
        animation: pulse 1.5s ease-in-out infinite;
        flex-shrink: 0;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.75); }
    }
</style>
