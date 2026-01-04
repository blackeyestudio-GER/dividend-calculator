<template>
  <header class="header">
    <nav class="header__nav">
      <div class="header__container">
        <!-- Logo & Navigation -->
        <div class="header__logo-section">
          <NuxtLink to="/" class="header__logo">
            <span class="header__logo-text">Finanzfreiheit</span>
          </NuxtLink>
          
          <div class="header__nav-links">
            <NuxtLink 
              to="/rechner" 
              class="header__nav-link"
              active-class="header__nav-link--active"
            >
              Rechner
            </NuxtLink>
            <NuxtLink 
              to="/beliebte-etfs" 
              class="header__nav-link"
              active-class="header__nav-link--active"
            >
              Beliebte ETFs
            </NuxtLink>
            <NuxtLink 
              to="/hilfe" 
              class="header__nav-link"
              active-class="header__nav-link--active"
            >
              Hilfe
            </NuxtLink>
            <NuxtLink 
              to="/glossar" 
              class="header__nav-link"
              active-class="header__nav-link--active"
            >
              Glossar
            </NuxtLink>
            <NuxtLink 
              to="/sparen" 
              class="header__nav-link"
              active-class="header__nav-link--active"
            >
              Sparen
            </NuxtLink>
            <NuxtLink 
              to="/hardware" 
              class="header__nav-link"
              active-class="header__nav-link--active"
            >
              Hardware
            </NuxtLink>
          </div>
        </div>

        <!-- Theme Toggle & Support Links & Mobile Menu -->
        <div class="header__actions">
          <!-- Support Links (Desktop) -->
          <div class="header__support-links">
            <a
              href="https://www.patreon.com/blackeyestudio"
              target="_blank"
              rel="noopener noreferrer"
              class="header__support-link header__support-link--patreon"
              title="Unterstütze uns auf Patreon"
            >
              Patreon
            </a>
            <a
              href="https://ko-fi.com/blackeyestudio"
              target="_blank"
              rel="noopener noreferrer"
              class="header__support-link header__support-link--kofi"
              title="Unterstütze uns auf Ko-fi"
            >
              Ko-fi
            </a>
          </div>
          
          <button
            @click="toggleTheme"
            class="header__theme-toggle"
            :aria-label="theme === 'dark' ? 'Zu Light Mode wechseln' : 'Zu Dark Mode wechseln'"
          >
            <span v-if="theme === 'dark'" class="text-2xl">☀️</span>
            <span v-else class="text-2xl">🌙</span>
          </button>
          
          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="header__mobile-menu-btn"
            aria-label="Menü öffnen"
          >
            <span class="text-2xl">☰</span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="header__mobile-menu">
        <div class="header__mobile-links">
          <NuxtLink 
            to="/rechner" 
            @click="mobileMenuOpen = false"
            class="header__nav-link"
            active-class="header__nav-link--active"
          >
            Rechner
          </NuxtLink>
          <NuxtLink 
            to="/beliebte-etfs" 
            @click="mobileMenuOpen = false"
            class="header__nav-link"
            active-class="header__nav-link--active"
          >
            Beliebte ETFs
          </NuxtLink>
          <NuxtLink 
            to="/hilfe" 
            @click="mobileMenuOpen = false"
            class="header__nav-link"
            active-class="header__nav-link--active"
          >
            Hilfe
          </NuxtLink>
          <NuxtLink 
            to="/glossar" 
            @click="mobileMenuOpen = false"
            class="header__nav-link"
            active-class="header__nav-link--active"
          >
            Glossar
          </NuxtLink>
          <NuxtLink 
            to="/sparen" 
            @click="mobileMenuOpen = false"
            class="header__nav-link"
            active-class="header__nav-link--active"
          >
            Sparen
          </NuxtLink>
          <NuxtLink 
            to="/hardware" 
            @click="mobileMenuOpen = false"
            class="header__nav-link"
            active-class="header__nav-link--active"
          >
            Hardware
          </NuxtLink>
          <div class="header__mobile-support">
            <a
              href="https://www.patreon.com/blackeyestudio"
              target="_blank"
              rel="noopener noreferrer"
              class="header__mobile-support-link header__mobile-support-link--patreon"
            >
              Patreon
            </a>
            <a
              href="https://ko-fi.com/blackeyestudio"
              target="_blank"
              rel="noopener noreferrer"
              class="header__mobile-support-link header__mobile-support-link--kofi"
            >
              Ko-fi
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { theme, toggleTheme } = useTheme()
const mobileMenuOpen = ref(false)
</script>
