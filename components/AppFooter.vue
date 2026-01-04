<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__grid">
        <!-- Über uns -->
        <div>
          <h3 class="footer__section-title">Über uns</h3>
          <p class="footer__section-text">
            Finanzfreiheit - Tools und Strategien für deinen Weg zum sorglosen Leben durch intelligentes Sparen und Investieren.
          </p>
        </div>

        <!-- Navigation -->
        <div>
          <h3 class="footer__section-title">Navigation</h3>
          <ul class="footer__section-list">
            <li>
              <NuxtLink to="/" class="footer__link">
                Rechner
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/beliebte-etfs" class="footer__link">
                Beliebte ETFs
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/hilfe" class="footer__link">
                Hilfe
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/glossar" class="footer__link">
                Glossar
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/sparen" class="footer__link">
                Sparen
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/hardware" class="footer__link">
                Hardware
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Rechtliches -->
        <div>
          <h3 class="footer__section-title">Rechtliches</h3>
          <ul class="footer__section-list">
            <li>
              <NuxtLink to="/impressum" class="footer__link">
                Impressum
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/datenschutz" class="footer__link">
                Datenschutz
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/agb" class="footer__link">
                AGB
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Kontakt & Support -->
        <div>
          <h3 class="footer__section-title">Kontakt & Support</h3>
          <p class="footer__section-text mb-3">
            Fragen oder Anregungen?<br>
            Kontaktiere uns über das <NuxtLink to="/impressum" class="footer__link">Impressum</NuxtLink>.
          </p>
          <div class="footer__support-links">
            <a
              href="https://www.patreon.com/blackeyestudio"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__support-link footer__support-link--patreon"
              title="Unterstütze uns auf Patreon"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.17 2.17c-3.87 0-7 3.13-7 7 0 3.86 3.13 7 7 7s7-3.14 7-7c0-3.87-3.13-7-7-7zm-.34 12.02H12.5v-7.1h2.33v7.1zm-2.34 0H10.16v-7.1h2.33v7.1z"/>
              </svg>
              Patreon
            </a>
            <a
              href="https://ko-fi.com/blackeyestudio"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__support-link footer__support-link--kofi"
              title="Unterstütze uns auf Ko-fi"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.881 8.58c0-4.54-3.7-8.24-8.24-8.24-4.54 0-8.24 3.7-8.24 8.24 0 4.54 3.7 8.24 8.24 8.24 4.54 0 8.24-3.7 8.24-8.24zm-8.24 6.96c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm-1.5-4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
              Ko-fi
            </a>
          </div>
        </div>
      </div>

      <div class="footer__copyright">
        <p>&copy; {{ new Date().getFullYear() }} Finanzfreiheit. Alle Rechte vorbehalten.</p>
      </div>
    </div>
  </footer>
</template>
