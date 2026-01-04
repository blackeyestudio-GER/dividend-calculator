<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-4">Beliebte ETFs und Aktien 2025</h1>
      <p class="text-lg text-[var(--color-text-secondary)]">
        Eine Übersicht der beliebtesten dividendenstarken ETFs und Aktien im Jahr 2025
      </p>
    </div>

    <!-- Erklärung -->
    <div class="card mb-8">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">Was bedeutet diese Tabelle?</h2>
      <p class="text-[var(--color-text-secondary)] mb-4">
        Diese Tabelle zeigt eine Auswahl der beliebtesten ETFs (Exchange Traded Funds) und Aktien, die im Jahr 2025 
        besonders gefragt waren. Die Beliebtheit basiert auf verschiedenen Faktoren wie Handelsvolumen, 
        Investoreninteresse und Medienpräsenz.
      </p>
      <p class="text-[var(--color-text-secondary)] mb-4">
        <strong>ETFs</strong> sind börsengehandelte Fonds, die einen Index nachbilden (z.B. den S&P 500) und 
        eine breite Diversifikation bieten. Sie sind besonders bei passiven Investoren beliebt, die langfristig 
        investieren möchten.
      </p>
      <p class="text-[var(--color-text-secondary)]">
        <strong>Dividendenrendite</strong> gibt an, wie viel Prozent des aktuellen Aktienkurses als Dividende 
        ausgeschüttet wird. Eine höhere Rendite bedeutet nicht automatisch eine bessere Investition - wichtig ist 
        auch die Stabilität und das Wachstumspotenzial.
      </p>
    </div>

    <!-- AdSense -->
    <div class="mb-8 flex justify-center">
      <AdSense />
    </div>

    <!-- Tabelle -->
    <div class="card overflow-x-auto">
      <table class="w-full min-w-[800px]">
        <thead>
          <tr class="border-b border-[var(--color-border)]">
            <th class="text-left py-4 px-4 font-semibold text-[var(--color-text-primary)] whitespace-nowrap">Symbol</th>
            <th 
              @click="sortBy('name')"
              class="text-left py-4 px-4 font-semibold text-[var(--color-text-primary)] whitespace-nowrap cursor-pointer hover:bg-[var(--color-surface)] transition-colors select-none"
            >
              <div class="flex items-center gap-2">
                Name
                <span v-if="sortColumn === 'name'" class="text-[var(--color-primary)]">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </div>
            </th>
            <th class="text-left py-4 px-4 font-semibold text-[var(--color-text-primary)] whitespace-nowrap">Typ</th>
            <th class="text-left py-4 px-4 font-semibold text-[var(--color-text-primary)] whitespace-nowrap">Dividendenrendite</th>
            <th 
              @click="sortBy('investment')"
              class="text-right py-4 px-4 font-semibold text-[var(--color-text-primary)] whitespace-nowrap cursor-pointer hover:bg-[var(--color-surface)] transition-colors select-none"
            >
              <div class="flex items-center justify-end gap-2">
                Investment für 100€/Monat
                <span v-if="sortColumn === 'investment'" class="text-[var(--color-primary)]">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </div>
            </th>
            <th class="text-left py-4 px-4 font-semibold text-[var(--color-text-primary)]">Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(item, index) in sortedStocks" 
            :key="index"
            class="border-b border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors"
          >
            <td class="py-4 px-4">
              <div class="flex items-center gap-2">
                <NuxtLink 
                  :to="`/rechner?symbol=${item.symbol}`" 
                  class="font-semibold hover:underline"
                  style="color: var(--color-cyan);"
                >
                  {{ item.symbol }}
                </NuxtLink>
                <a
                  :href="getGoogleFinanceUrl(item.symbol)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[var(--color-text-muted)] hover:text-[var(--color-cyan)] transition-colors"
                  title="Aktuellen Kurs bei Google Finance anzeigen"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </td>
            <td class="py-4 px-4 text-[var(--color-text-primary)]">{{ item.name }}</td>
            <td class="py-4 px-4">
              <span 
                :class="item.type === 'ETF' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'"
                class="px-2 py-1 rounded text-xs font-medium"
              >
                {{ item.type }}
              </span>
            </td>
            <td class="py-4 px-4 text-[var(--color-accent)] font-semibold">{{ item.yield.toFixed(2) }}%</td>
            <td class="py-4 px-4 text-right text-[var(--color-text-primary)] font-semibold">
              {{ formatCurrency(calculateInvestmentForMonthly(item.yield)) }}
            </td>
            <td class="py-4 px-4 text-[var(--color-text-secondary)] text-sm">{{ item.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Weitere Informationen -->
    <div class="mt-8 card">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">Wichtige Hinweise</h2>
      <ul class="space-y-3 text-[var(--color-text-secondary)]">
        <li class="flex items-start">
          <span class="text-[var(--color-primary)] mr-2">•</span>
          <span>Die Dividendenrenditen können sich täglich ändern und basieren auf historischen Daten.</span>
        </li>
        <li class="flex items-start">
          <span class="text-[var(--color-primary)] mr-2">•</span>
          <span>Diese Liste dient nur zu Informationszwecken und stellt keine Anlageberatung dar.</span>
        </li>
        <li class="flex items-start">
          <span class="text-[var(--color-primary)] mr-2">•</span>
          <span>Bevor du investierst, solltest du dich gründlich informieren und gegebenenfalls einen Finanzberater konsultieren.</span>
        </li>
        <li class="flex items-start">
          <span class="text-[var(--color-primary)] mr-2">•</span>
          <span>Verwende unseren <NuxtLink to="/rechner" class="hover:underline" style="color: var(--color-cyan);">Dividendenrechner</NuxtLink>, um deine potenziellen Erträge zu berechnen.</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Beliebte ETFs und Aktien 2025'
})

const popularStocks = [
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    type: 'ETF',
    yield: 1.07,
    payoutFrequency: 'quarterly' as const,
    description: 'Der größte und liquideste ETF, der den S&P 500 Index nachbildet. Ideal für breite Marktstreuung.'
  },
  {
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    type: 'ETF',
    yield: 1.50,
    payoutFrequency: 'quarterly' as const,
    description: 'Niedrige Kostenquote, bildet den S&P 500 Index ab. Beliebt bei langfristigen Investoren.'
  },
  {
    symbol: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    type: 'ETF',
    yield: 1.40,
    payoutFrequency: 'quarterly' as const,
    description: 'Bietet Exposure zum gesamten US-Aktienmarkt mit über 3.000 Aktien.'
  },
  {
    symbol: 'QQQ',
    name: 'Invesco QQQ Trust',
    type: 'ETF',
    yield: 0.60,
    payoutFrequency: 'quarterly' as const,
    description: 'Fokussiert auf Technologie-Aktien des NASDAQ-100 Index.'
  },
  {
    symbol: 'SCHD',
    name: 'Schwab US Dividend Equity ETF',
    type: 'ETF',
    yield: 3.50,
    payoutFrequency: 'quarterly' as const,
    description: 'Spezialisiert auf dividendenstarke US-Aktien mit hoher Qualität.'
  },
  {
    symbol: 'VYM',
    name: 'Vanguard High Dividend Yield ETF',
    type: 'ETF',
    yield: 3.20,
    payoutFrequency: 'quarterly' as const,
    description: 'Fokus auf Aktien mit überdurchschnittlicher Dividendenrendite.'
  },
  {
    symbol: 'DIV',
    name: 'Global X SuperDividend ETF',
    type: 'ETF',
    yield: 7.80,
    payoutFrequency: 'monthly' as const,
    description: 'Hohe Dividendenrendite durch internationale dividendenstarke Aktien.'
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'Aktie',
    yield: 0.50,
    payoutFrequency: 'quarterly' as const,
    description: 'Technologie-Gigant mit stabilem Wachstum und moderaten Dividenden.'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    type: 'Aktie',
    yield: 0.70,
    payoutFrequency: 'quarterly' as const,
    description: 'Führendes Software-Unternehmen mit kontinuierlichem Dividendenwachstum.'
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    type: 'Aktie',
    yield: 3.10,
    payoutFrequency: 'quarterly' as const,
    description: 'Dividenden-Aristokrat mit über 60 Jahren kontinuierlicher Dividendenerhöhung.'
  },
  {
    symbol: 'KO',
    name: 'The Coca-Cola Company',
    type: 'Aktie',
    yield: 3.20,
    payoutFrequency: 'quarterly' as const,
    description: 'Klassische Dividendenaktie mit sehr stabiler Ausschüttung.'
  },
  {
    symbol: 'PG',
    name: 'Procter & Gamble Co.',
    type: 'Aktie',
    yield: 2.50,
    payoutFrequency: 'quarterly' as const,
    description: 'Konsumgüterkonzern mit langer Dividendenhistorie und stabilen Erträgen.'
  },
  {
    symbol: 'XOM',
    name: 'Exxon Mobil Corporation',
    type: 'Aktie',
    yield: 3.80,
    payoutFrequency: 'quarterly' as const,
    description: 'Energiekonzern mit hoher Dividendenrendite, abhängig von Ölpreisen.'
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    type: 'Aktie',
    yield: 0.80,
    payoutFrequency: 'quarterly' as const,
    description: 'Zahlungsdienstleister mit starkem Wachstumspotenzial.'
  },
  {
    symbol: 'MA',
    name: 'Mastercard Inc.',
    type: 'Aktie',
    yield: 0.60,
    payoutFrequency: 'quarterly' as const,
    description: 'Führendes Zahlungsnetzwerk mit hohem Wachstumspotenzial.'
  }
]

const { formatCurrency } = useDividendCalculation()

// Sortierung - Standard: nach Name sortiert
const sortColumn = ref<'name' | 'investment' | null>('name')
const sortDirection = ref<'asc' | 'desc'>('asc')

const sortBy = (column: 'name' | 'investment') => {
  if (sortColumn.value === column) {
    // Toggle direction if same column
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    // New column, default to ascending
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

// Berechne benötigtes Investment für 100€ monatlich
// Formel: Jahresdividende benötigt = 100€ * 12 = 1200€
// Investment = Jahresdividende / (Dividendenrendite / 100)
const calculateInvestmentForMonthly = (yieldPercent: number): number => {
  if (!yieldPercent || yieldPercent <= 0) return 0
  const annualDividendNeeded = 100 * 12 // 1200€ pro Jahr für 100€/Monat
  return annualDividendNeeded / (yieldPercent / 100)
}

// Berechne benötigtes Investment für 300€ quartalsweise
// Formel: Jahresdividende benötigt = 300€ * 4 = 1200€ (gleich wie monatlich)
const calculateInvestmentForQuarterly = (yieldPercent: number): number => {
  if (!yieldPercent || yieldPercent <= 0) return 0
  const annualDividendNeeded = 300 * 4 // 1200€ pro Jahr für 300€/Quartal
  return annualDividendNeeded / (yieldPercent / 100)
}

// Sortierte Liste
const sortedStocks = computed(() => {
  if (!sortColumn.value) {
    return popularStocks
  }

  const sorted = [...popularStocks].sort((a, b) => {
    let comparison = 0

    if (sortColumn.value === 'name') {
      comparison = a.name.localeCompare(b.name, 'de')
    } else if (sortColumn.value === 'investment') {
      const investmentA = calculateInvestmentForMonthly(a.yield)
      const investmentB = calculateInvestmentForMonthly(b.yield)
      comparison = investmentA - investmentB
    }

    return sortDirection.value === 'asc' ? comparison : -comparison
  })

  return sorted
})

// Prüfe ob es quartalsweise Aktien gibt
const hasQuarterlyStocks = computed(() => {
  return popularStocks.some(stock => stock.payoutFrequency === 'quarterly')
})

// Google Finance URL basierend auf Symbol
const getGoogleFinanceUrl = (symbol: string): string => {
  // Google Finance findet das Symbol automatisch
  return `https://www.google.com/finance/quote/${symbol}`
}
</script>

