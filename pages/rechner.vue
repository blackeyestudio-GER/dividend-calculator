<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-4">Dividendenrechner</h1>
      <p class="text-lg text-[var(--color-text-secondary)]">
        Berechne deine monatlichen und jährlichen Dividendenerträge aus Aktien und ETFs. 
        Sieh auf einen Blick, wie viel passives Einkommen du generieren kannst.
      </p>
    </div>

    <!-- Calculator -->
    <div class="space-y-6">
      <!-- Positionen Liste -->
      <div class="space-y-4">
        <PositionCard
          v-for="(position, index) in positions"
          :key="position.id"
          :position="position"
          :index="index"
          @update:position="updatePosition(index, $event)"
          @search="handleSearch"
        />
      </div>

      <!-- Gesamtsumme -->
      <TotalSummary :positions="positions" />

      <!-- Platzhalter wenn keine Positionen -->
      <EmptyState :show="positions.length === 0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Position } from '~/composables/useDividendCalculation'

interface ExtendedPosition extends Position {
  tickerSymbol?: string
  isLoading?: boolean
  searchError?: string
  searchSuccess?: boolean
  dataSource?: string
  currentApi?: string
  showSuggestions?: boolean
  suggestions?: any[]
}

useHead({
  title: 'Dividendenrechner - Berechne deine Dividendenerträge | Finanzfreiheit',
  meta: [
    {
      name: 'description',
      content: 'Berechne deine monatlichen und jährlichen Dividendenerträge aus Aktien und ETFs. Sieh auf einen Blick, wie viel passives Einkommen du generieren kannst.'
    }
  ]
})

const positions = ref<ExtendedPosition[]>([])
let nextId = 1

const { searchStock } = useStockData()

// Initialisiere mit einer leeren Position
const addPosition = () => {
  positions.value.push({
    id: nextId++,
    name: '',
    shares: 0,
    method: 'yield',
    dividendYield: 0,
    currentValue: 0,
    tickerSymbol: '',
    isLoading: false,
    searchSuccess: false,
    showSuggestions: false,
    suggestions: [],
  })
}

// Query Parameter für direktes Laden eines Symbols
const route = useRoute()
onMounted(() => {
  // Starte immer mit einer leeren Position
  if (positions.value.length === 0) {
    addPosition()
  }
  
  // Wenn Symbol in Query Parameter, lade es
  if (route.query.symbol && positions.value.length > 0) {
    const newPosition = positions.value[positions.value.length - 1]
    newPosition.tickerSymbol = route.query.symbol as string
    handleSearch(newPosition)
  }
})

const updatePosition = (index: number, updatedPosition: ExtendedPosition) => {
  positions.value[index] = { ...positions.value[index], ...updatedPosition }
}

const handleSearch = async (position: ExtendedPosition) => {
  if (!position.tickerSymbol) return

  position.isLoading = true
  position.searchError = undefined
  position.searchSuccess = false
  position.currentApi = undefined

  const apis = [
    'Yahoo Finance',
    'TradingView',
    'Yahoo Finance (Chart)',
    'Alpha Vantage',
    'Finnhub',
  ]

  for (const apiName of apis) {
    position.currentApi = `Lade Daten von ${apiName}...`
    
    try {
      const result = await searchStock(position.tickerSymbol!)
      
      if (result && result.data) {
        const stockData = result.data
        
        position.name = stockData.name
        position.dataSource = result.source
        position.searchSuccess = true
        position.isLoading = false
        position.currentApi = undefined

        // Setze Daten basierend auf verfügbaren Informationen
        if (stockData.dividendPerShare && stockData.dividendPerShare > 0) {
          position.method = 'perShare'
          position.dividendPerShare = stockData.dividendPerShare
          position.payoutInterval = stockData.dividendFrequency || 'quarterly'
          position.currentValue = stockData.price || 0
        } else if (stockData.dividendYield && stockData.dividendYield > 0 && stockData.price) {
          position.method = 'yield'
          position.dividendYield = stockData.dividendYield
          position.currentValue = stockData.price
        } else if (stockData.price) {
          position.method = 'yield'
          position.currentValue = stockData.price
          position.dividendYield = 0
        }

        return
      }
    } catch (error) {
      continue
    }
  }

  position.isLoading = false
  position.searchError = `Konnte keine Dividendeninformationen für "${position.tickerSymbol}" finden. Bitte überprüfe das Ticker-Symbol.`
  position.currentApi = undefined
}
</script>

