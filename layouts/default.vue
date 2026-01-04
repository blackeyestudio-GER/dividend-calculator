<template>
  <div class="min-h-screen flex flex-col">
    <NuxtLoadingIndicator :throttle="0" :height="2" />
    <AppHeader />
    <main class="flex-grow">
      <slot />
    </main>
    <AppFooter />
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})

useHead({
  titleTemplate: (title) => title ? `${title} - Finanzfreiheit` : 'Finanzfreiheit',
  script: [
    {
      children: `
        (function() {
          const savedTheme = localStorage.getItem('theme');
          if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        })();
      `,
      type: 'text/javascript'
    }
  ]
})
</script>