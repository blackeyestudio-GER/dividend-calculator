<template>
  <div
    v-if="show"
    class="dividend-display"
  >
    <h4 class="dividend-display__title">📊 Dividendenberechnung</h4>
    
    <div class="dividend-display__grid">
      <!-- Per Share - Monthly -->
      <div v-if="method === 'perShare' && payoutInterval === 'monthly'" class="dividend-display__item">
        <p class="dividend-display__label">Monatliche Dividende</p>
        <p class="dividend-display__value">
          {{ formatCurrency(monthlyDividend) }}
        </p>
        <p class="dividend-display__detail">
          {{ dividendPerShare }}€ × {{ shares }} Anteile
        </p>
      </div>
      
      <!-- Per Share - Quarterly -->
      <div v-if="method === 'perShare' && payoutInterval === 'quarterly'" class="dividend-display__item">
        <p class="dividend-display__label">Quartalsweise Dividende</p>
        <p class="dividend-display__value">
          {{ formatCurrency(quarterlyDividend) }}
        </p>
        <p class="dividend-display__detail">
          {{ dividendPerShare }}€ × {{ shares }} Anteile
        </p>
      </div>
      
      <!-- Per Share - Yearly -->
      <div v-if="method === 'perShare' && payoutInterval === 'yearly'" class="dividend-display__item">
        <p class="dividend-display__label">Jährliche Dividende</p>
        <p class="dividend-display__value">
          {{ formatCurrency(annualDividend) }}
        </p>
        <p class="dividend-display__detail">
          {{ dividendPerShare }}€ × {{ shares }} Anteile
        </p>
      </div>
      
      <!-- Yield Method -->
      <div v-if="method === 'yield'" class="dividend-display__item">
        <p class="dividend-display__label">Monatliche Dividende</p>
        <p class="dividend-display__value">
          {{ formatCurrency(monthlyDividend) }}
        </p>
        <p class="dividend-display__detail">
          {{ dividendYield }}% von {{ formatCurrency(totalValue) }}
        </p>
      </div>
      
      <!-- Jahresdividende -->
      <div class="dividend-display__item">
        <p class="dividend-display__label">Jahresdividende</p>
        <p class="dividend-display__value">
          {{ formatCurrency(annualDividend) }}
        </p>
      </div>
      
      <!-- Monatlich (glattgerechnet) -->
      <div class="dividend-display__item">
        <p class="dividend-display__label">Monatlich (glattgerechnet)</p>
        <p class="dividend-display__value">
          {{ formatCurrency(monthlyDividend) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CalculationMethod, PayoutInterval } from '~/composables/useDividendCalculation'

interface Props {
  method: CalculationMethod
  shares: number
  dividendPerShare?: number
  payoutInterval?: PayoutInterval
  dividendYield?: number
  currentValue?: number
}

const props = defineProps<Props>()

const { calculateAnnualDividend, calculateMonthlyDividend, formatCurrency } = useDividendCalculation()

const annualDividend = computed(() => {
  return calculateAnnualDividend({
    method: props.method,
    shares: props.shares,
    dividendPerShare: props.dividendPerShare,
    payoutInterval: props.payoutInterval,
    dividendYield: props.dividendYield,
    currentValue: props.currentValue,
    id: 0,
    name: ''
  })
})

const monthlyDividend = computed(() => {
  return calculateMonthlyDividend({
    method: props.method,
    shares: props.shares,
    dividendPerShare: props.dividendPerShare,
    payoutInterval: props.payoutInterval,
    dividendYield: props.dividendYield,
    currentValue: props.currentValue,
    id: 0,
    name: ''
  })
})

const quarterlyDividend = computed(() => {
  if (props.method === 'perShare' && props.dividendPerShare) {
    return props.dividendPerShare * props.shares
  }
  return annualDividend.value / 4
})

const totalValue = computed(() => {
  return (props.currentValue || 0) * props.shares
})

const show = computed(() => {
  if (props.shares <= 0) return false
  if (props.method === 'perShare' && props.dividendPerShare && props.dividendPerShare > 0) return true
  if (props.method === 'yield' && props.dividendYield && props.dividendYield > 0 && props.currentValue && props.currentValue > 0) return true
  return false
})
</script>

