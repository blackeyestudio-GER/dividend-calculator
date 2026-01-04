<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-section__container">
        <h1 class="hero-section__title">
          Erfolgreich sparen: Der Weg zum sorglosen Leben
        </h1>
        <p class="hero-section__subtitle">
          Lerne, wie du durch intelligentes Sparen und Investieren finanzielle Freiheit erreichst – 
          ohne dich kaputt zu arbeiten oder 20 Side-Hustles zu betreiben.
        </p>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section">
      <div class="story-section__container">
        <div class="story-section__content">
          <h2 class="story-section__title">Meine Geschichte</h2>
          <div class="story-section__text">
            <p>
              Wie viele andere auch, habe ich jahrelang geglaubt, dass finanzieller Erfolg bedeutet, 
              mehr zu arbeiten, mehr Projekte anzunehmen und sich selbst zu überlasten. Ich dachte, 
              dass 20 Side-Hustles der Weg zum Erfolg sind – bis ich erkannt habe, dass das Gegenteil 
              der Fall ist.
            </p>
            <p>
              Die Wahrheit ist: Du musst dich nicht kaputt arbeiten, um finanziell erfolgreich zu sein. 
              Stattdessen geht es darum, <strong>intelligent zu sparen</strong> und dein Geld 
              <strong>richtig zu investieren</strong>. Es geht nicht darum, mehr zu verdienen, sondern 
              darum, das, was du hast, optimal einzusetzen.
            </p>
            <p>
              Durch systematisches Sparen, kluge Investitionen in Dividendenaktien und ETFs sowie 
              eine ausgewogene Lebensweise habe ich gelernt, wie man finanzielle Freiheit erreicht – 
              ohne sich selbst zu opfern.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy Section -->
    <section class="philosophy-section">
      <div class="philosophy-section__container">
        <h2 class="philosophy-section__title">Warum weniger mehr ist</h2>
        <div class="philosophy-section__grid">
          <div class="philosophy-section__card">
            <h3 class="philosophy-section__card-title">Keine 20 Side-Hustles</h3>
            <p class="philosophy-section__card-text">
              Du brauchst nicht unzählige Nebenprojekte, um finanziell erfolgreich zu sein. 
              Fokussiere dich auf das Wesentliche: Sparen und Investieren.
            </p>
          </div>
          <div class="philosophy-section__card">
            <h3 class="philosophy-section__card-title">Work-Life-Balance</h3>
            <p class="philosophy-section__card-text">
              Finanzielle Freiheit bedeutet nicht, sich kaputt zu arbeiten. Es bedeutet, 
              ein ausgewogenes Leben zu führen und trotzdem voranzukommen.
            </p>
          </div>
          <div class="philosophy-section__card">
            <h3 class="philosophy-section__card-title">Systematisches Vorgehen</h3>
            <p class="philosophy-section__card-text">
              Erfolg kommt durch Konsistenz, nicht durch Überlastung. Lerne die richtigen 
              Strategien und wende sie systematisch an.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Transition Section -->
    <section class="transition-section">
      <div class="transition-section__container">
        <h2 class="transition-section__title">Deine Tools für den Erfolg</h2>
        <p class="transition-section__text">
          Um dir auf deinem Weg zu helfen, habe ich praktische Tools und Rechner entwickelt, 
          die dir zeigen, wie du deine Finanzen optimieren kannst:
        </p>
      </div>
    </section>

    <!-- Tools Section -->
    <section class="tools-section">
      <div class="tools-section__container">
        <div class="tools-section__grid">
          <!-- Dividendenrechner -->
          <div id="rechner" class="tools-section__card">
            <h3 class="tools-section__card-title">Dividendenrechner</h3>
            <p class="tools-section__card-text">
              Berechne deine monatlichen und jährlichen Dividendenerträge aus Aktien und ETFs. 
              Sieh auf einen Blick, wie viel passives Einkommen du generieren kannst.
            </p>
            <NuxtLink to="/rechner" class="btn btn--primary">
              Zum Rechner
            </NuxtLink>
          </div>

          <!-- Sparrechner -->
          <div class="tools-section__card">
            <h3 class="tools-section__card-title">Sparrechner</h3>
            <p class="tools-section__card-text">
              Vergleiche verschiedene Sparstrategien und sieh, wie sich dein Vermögen über 
              die Jahre entwickelt. Basierend auf bewährten Methoden wie Ramit Sethi's System.
            </p>
            <NuxtLink to="/sparen" class="btn btn--primary">
              Zum Sparrechner
            </NuxtLink>
          </div>

          <!-- Beliebte ETFs & Aktien -->
          <div class="tools-section__card">
            <h3 class="tools-section__card-title">Beliebte ETFs & Aktien</h3>
            <p class="tools-section__card-text">
              Entdecke die beliebtesten dividendenstarken ETFs und Aktien des Jahres 2025. 
              Perfekt für den Einstieg ins Investieren.
            </p>
            <NuxtLink to="/beliebte-etfs" class="btn btn--primary">
              Zu den beliebten ETFs
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Affiliate Section -->
    <section class="affiliate-section">
      <div class="affiliate-section__container">
        <h2 class="affiliate-section__title">Empfohlene Hardware & Tools</h2>
        <p class="affiliate-section__text">
          Um meine Arbeit zu unterstützen, nutze ich Affiliate-Links. Wenn du über meine Links 
          einkaufst, erhalte ich eine kleine Provision – ohne zusätzliche Kosten für dich. 
          Ich empfehle nur Produkte, die ich selbst nutze und für die ich stehe.
        </p>
        <p class="affiliate-section__text">
          Auf meiner <NuxtLink to="/hardware" class="affiliate-section__link">Hardware-Empfehlungsseite</NuxtLink> 
          findest du eine Übersicht aller Office- und Produktions-Hardware, die ich persönlich nutze 
          und empfehlen kann. Von Laptops über Monitore bis hin zu Peripheriegeräten – alles, 
          was ich für meine tägliche Arbeit verwende.
        </p>
        <NuxtLink to="/hardware" class="btn btn--primary">
          Zu meinen Hardware-Empfehlungen
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">

useHead({
  title: 'Erfolgreich sparen: Der Weg zum sorglosen Leben | Finanzfreiheit',
  meta: [
    {
      name: 'description',
      content: 'Lerne, wie du durch intelligentes Sparen und Investieren finanzielle Freiheit erreichst. Sparstrategien und praktische Tools für deinen Weg zum sorglosen Leben. Keine 20 Side-Hustles nötig – systematisches Vorgehen statt Überlastung.'
    },
    {
      property: 'og:title',
      content: 'Erfolgreich sparen: Der Weg zum sorglosen Leben'
    },
    {
      property: 'og:description',
      content: 'Finanzielle Freiheit ohne sich kaputt zu arbeiten. Lerne systematisches Sparen und Investieren mit praktischen Tools und Rechnern.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'keywords',
      content: 'sparen, dividenden, investieren, finanzielle freiheit, etf, aktien, sparrechner, work-life-balance, passives einkommen, dividendenstrategie, finanzplanung, geldanlage'
    },
    {
      name: 'author',
      content: 'Finanzfreiheit'
    },
    {
      name: 'robots',
      content: 'index, follow'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://dividendenrechner.de/'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Finanzfreiheit',
        description: 'Erfolgreich sparen: Der Weg zum sorglosen Leben',
        url: 'https://dividendenrechner.de/',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://dividendenrechner.de/?s={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Erfolgreich sparen: Der Weg zum sorglosen Leben',
        description: 'Lerne, wie du durch intelligentes Sparen und Investieren finanzielle Freiheit erreichst.',
        author: {
          '@type': 'Person',
          name: 'Finanzfreiheit'
        },
        datePublished: '2025-01-01',
        dateModified: new Date().toISOString().split('T')[0]
      })
    }
  ]
})

</script>
