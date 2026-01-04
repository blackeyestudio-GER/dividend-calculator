<template>
  <div class="stock-search">
    <label class="stock-search__label">
      Ticker-Symbol suchen
      <span class="stock-search__hint">(z.B. SPY, VOO, AAPL, MSFT)</span>
    </label>
    <div class="stock-search__container">
      <div class="stock-search__input-wrapper">
        <input
          :model-value="modelValue"
          type="text"
          placeholder="Ticker eingeben oder aus Liste wählen..."
          @keyup.enter="$emit('search')"
          @input="handleInput"
          @focus="showSuggestions = true"
          @blur="hideSuggestions"
          class="input"
          :class="{ 'input--disabled': isLoading }"
          :disabled="isLoading"
        />
        <!-- Autocomplete Dropdown -->
        <div
          v-if="showSuggestions && suggestions && suggestions.length > 0"
          class="stock-search__dropdown"
        >
          <div
            v-for="stock in suggestions"
            :key="stock.symbol"
            @mousedown="$emit('select', stock)"
            class="stock-search__dropdown-item"
          >
            <div class="flex items-center justify-between">
              <div>
                <span class="stock-search__dropdown-symbol">{{ stock.symbol }}</span>
                <span class="stock-search__dropdown-name">{{ stock.name }}</span>
              </div>
              <span class="stock-search__dropdown-type">{{ stock.type }}</span>
            </div>
          </div>
        </div>
      </div>
      <button
        @click="$emit('search')"
        :disabled="isLoading || !modelValue"
        class="btn btn--primary"
        :class="{ 'btn--disabled': isLoading || !modelValue }"
      >
        <span v-if="isLoading">...</span>
        <span v-else>🔍 Suchen</span>
      </button>
    </div>
    <p v-if="currentApi" class="stock-search__status stock-search__status--loading">
      ⏳ {{ currentApi }}
    </p>
    <p v-else-if="searchError" class="stock-search__status stock-search__status--error">
      ⚠️ {{ searchError }}
    </p>
    <p v-else-if="searchSuccess" class="stock-search__status stock-search__status--success">
      ✅ Daten erfolgreich geladen
      <span v-if="dataSource" class="stock-search__status-source">
        (von {{ dataSource }})
      </span>
      ! Gebe jetzt die Anzahl deiner Anteile ein.
    </p>
    <p v-else-if="modelValue && !isLoading && !showSuggestions" class="stock-search__tip">
      💡 Tipp: Beginne zu tippen, um Vorschläge zu sehen, oder gebe das Ticker-Symbol ein und klicke auf Suchen.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Stock } from '~/composables/useStockSearch'

interface Props {
  modelValue: string
  isLoading?: boolean
  searchError?: string
  searchSuccess?: boolean
  dataSource?: string
  currentApi?: string
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  searchError: undefined,
  searchSuccess: false,
  dataSource: undefined,
  currentApi: undefined
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': []
  'select': [stock: Stock]
}>()

const { filterStocks } = useStockSearch()
const showSuggestions = ref(false)
const suggestions = ref<Stock[]>([])

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  suggestions.value = filterStocks(value)
  showSuggestions.value = true
  emit('update:modelValue', value)
}

const hideSuggestions = () => {
  window.setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}
</script>

