<script lang="ts">
    let { matches } = $props();
</script>

<ul class="match-list">
    {#each matches as match}
        <li class="match-card">
            <div class="team">
                <span class="home-score">-</span>
                <img src={match.homeTeam.crest} height="28" alt="Home team"/>
            </div>
            <div class="team">
                <span class="away-score">-</span>
                <img height="28" src={match.awayTeam.crest} alt="Away team"/>
            </div>
        </li>
    {/each}
</ul>

<style>
    .match-card {
        height: 120px;
        background:var(--color-scheduled);
        border-radius:8px;
    }

    ul {
        display: flex;
        gap:2rem;
        flex-direction: column;
        list-style: none;
        margin: 0;
    }

    li {
        display: flex;
        gap:0.5rem;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        .team {
            display: flex;
            align-items: center;
            gap:0.5rem;
            padding-left:1rem;
        }
    }
</style>