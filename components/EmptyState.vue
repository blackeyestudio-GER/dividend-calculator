<template>
  <div
    v-if="show"
    class="empty-state"
  >
    <p class="empty-state__text">
      Noch keine Positionen hinzugefügt
    </p>
    <p class="empty-state__hint">
      Gebe ein Aktien- oder ETF-Symbol ein, um zu beginnen
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
}

defineProps<Props>()
</script>

