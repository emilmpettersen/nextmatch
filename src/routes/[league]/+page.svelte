<script lang="ts">
    import type { PageData } from './$types';
    import MatchList from '$lib/components/MatchList.svelte';
    import StandingsTable from '$lib/components/StandingsTable.svelte';
    import RecentResults from '$lib/components/RecentResults.svelte';

    let { data }: { data: PageData } = $props();

    const upcoming = $derived(data.matches.filter((m) => m.status !== 'FINISHED'));

    const topScorer = $derived(
        data.scorers.reduce((best, s) => (s.goals ?? 0) > (best.goals ?? 0) ? s : best, data.scorers[0])
    );
    const topAssister = $derived(
        data.scorers.reduce((best, s) => (s.assists ?? 0) > (best.assists ?? 0) ? s : best, data.scorers[0])
    );

    const NATIONALITY_TO_CODE: Record<string, string> = {
        Afghanistan: 'AF', Albania: 'AL', Algeria: 'DZ', Angola: 'AO', Argentina: 'AR',
        Armenia: 'AM', Australia: 'AU', Austria: 'AT', Azerbaijan: 'AZ', Belgium: 'BE',
        'Bosnia-Herzegovina': 'BA', Bosnia: 'BA', Brazil: 'BR', Bulgaria: 'BG', Cameroon: 'CM',
        Canada: 'CA', Chile: 'CL', China: 'CN', Colombia: 'CO', Congo: 'CG',
        'Costa Rica': 'CR', Croatia: 'HR', 'Czech Republic': 'CZ', Czechia: 'CZ',
        Denmark: 'DK', Ecuador: 'EC', Egypt: 'EG', England: 'GB-ENG', Estonia: 'EE',
        Ethiopia: 'ET', Finland: 'FI', France: 'FR', Gambia: 'GM', Georgia: 'GE',
        Germany: 'DE', Ghana: 'GH', Greece: 'GR', Guinea: 'GN', 'Guinea-Bissau': 'GW',
        Honduras: 'HN', Hungary: 'HU', Iceland: 'IS', Iran: 'IR', Ireland: 'IE',
        Israel: 'IL', Italy: 'IT', 'Ivory Coast': 'CI', Jamaica: 'JM', Japan: 'JP',
        Jordan: 'JO', Kazakhstan: 'KZ', Kosovo: 'XK', Latvia: 'LV', Lithuania: 'LT',
        Luxembourg: 'LU', Mali: 'ML', Malta: 'MT', Mexico: 'MX', Moldova: 'MD',
        Montenegro: 'ME', Morocco: 'MA', Mozambique: 'MZ', Netherlands: 'NL',
        'New Zealand': 'NZ', Nigeria: 'NG', 'North Macedonia': 'MK', 'Northern Ireland': 'GB',
        Norway: 'NO', Panama: 'PA', Paraguay: 'PY', Peru: 'PE', Poland: 'PL',
        Portugal: 'PT', Romania: 'RO', Russia: 'RU', Scotland: 'GB-SCT', Senegal: 'SN',
        Serbia: 'RS', Slovakia: 'SK', Slovenia: 'SI', Somalia: 'SO', 'South Korea': 'KR',
        Spain: 'ES', Sudan: 'SD', Sweden: 'SE', Switzerland: 'CH', Tajikistan: 'TJ',
        Tanzania: 'TZ', Togo: 'TG', Tunisia: 'TN', Turkey: 'TR', Ukraine: 'UA',
        Uruguay: 'UY', USA: 'US', 'United States': 'US', Venezuela: 'VE', Wales: 'GB-WLS',
        Zambia: 'ZM', Zimbabwe: 'ZW',
    };

    function nationalityFlag(nationality: string | null): string {
        if (!nationality) return '';
        const code = NATIONALITY_TO_CODE[nationality];
        if (!code) return '';
        // Handle GB subdivisions which don't have standard emoji
        if (code.startsWith('GB-')) return '🇬🇧';
        return code
            .toUpperCase()
            .split('')
            .map((c) => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0)))
            .join('');
    }
</script>

<main>
    <!--<h1>
        {#if data.competition.emblem}
            <img src={data.competition.emblem} alt="" height="80" />
        {/if}
        {data.competition.name}
    </h1>-->
    <div class="layout">
        <aside>
            <div class="emblem-wrapper">
                <img
                    class="emblem"
                    src={data.competition.emblem}
                    alt={data.competition.name}
                    style:height={data.competition.code === 'PL' ? '180px' : '120px'}
                />
            </div>
            <StandingsTable standings={data.standings} />
            <RecentResults matches={data.matches} />
        </aside>
        <section>
            {#if data.scorers.length > 0}
                <div class="stat-cards">
                    <div class="stat-card">
                        <span class="stat-label">Top Scorer</span>
                        <div class="stat-player">
                            <div class="stat-player-info">
                                {#if topScorer.team.crest}
                                    <img src={topScorer.team.crest} alt={topScorer.team.shortName} width="24" height="24" />
                                {/if}
                                {#if nationalityFlag(topScorer.player.nationality)}
                                    <span class="stat-flag" title={topScorer.player.nationality ?? ''}>{nationalityFlag(topScorer.player.nationality)}</span>
                                {/if}
                            </div>
                            <span class="stat-name">{topScorer.player.name}</span>
                            
                        </div>
                        <span class="stat-value">{topScorer.goals} <span class="stat-unit">goals</span></span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">Top Assister</span>
                        <div class="stat-player">
                            <div class="stat-player-info">
                                {#if topAssister.team.crest}
                                    <img src={topAssister.team.crest} alt={topAssister.team.shortName} width="24" height="24" />
                                {/if}
                                {#if nationalityFlag(topAssister.player.nationality)}
                                    <span class="stat-flag" title={topAssister.player.nationality ?? ''}>{nationalityFlag(topAssister.player.nationality)}</span>
                                {/if}
                            </div>
                            <span class="stat-name">{topAssister.player.name}</span>
                        </div>
                        <span class="stat-value">{topAssister.assists} <span class="stat-unit">assists</span></span>
                    </div>
                </div>
            {/if}
            <MatchList matches={upcoming} />
        </section>
    </div>
</main>

<style>
    main {
        max-width: 1440px;
        margin: 0 auto;
        padding: 2rem 1rem;
        font-family: sans-serif;
    }

    h1 {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-size: 1.75rem;
        margin-bottom: 1.5rem;
    }

    .emblem-wrapper {
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .emblem {
        object-fit: contain;
        filter:
            drop-shadow(0 0 1px rgba(255, 255, 255, 0.9))
            drop-shadow(0 0 1px rgba(255, 255, 255, 0.9));
    }

    .layout {
        display: flex;
        gap: 2rem;
        align-items: flex-start;
    }

    aside {
        flex: 0 0 420px;
        position: sticky;
        top: 1rem;
    }

    section {
        flex: 1;
        min-width: 0;
    }

    .stat-cards {
        display: flex;
        gap: 1rem;
        margin-bottom: 0.5rem;
    }

    .stat-card {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem 1.25rem;
        background: var(--color-bg-card);
        border: 1px solid var(--color-border);
        border-radius: 8px;
    }

    .stat-label {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--color-text-muted);
    }

    .stat-player {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .stat-player-info {
        display:flex;
        align-items: center;
        gap:0.25rem;
    }

    .stat-name {
        font-size: 0.95rem;
        font-weight: 600;
        color: #fff;
    }

    .stat-flag {
        font-size: 1.25rem;
        line-height: 1;
        flex-shrink: 0;
    }

    .stat-team {
        font-size: 0.75rem;
        color: var(--color-text-muted);
        margin-left: auto;
    }

    .stat-value {
        font-size: 1.75rem;
        font-weight: 700;
        color: #fff;
        line-height: 1;
    }

    .stat-unit {
        font-size: 0.8rem;
        font-weight: 400;
        color: var(--color-text-muted);
    }
</style>