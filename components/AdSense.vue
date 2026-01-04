<template>
  <div v-if="effectiveClientId && effectiveSlotId" class="adsense-container">
    <div class="adsense-container__wrapper">
      <ins
        class="adsbygoogle"
        :style="`display:block; width: ${width}px; height: ${height}px;`"
        :data-ad-client="effectiveClientId"
        :data-ad-slot="effectiveSlotId"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  </div>
  <div v-else class="adsense-container adsense-container--placeholder">
    <div class="adsense-container__placeholder">
      <p class="adsense-container__placeholder-text">AdSense Werbung</p>
      <p class="adsense-container__placeholder-hint">Client-ID und Slot-ID werden konfiguriert</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  clientId?: string
  slotId?: string
  width?: number
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 728,
  height: 90
})

// Get default values from composable if not provided as props
const { clientId: defaultClientId, defaultSlotId } = useAdSense()
const effectiveClientId = computed(() => props.clientId || defaultClientId.value)
const effectiveSlotId = computed(() => props.slotId || defaultSlotId.value)

// TypeScript declaration for AdSense
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

onMounted(() => {
  if (effectiveClientId.value && effectiveSlotId.value && process.client) {
    nextTick(() => {
      try {
        // Load AdSense script if not already loaded
        if (!window.adsbygoogle) {
          const script = document.createElement('script')
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + effectiveClientId.value
          script.async = true
          script.crossOrigin = 'anonymous'
          document.head.appendChild(script)
        }

        // Initialize ads after a short delay to ensure script is loaded
        setTimeout(() => {
          try {
            if (window.adsbygoogle) {
              ;(window.adsbygoogle = window.adsbygoogle || []).push({})
            }
          } catch (e) {
            console.error('AdSense initialization error:', e)
          }
        }, 500)
      } catch (e) {
        console.error('AdSense script loading error:', e)
      }
    })
  }
})
</script>

