<script lang="ts">
interface FeedMessage {
    type: string;
    message: string;
    minute: number;
}

interface Props {
    match: { homeTeam: { crest: string }; awayTeam: { crest: string } };
    feedMessages?: FeedMessage[];
}

let { match, feedMessages = [] }: Props = $props();
</script>

<div class="live-feed">
    <div class="live-feed-header">
        <img src={match.homeTeam.crest} height={90} alt="Home team" />
        <img src={match.awayTeam.crest} height={90} alt="Away team" />
    </div>
    <ul class="live-feed-content">
        {#each feedMessages as msg}
            <li class="feed-message feed-message--{msg.type}">
                <span class="minute">{msg.minute}'</span><span>{msg.message}</span>
            </li>
        {/each}
    </ul>
</div>

<style>
    .live-feed {
        border-radius:8px;
        overflow:hidden;
    }

    .live-feed-header {
        background:var(--color-live);
        padding:2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .live-feed-content {
        list-style: none;
        display:flex;
        flex-direction: column;
        background-color: #2b2b2b;
        color: #fff;
        padding: 1rem;
        margin:0;
    }

    .feed-message {
        display: flex;
        gap:2rem;
        padding:0.5rem;
        border-bottom:1px solid black;
        .minute {
            color: var(--color-text-subtle);
        }
    }
</style>