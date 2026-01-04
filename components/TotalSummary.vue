<template>
  <div
    v-if="show"
    class="total-summary"
  >
    <h2 class="total-summary__title">Gesamtsumme</h2>
    <div class="total-summary__grid">
      <div class="total-summary__item">
        <p class="total-summary__label">Monatliche Dividende gesamt</p>
        <p class="total-summary__value">
          {{ formatCurrency(totalMonthly) }}
        </p>
      </div>
      <div class="total-summary__item">
        <p class="total-summary__label">Jahresdividende gesamt</p>
        <p class="total-summary__value">
          {{ formatCurrency(totalAnnual) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Position } from '~/composables/useDividendCalculation'

interface Props {
  positions: Position[]
}

const props = defineProps<Props>()

const { calculateAnnualDividend, calculateMonthlyDividend, formatCurrency } = useDividendCalculation()

const totalMonthly = computed(() => {
  return props.positions.reduce((sum, pos) => {
    return sum + calculateMonthlyDividend(pos)
  }, 0)
})

const totalAnnual = computed(() => {
  return props.positions.reduce((sum, pos) => {
    return sum + calculateAnnualDividend(pos)
  }, 0)
})

const show = computed(() => {
  return props.positions.length > 0 && totalAnnual.value > 0
})
</script>

