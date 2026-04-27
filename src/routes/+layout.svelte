<script lang="ts">
  	import Navbar from '$lib/components/Navbar.svelte';
	import '$lib/styles/variables.css';
	import '$lib/styles/global.css';
 	import type { LayoutData } from './$types';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='80'>⚽</text></svg>" />
</svelte:head>

<Navbar leagueTeams={data.leagueTeams}/>
{@render children()}
