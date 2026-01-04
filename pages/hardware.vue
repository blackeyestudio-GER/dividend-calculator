<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-4">Empfohlene Hardware & Tools</h1>
      <p class="text-lg text-[var(--color-text-secondary)]">
        Office- und Produktions-Hardware, die ich persönlich nutze und empfehlen kann
      </p>
    </div>

    <!-- Affiliate Hinweis -->
    <div class="card mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
      <p class="text-sm text-[var(--color-text-secondary)]">
        <strong>Hinweis:</strong> Diese Seite enthält Affiliate-Links. Wenn du über meine Links einkaufst, 
        erhalte ich eine kleine Provision – ohne zusätzliche Kosten für dich. Ich empfehle nur Produkte, 
        die ich selbst nutze und für die ich stehe.
      </p>
    </div>

    <!-- Hardware Kategorien -->
    <div class="space-y-12">
      <!-- Laptops -->
      <section class="hardware-section">
        <h2 class="hardware-section__title">Laptops & Computer</h2>
        <div class="hardware-section__grid">
          <div class="hardware-section__card">
            <h3 class="hardware-section__card-title">MacBook Pro</h3>
            <p class="hardware-section__card-description">
              Mein Hauptarbeitsgerät für Entwicklung und Content-Erstellung. 
              Leistungsstark, zuverlässig und mit exzellenter Akkulaufzeit.
            </p>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer sponsored"
              class="btn btn--primary"
            >
              Bei Amazon ansehen
            </a>
          </div>
          <!-- Weitere Laptops hier hinzufügen -->
        </div>
      </section>

      <!-- Monitore -->
      <section class="hardware-section">
        <h2 class="hardware-section__title">Monitore</h2>
        <div class="hardware-section__grid">
          <div class="hardware-section__card">
            <h3 class="hardware-section__card-title">4K Monitor</h3>
            <p class="hardware-section__card-description">
              Für produktive Arbeit und präzises Arbeiten. Scharfe Darstellung 
              und ausreichend Platz für mehrere Fenster.
            </p>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer sponsored"
              class="btn btn--primary"
            >
              Bei Amazon ansehen
            </a>
          </div>
          <!-- Weitere Monitore hier hinzufügen -->
        </div>
      </section>

      <!-- Peripherie -->
      <section class="hardware-section">
        <h2 class="hardware-section__title">Peripherie & Zubehör</h2>
        <div class="hardware-section__grid">
          <div class="hardware-section__card">
            <h3 class="hardware-section__card-title">Mechanische Tastatur</h3>
            <p class="hardware-section__card-description">
              Für komfortables und schnelles Tippen. Wichtig für produktive 
              Arbeit am Computer.
            </p>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer sponsored"
              class="btn btn--primary"
            >
              Bei Amazon ansehen
            </a>
          </div>
          <!-- Weitere Peripherie hier hinzufügen -->
        </div>
      </section>
    </div>

    <!-- Disclaimer -->
    <div class="mt-12 card">
      <h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Wichtiger Hinweis</h3>
      <p class="text-sm text-[var(--color-text-secondary)]">
        Alle hier aufgeführten Produkte nutze ich persönlich in meinem Arbeitsalltag. 
        Die Empfehlungen basieren auf meinen eigenen Erfahrungen. Preise und Verfügbarkeit 
        können sich ändern. Bitte prüfe die aktuellen Angebote direkt beim Anbieter.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Empfohlene Hardware & Tools | Office & Produktions-Ausrüstung',
  meta: [
    {
      name: 'description',
      content: 'Office- und Produktions-Hardware, die ich persönlich nutze und empfehlen kann. Laptops, Monitore, Peripherie und mehr für produktive Arbeit. Affiliate-Links zu bewährten Produkten.'
    },
    {
      name: 'keywords',
      content: 'hardware, laptop, monitor, tastatur, office ausstattung, produktions hardware, empfohlene produkte, affiliate'
    },
    {
      property: 'og:title',
      content: 'Empfohlene Hardware & Tools'
    },
    {
      property: 'og:description',
      content: 'Office- und Produktions-Hardware, die ich persönlich nutze und empfehlen kann.'
    }
  ]
})
</script>

