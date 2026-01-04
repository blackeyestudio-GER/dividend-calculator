<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-4">Glossar</h1>
      <p class="text-lg text-[var(--color-text-secondary)]">
        Erklärung wichtiger Begriffe rund um Dividenden und Aktieninvestitionen
      </p>
    </div>

    <!-- AdSense -->
    <div class="mb-8 flex justify-center">
      <AdSense />
    </div>

    <!-- Glossar Einträge -->
    <div class="space-y-6">
      <div 
        v-for="term in glossaryTerms" 
        :key="term.id"
        :id="term.id"
        class="card scroll-mt-20"
      >
        <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-3">{{ term.term }}</h2>
        <p class="text-[var(--color-text-secondary)] leading-relaxed">{{ term.definition }}</p>
        <div v-if="term.example" class="mt-4 p-4 bg-[var(--color-surface)] rounded-lg">
          <p class="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Beispiel:</p>
          <p class="text-sm text-[var(--color-text-secondary)]">{{ term.example }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Glossar'
})

const glossaryTerms = [
  {
    id: 'dividende',
    term: 'Dividende',
    definition: 'Eine Dividende ist eine Gewinnausschüttung, die ein Unternehmen an seine Aktionäre zahlt. Sie wird meist quartalsweise oder jährlich ausgeschüttet und kann in Form von Bargeld oder zusätzlichen Aktien gezahlt werden.',
    example: 'Wenn Apple eine Quartalsdividende von 0,24$ pro Aktie ausschüttet und du 100 Aktien besitzt, erhältst du 24$ Dividende.'
  },
  {
    id: 'dividendenrendite',
    term: 'Dividendenrendite',
    definition: 'Die Dividendenrendite gibt an, wie viel Prozent des aktuellen Aktienkurses als Dividende ausgeschüttet wird. Sie wird berechnet als: (Jahresdividende pro Aktie / Aktienkurs) × 100. Eine höhere Rendite bedeutet nicht automatisch eine bessere Investition.',
    example: 'Wenn eine Aktie 100€ kostet und 3€ Jahresdividende zahlt, beträgt die Dividendenrendite 3%.'
  },
  {
    id: 'dividende-pro-anteil',
    term: 'Dividende pro Anteil',
    definition: 'Der Betrag, den du pro Aktie oder ETF-Anteil als Dividende erhältst. Multipliziert mit der Anzahl deiner Anteile ergibt sich deine Gesamtdividende.',
    example: 'Wenn die Dividende pro Anteil 0,50€ beträgt und du 50 Anteile besitzt, erhältst du insgesamt 25€ Dividende.'
  },
  {
    id: 'etf',
    term: 'ETF (Exchange Traded Fund)',
    definition: 'Ein börsengehandelter Fonds, der einen Index (z.B. S&P 500) nachbildet. ETFs bieten breite Diversifikation, niedrige Kosten und können an der Börse wie Aktien gehandelt werden.',
    example: 'Der SPY ETF bildet den S&P 500 Index ab und enthält Anteile an den 500 größten US-Unternehmen.'
  },
  {
    id: 'ticker-symbol',
    term: 'Ticker-Symbol',
    definition: 'Ein eindeutiger Code, der eine Aktie oder einen ETF an der Börse identifiziert. Ticker-Symbole bestehen meist aus 1-5 Buchstaben.',
    example: 'AAPL für Apple, SPY für den S&P 500 ETF, MSFT für Microsoft.'
  },
  {
    id: 'quartalsweise',
    term: 'Quartalsweise Ausschüttung',
    definition: 'Dividenden werden vier Mal im Jahr ausgeschüttet, also alle drei Monate. Dies ist die häufigste Form der Dividendenausschüttung bei US-Unternehmen.',
    example: 'Ein Unternehmen zahlt im März, Juni, September und Dezember Dividenden.'
  },
  {
    id: 'monatlich',
    term: 'Monatliche Ausschüttung',
    definition: 'Dividenden werden jeden Monat ausgeschüttet, also zwölf Mal im Jahr. Dies ist seltener als quartalsweise Ausschüttungen, kommt aber bei einigen REITs und ETFs vor.',
    example: 'Ein monatlich ausschüttender ETF zahlt jeden Monat eine Dividende.'
  },
  {
    id: 'jaehrlich',
    term: 'Jährliche Ausschüttung',
    definition: 'Dividenden werden einmal pro Jahr ausgeschüttet. Dies ist weniger häufig als quartalsweise Ausschüttungen und kommt vor allem bei europäischen Unternehmen vor.',
    example: 'Ein Unternehmen zahlt einmal im Jahr, z.B. im Mai, eine Dividende.'
  },
  {
    id: 'dividendenaristokrat',
    term: 'Dividendenaristokrat',
    definition: 'Ein Unternehmen, das seine Dividende mindestens 25 Jahre lang jedes Jahr erhöht hat. Diese Unternehmen gelten als besonders zuverlässig für Dividendeninvestoren.',
    example: 'Johnson & Johnson hat seine Dividende über 60 Jahre lang kontinuierlich erhöht.'
  },
  {
    id: 'ex-dividend-date',
    term: 'Ex-Dividenden-Datum',
    definition: 'Das Datum, ab dem eine Aktie ohne Anspruch auf die nächste Dividende gehandelt wird. Um die Dividende zu erhalten, musst du die Aktie vor diesem Datum besitzen.',
    example: 'Wenn das Ex-Dividenden-Datum der 15. März ist, musst du die Aktie spätestens am 14. März kaufen.'
  },
  {
    id: 'ausschuettungsquote',
    term: 'Ausschüttungsquote',
    definition: 'Der Prozentsatz des Gewinns, den ein Unternehmen als Dividende ausschüttet. Eine zu hohe Quote kann problematisch sein, da wenig Geld für Investitionen bleibt.',
    example: 'Wenn ein Unternehmen 2€ Gewinn pro Aktie macht und 1€ Dividende zahlt, beträgt die Ausschüttungsquote 50%.'
  },
  {
    id: 'reinvestition',
    term: 'Dividendenreinvestition',
    definition: 'Das automatische Wiederanlegen von Dividenden in zusätzliche Aktien. Dies nutzt den Zinseszinseffekt und kann langfristig zu erheblichem Vermögenswachstum führen.',
    example: 'Statt 100€ Dividende auszuzahlen, kaufst du automatisch weitere Aktien für 100€.'
  }
]
</script>

