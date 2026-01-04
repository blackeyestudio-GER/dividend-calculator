<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-4">Hilfe zu Dividenden</h1>
      <p class="text-lg text-[var(--color-text-secondary)]">
        Alles was du über Dividenden wissen musst
      </p>
    </div>

    <!-- AdSense -->
    <div class="mb-8 flex justify-center">
      <AdSense />
    </div>

    <!-- Was sind Dividenden? -->
    <section class="card mb-8">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">Was sind Dividenden?</h2>
      <p class="text-[var(--color-text-secondary)] mb-4">
        Eine <NuxtLink to="/glossar#dividende" class="hover:underline" style="color: var(--color-cyan);">Dividende</NuxtLink> ist eine 
        Gewinnausschüttung, die ein Unternehmen an seine Aktionäre zahlt. Wenn du Aktien eines Unternehmens besitzt, 
        hast du Anspruch auf einen Anteil am Gewinn dieses Unternehmens.
      </p>
      <p class="text-[var(--color-text-secondary)]">
        Dividenden werden meist <NuxtLink to="/glossar#quartalsweise" class="hover:underline" style="color: var(--color-cyan);">quartalsweise</NuxtLink> 
        oder jährlich ausgeschüttet und können in Form von Bargeld oder zusätzlichen Aktien gezahlt werden.
      </p>
    </section>

    <!-- Wie funktionieren Dividenden? -->
    <section class="card mb-8">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">Wie funktionieren Dividenden?</h2>
      <div class="space-y-4 text-[var(--color-text-secondary)]">
        <div>
          <h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-2">1. Dividendenrendite</h3>
          <p>
            Die <NuxtLink to="/glossar#dividendenrendite" class="hover:underline font-medium" style="color: var(--color-cyan);">Dividendenrendite</NuxtLink> 
            gibt an, wie viel Prozent des aktuellen Aktienkurses als Dividende ausgeschüttet wird. 
            Sie wird berechnet als: (Jahresdividende pro Aktie / Aktienkurs) × 100
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-2">2. Ausschüttungsintervall</h3>
          <p>
            Dividenden können <NuxtLink to="/glossar#monatlich" class="hover:underline" style="color: var(--color-cyan);">monatlich</NuxtLink>, 
            <NuxtLink to="/glossar#quartalsweise" class="hover:underline" style="color: var(--color-cyan);">quartalsweise</NuxtLink> 
            oder <NuxtLink to="/glossar#jaehrlich" class="hover:underline" style="color: var(--color-cyan);">jährlich</NuxtLink> ausgeschüttet werden. 
            Die meisten US-Unternehmen zahlen quartalsweise.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-2">3. Dividende pro Anteil</h3>
          <p>
            Die <NuxtLink to="/glossar#dividende-pro-anteil" class="hover:underline font-medium" style="color: var(--color-cyan);">Dividende pro Anteil</NuxtLink> 
            ist der Betrag, den du pro Aktie erhältst. Multipliziert mit der Anzahl deiner Aktien ergibt sich deine Gesamtdividende.
          </p>
        </div>
      </div>
    </section>

    <!-- Vorteile von Dividenden -->
    <section class="card mb-8">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">Vorteile von Dividendeninvestitionen</h2>
      <ul class="space-y-3 text-[var(--color-text-secondary)]">
        <li class="flex items-start">
          <span class="text-[var(--color-primary)] mr-2">✓</span>
          <span><strong>Passives Einkommen:</strong> Regelmäßige Ausschüttungen ohne Verkauf der Aktien</span>
        </li>
        <li class="flex items-start">
          <span class="text-[var(--color-primary)] mr-2">✓</span>
          <span><strong>Stabilität:</strong> Dividendenstarke Aktien sind oft weniger volatil</span>
        </li>
        <li class="flex items-start">
          <span class="text-[var(--color-primary)] mr-2">✓</span>
          <span><strong>Wachstumspotenzial:</strong> Dividenden können reinvestiert werden (Compound-Effekt)</span>
        </li>
        <li class="flex items-start">
          <span class="text-[var(--color-primary)] mr-2">✓</span>
          <span><strong>Inflationsschutz:</strong> Viele Unternehmen erhöhen ihre Dividenden regelmäßig</span>
        </li>
      </ul>
    </section>

    <!-- Risiken -->
    <section class="card mb-8">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">Risiken von Dividendeninvestitionen</h2>
      <ul class="space-y-3 text-[var(--color-text-secondary)]">
        <li class="flex items-start">
          <span class="text-[var(--color-accent)] mr-2">⚠</span>
          <span><strong>Dividendenkürzungen:</strong> Unternehmen können Dividenden reduzieren oder aussetzen</span>
        </li>
        <li class="flex items-start">
          <span class="text-[var(--color-accent)] mr-2">⚠</span>
          <span><strong>Kursrisiko:</strong> Der Aktienkurs kann fallen, auch wenn Dividenden gezahlt werden</span>
        </li>
        <li class="flex items-start">
          <span class="text-[var(--color-accent)] mr-2">⚠</span>
          <span><strong>Steuern:</strong> Dividenden sind steuerpflichtig (Quellensteuer, Kapitalertragssteuer)</span>
        </li>
        <li class="flex items-start">
          <span class="text-[var(--color-accent)] mr-2">⚠</span>
          <span><strong>Währungsrisiko:</strong> Bei ausländischen Aktien kann der Wechselkurs die Rendite beeinflussen</span>
        </li>
      </ul>
    </section>

    <!-- Wie verwende ich den Rechner? -->
    <section class="card mb-8">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">Wie verwende ich den Dividendenrechner?</h2>
      <ol class="space-y-4 text-[var(--color-text-secondary)] list-decimal list-inside">
        <li>
          <strong>Gib das Ticker-Symbol ein:</strong> Z.B. "SPY" für den S&P 500 ETF oder "AAPL" für Apple
        </li>
        <li>
          <strong>Klicke auf "Suchen":</strong> Der Rechner sucht automatisch nach aktuellen Dividendeninformationen
        </li>
        <li>
          <strong>Gib deine Anzahl Anteile ein:</strong> Wie viele Aktien oder ETF-Anteile besitzt du?
        </li>
        <li>
          <strong>Ergebnis ansehen:</strong> Der Rechner zeigt dir automatisch deine monatliche und jährliche Dividende
        </li>
      </ol>
    </section>

    <!-- Häufige Fragen -->
    <section class="card mb-8">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">Häufige Fragen (FAQ)</h2>
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Hängen Dividenden vom Einstandspreis ab?</h3>
          <p class="text-[var(--color-text-secondary)]">
            Nein! Dividenden werden basierend auf dem aktuellen Aktienkurs berechnet, nicht auf dem Preis, zu dem du gekauft hast. 
            Wenn du eine Aktie für 100€ gekauft hast und sie jetzt 150€ wert ist, wird die Dividende trotzdem auf Basis von 150€ berechnet.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Beeinflussen Kursgewinne die Dividenden?</h3>
          <p class="text-[var(--color-text-secondary)]">
            Nein, Kursgewinne und Dividenden sind unabhängig voneinander. Eine steigende Aktie bedeutet nicht automatisch höhere Dividenden, 
            und umgekehrt können Dividenden auch bei fallenden Kursen gezahlt werden.
          </p>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Wie genau sind die Berechnungen?</h3>
          <p class="text-[var(--color-text-secondary)]">
            Unser Rechner verwendet aktuelle Daten von verschiedenen Finanzquellen. Die Berechnungen sind Schätzungen basierend auf 
            historischen Dividenden und aktuellen Renditen. Tatsächliche Dividenden können variieren.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Hilfe zu Dividenden'
})
</script>

