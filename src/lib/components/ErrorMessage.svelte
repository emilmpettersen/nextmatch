<script lang="ts">
    let { status, message }: { status?: number; message: string } = $props();
</script>

<div class="error-card">
    <div class="error-icon">⚠</div>
    {#if status}
        <span class="status-badge">{status}</span>
    {/if}
    <p class="message">{message}</p>
</div>

<style>
    .error-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        max-width: 480px;
        margin: 4rem auto;
        padding: 2rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-top: 3px solid #c0392b;
        border-radius: 8px;
        text-align: center;
    }

    .error-icon {
        font-size: 2.5rem;
        color: #e55;
        line-height: 1;
    }

    .status-badge {
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #e55;
        background: rgba(204, 51, 51, 0.15);
        padding: 0.2rem 0.6rem;
        border-radius: 4px;
    }

    .message {
        margin: 0;
        font-size: 0.95rem;
        color: #ccc;
        line-height: 1.5;
    }
</style>
