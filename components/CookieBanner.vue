<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-if="showBanner"
      class="cookie-banner"
    >
      <div class="cookie-banner__container">
        <div class="cookie-banner__content">
          <div class="cookie-banner__text">
            <h3 class="cookie-banner__title">
              🍪 Cookie-Einstellungen
            </h3>
            <p class="cookie-banner__description">
              Wir verwenden Cookies, um die Funktionalität unserer Website zu gewährleisten und deine Erfahrung zu verbessern. 
              Durch Klicken auf "Akzeptieren" stimmst du der Verwendung von Cookies zu. 
              Weitere Informationen findest du in unserer <NuxtLink to="/datenschutz" class="cookie-banner__link">Datenschutzerklärung</NuxtLink>.
            </p>
          </div>
          <div class="cookie-banner__buttons">
            <button
              @click="acceptCookies"
              class="cookie-banner__button cookie-banner__button--primary"
            >
              Akzeptieren
            </button>
            <button
              @click="declineCookies"
              class="cookie-banner__button cookie-banner__button--secondary"
            >
              Ablehnen
            </button>
            <button
              @click="showSettings = !showSettings"
              class="cookie-banner__button cookie-banner__button--secondary"
            >
              Einstellungen
            </button>
          </div>
        </div>

        <!-- Cookie-Einstellungen -->
        <Transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="showSettings" class="cookie-banner__settings">
            <div class="space-y-3">
              <div class="cookie-banner__settings-item">
                <div>
                  <p class="cookie-banner__settings-label">Notwendige Cookies</p>
                  <p class="cookie-banner__settings-description">Diese Cookies sind für die Grundfunktionen der Website erforderlich.</p>
                </div>
                <input
                  type="checkbox"
                  checked
                  disabled
                  class="cookie-banner__settings-checkbox"
                />
              </div>
              <div class="cookie-banner__settings-item">
                <div>
                  <p class="cookie-banner__settings-label">Analyse-Cookies</p>
                  <p class="cookie-banner__settings-description">Helfen uns zu verstehen, wie Besucher mit der Website interagieren.</p>
                </div>
                <input
                  v-model="cookieSettings.analytics"
                  type="checkbox"
                  class="cookie-banner__settings-checkbox"
                />
              </div>
              <div class="cookie-banner__settings-item">
                <div>
                  <p class="cookie-banner__settings-label">Marketing-Cookies</p>
                  <p class="cookie-banner__settings-description">Werden verwendet, um relevante Werbung anzuzeigen.</p>
                </div>
                <input
                  v-model="cookieSettings.marketing"
                  type="checkbox"
                  class="cookie-banner__settings-checkbox"
                />
              </div>
              <button
                @click="saveCookieSettings"
                class="cookie-banner__button cookie-banner__button--primary cookie-banner__settings-save"
              >
                Einstellungen speichern
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const showBanner = ref(false)
const showSettings = ref(false)

const cookieSettings = ref({
  analytics: false,
  marketing: false
})

const checkCookieConsent = () => {
  if (process.client) {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      showBanner.value = true
    } else {
      const settings = JSON.parse(consent)
      cookieSettings.value = {
        analytics: settings.analytics || false,
        marketing: settings.marketing || false
      }
    }
  }
}

const acceptCookies = () => {
  if (process.client) {
    localStorage.setItem('cookieConsent', JSON.stringify({
      accepted: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    }))
    cookieSettings.value = { analytics: true, marketing: true }
    showBanner.value = false
  }
}

const declineCookies = () => {
  if (process.client) {
    localStorage.setItem('cookieConsent', JSON.stringify({
      accepted: false,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    }))
    cookieSettings.value = { analytics: false, marketing: false }
    showBanner.value = false
  }
}

const saveCookieSettings = () => {
  if (process.client) {
    localStorage.setItem('cookieConsent', JSON.stringify({
      accepted: true,
      analytics: cookieSettings.value.analytics,
      marketing: cookieSettings.value.marketing,
      timestamp: new Date().toISOString()
    }))
    showBanner.value = false
    showSettings.value = false
  }
}

onMounted(() => {
  checkCookieConsent()
})
</script>

