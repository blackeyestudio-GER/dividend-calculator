export const useTheme = () => {
  const theme = ref<'light' | 'dark'>('light')

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    if (process.client) {
      localStorage.setItem('theme', theme.value)
      updateThemeClass()
    }
  }

  const updateThemeClass = () => {
    if (process.client) {
      const root = document.documentElement
      if (theme.value === 'dark') {
        root.classList.add('dark')
        root.classList.remove('light')
      } else {
        root.classList.remove('dark')
        root.classList.remove('light')
      }
    }
  }

  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (savedTheme) {
        theme.value = savedTheme
      } else {
        // Default: Light Mode
        theme.value = 'light'
      }
      updateThemeClass()
    }
  }

  // Initialize immediately if on client
  if (process.client) {
    initTheme()
  }

  onMounted(() => {
    initTheme()
  })

  watch(theme, () => {
    updateThemeClass()
  })

  return {
    theme: readonly(theme),
    toggleTheme,
    initTheme
  }
}

