<template>
  <div class="position-card">
    <div class="position-card__content">
      <!-- Stock Search -->
      <StockSearch
        :model-value="position.tickerSymbol || ''"
        :is-loading="position.isLoading || false"
        :search-error="position.searchError"
        :search-success="position.searchSuccess || false"
        :data-source="position.dataSource"
        :current-api="position.currentApi"
        @update:model-value="updateTickerSymbol"
        @search="handleSearch"
        @select="handleSelectStock"
      />

      <!-- Position Name (nur Anzeige wenn gefunden) -->
      <div v-if="position.searchSuccess && position.name" class="position-card__section">
        <label class="position-card__label">Position</label>
        <div class="position-card__info">
          <span class="position-card__info-symbol">{{ position.tickerSymbol }}</span>
          <span class="position-card__info-name">{{ position.name }}</span>
        </div>
      </div>

      <!-- Anzahl Anteile -->
      <div class="position-card__section">
        <label class="position-card__label">Anzahl Anteile</label>
        <input
          :value="position.shares"
          @input="updateShares(parseFloat(($event.target as HTMLInputElement).value) || 0)"
          type="number"
          min="0"
          step="0.01"
          placeholder="z.B. 10, 50, 100"
          class="input"
          :class="{ 'input--disabled': !position.searchSuccess }"
          :disabled="!position.searchSuccess"
        />
        <p v-if="position.searchSuccess" class="position-card__hint">
          💡 Gebe die Anzahl deiner Anteile ein - die Dividende wird automatisch berechnet!
        </p>
        <p v-else class="position-card__hint--error">
          ⚠️ Bitte suche zuerst nach einem Symbol, bevor du die Anzahl Anteile eingibst.
        </p>
      </div>
    </div>

    <!-- Dividend Display -->
    <DividendDisplay
      :method="position.method"
      :shares="position.shares"
      :dividend-per-share="position.dividendPerShare"
      :payout-interval="position.payoutInterval"
      :dividend-yield="position.dividendYield"
      :current-value="position.currentValue"
    />
  </div>
</template>

<script setup lang="ts">
import type { Position } from '~/composables/useDividendCalculation'
import type { Stock } from '~/composables/useStockSearch'

interface ExtendedPosition extends Position {
  tickerSymbol?: string
  isLoading?: boolean
  searchError?: string
  searchSuccess?: boolean
  dataSource?: string
  currentApi?: string
}

interface Props {
  position: ExtendedPosition
  index: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:position': [position: ExtendedPosition]
  'search': [position: ExtendedPosition]
}>()

const updateTickerSymbol = (value: string) => {
  emit('update:position', { ...props.position, tickerSymbol: value })
}

const updateShares = (value: number) => {
  emit('update:position', { ...props.position, shares: value })
}

const handleSearch = () => {
  emit('search', props.position)
}

const handleSelectStock = (stock: Stock) => {
  const updatedPosition = { ...props.position, tickerSymbol: stock.symbol, name: stock.name }
  emit('update:position', updatedPosition)
  emit('search', updatedPosition)
}
</script>

