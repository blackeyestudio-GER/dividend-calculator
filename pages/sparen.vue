<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-12 text-center">
      <h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-4">Wie man richtig spart</h1>
      <p class="text-lg text-[var(--color-text-secondary)]">
        Basierend auf den Prinzipien von Ramit Sethi und bewährten deutschen Sparstrategien
      </p>
    </div>

    <!-- AdSense -->
    <div class="mb-8 flex justify-center">
      <AdSense />
    </div>

    <!-- Einführung -->
    <div class="card mb-8">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">Die beiden Sparsysteme</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
          <h3 class="text-xl font-semibold text-[var(--color-text-primary)] mb-2">Ramit Sethi's System</h3>
          <p class="text-[var(--color-text-secondary)] text-sm mb-3">
            Basierend auf seinem Bestseller "I Will Teach You To Be Rich" empfiehlt Ramit Sethi ein pragmatisches Budget-System:
          </p>
          <ul class="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <li>• <strong>50-60% Fixkosten:</strong> Wohnung, Essen, Transport, Versicherungen</li>
            <li>• <strong>10% Investitionen:</strong> Sparen und Investieren für die Zukunft</li>
            <li>• <strong>5-10% Spaß:</strong> Genieße dein Leben jetzt</li>
            <li>• <strong>20-35% Flexibel:</strong> Für andere Ausgaben</li>
          </ul>
        </div>
        <div class="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
          <h3 class="text-xl font-semibold text-[var(--color-text-primary)] mb-2">Deutsches 50/30/20 System</h3>
          <p class="text-[var(--color-text-secondary)] text-sm mb-3">
            Ein bewährtes deutsches Budget-System, angepasst an hiesige Verhältnisse:
          </p>
          <ul class="space-y-2 text-sm text-[var(--color-text-secondary)]">
            <li>• <strong>50% Fixkosten:</strong> Wohnung, Nebenkosten, Versicherungen, Lebensmittel</li>
            <li>• <strong>30% Lifestyle:</strong> Freizeit, Hobbys, Restaurant, Shopping</li>
            <li>• <strong>20% Sparen:</strong> Notgroschen, Investitionen, Altersvorsorge</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Sparrechner -->
    <div class="card mb-8">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-6">Sparrechner</h2>
      
      <!-- Input-Felder -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <label class="block text-[var(--color-text-secondary)] mb-2 font-medium">Monatliches Nettoeinkommen (€)</label>
          <input
            v-model.number="monthlyIncome"
            type="number"
            min="0"
            step="100"
            placeholder="z.B. 3000"
            class="input"
          />
        </div>
        <div>
          <label class="block text-[var(--color-text-secondary)] mb-2 font-medium">Zeitraum (Jahre)</label>
          <select v-model="timeframe" class="input">
            <option :value="5">5 Jahre</option>
            <option :value="10">10 Jahre</option>
            <option :value="15">15 Jahre</option>
            <option :value="20">20 Jahre</option>
            <option :value="25">25 Jahre</option>
            <option :value="50">50 Jahre</option>
          </select>
        </div>
        <div>
          <label class="block text-[var(--color-text-secondary)] mb-2 font-medium">Erwartete Rendite (% p.a.)</label>
          <input
            v-model.number="expectedReturn"
            type="number"
            min="0"
            max="20"
            step="0.1"
            placeholder="z.B. 7"
            class="input"
          />
        </div>
        <div>
          <label class="block text-[var(--color-text-secondary)] mb-2 font-medium">Sparrate</label>
          <select v-model="savingsRate" class="input">
            <option value="light">Leicht - Ramit: 10%, Deutsch: 20%</option>
            <option value="normal">Normal - Ramit: 15%, Deutsch: 20%</option>
            <option value="aggressive">Aggressiv - Beide: 20%</option>
          </select>
          <p class="text-xs text-[var(--color-text-muted)] mt-1">
            Die Sparrate beeinflusst nur Ramit's System. Das deutsche System spart immer 20%.
          </p>
        </div>
      </div>

      <!-- Ausgabenaufteilung -->
      <div v-if="monthlyIncome > 0" class="mb-8 grid md:grid-cols-2 gap-6">
        <div class="p-6 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
          <h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Ramit Sethi - Monatliche Aufteilung</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-[var(--color-text-secondary)]">Fixkosten (55%):</span>
              <span class="text-[var(--color-text-primary)] font-semibold">{{ formatCurrency(ramitExpenses.fixed) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[var(--color-text-secondary)]">Investitionen ({{ (savingsRatePercentages[savingsRate].ramit * 100).toFixed(0) }}%):</span>
              <span class="text-green-600 dark:text-green-400 font-semibold">{{ formatCurrency(ramitExpenses.savings) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[var(--color-text-secondary)]">Spaß (10%):</span>
              <span class="text-[var(--color-text-primary)] font-semibold">{{ formatCurrency(ramitExpenses.fun) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[var(--color-text-secondary)]">Flexibel:</span>
              <span class="text-[var(--color-text-primary)] font-semibold">{{ formatCurrency(ramitExpenses.flexible) }}</span>
            </div>
          </div>
        </div>
        <div class="p-6 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
          <h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Deutsches System - Monatliche Aufteilung</h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-[var(--color-text-secondary)]">Fixkosten (50%):</span>
              <span class="text-[var(--color-text-primary)] font-semibold">{{ formatCurrency(germanExpenses.fixed) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[var(--color-text-secondary)]">Lifestyle (30%):</span>
              <span class="text-[var(--color-text-primary)] font-semibold">{{ formatCurrency(germanExpenses.lifestyle) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[var(--color-text-secondary)]">Sparen (20%):</span>
              <span class="text-green-600 dark:text-green-400 font-semibold">{{ formatCurrency(germanExpenses.savings) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Berechnung -->
      <div v-if="monthlyIncome > 0" class="space-y-8">
        <!-- Vergleichstabelle -->
        <div>
          <h3 class="text-xl font-semibold text-[var(--color-text-primary)] mb-4">Jährliche Entwicklung</h3>
          <div class="overflow-x-auto max-h-96 overflow-y-auto border border-[var(--color-border)] rounded-lg">
            <table class="w-full">
              <thead class="sticky top-0 bg-[var(--color-surface)] z-10">
                <tr class="border-b border-[var(--color-border)]">
                  <th class="text-left py-3 px-4 font-semibold text-[var(--color-text-primary)]">Jahr</th>
                  <th class="text-right py-3 px-4 font-semibold text-[var(--color-text-primary)]">Ramit System</th>
                  <th class="text-right py-3 px-4 font-semibold text-[var(--color-text-primary)]">Deutsches System</th>
                  <th class="text-right py-3 px-4 font-semibold text-[var(--color-text-primary)]">Differenz</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(row, index) in comparisonTable" 
                  :key="index"
                  class="border-b border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors"
                >
                  <td class="py-3 px-4 text-[var(--color-text-primary)] font-medium">{{ row.year }}</td>
                  <td class="py-3 px-4 text-right text-[var(--color-text-primary)]">{{ formatCurrency(row.ramit) }}</td>
                  <td class="py-3 px-4 text-right text-[var(--color-text-primary)]">{{ formatCurrency(row.german) }}</td>
                  <td class="py-3 px-4 text-right" :class="row.difference >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'">
                    {{ formatCurrency(row.difference) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Graph -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold text-[var(--color-text-primary)] mb-4">Vergleich über Zeit</h3>
          <div class="bg-[var(--color-surface)] rounded-lg p-6 border border-[var(--color-border)]">
            <canvas ref="chartCanvas" style="max-height: 400px;"></canvas>
          </div>
          <p class="text-sm text-[var(--color-text-muted)] mt-2 text-center">
            Die Grafik zeigt das Wachstum deines Vermögens über {{ timeframe }} Jahre mit einer erwarteten Rendite von {{ expectedReturn }}% p.a.
          </p>
        </div>

        <!-- Zusammenfassung -->
        <div class="grid md:grid-cols-2 gap-6 mt-8">
          <div class="p-6 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
            <h4 class="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Ramit Sethi System</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-[var(--color-text-secondary)]">Monatliche Sparrate:</span>
                <span class="text-[var(--color-text-primary)] font-semibold">{{ formatCurrency(ramitMonthlySavings) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[var(--color-text-secondary)]">Nach {{ timeframe }} Jahren:</span>
                <span class="text-[var(--color-text-primary)] font-semibold">{{ formatCurrency(ramitFinalAmount) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[var(--color-text-secondary)]">Gespart gesamt:</span>
                <span class="text-[var(--color-text-primary)] font-semibold">{{ formatCurrency(ramitTotalSaved) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[var(--color-text-secondary)]">Zinsertrag:</span>
                <span class="text-green-600 dark:text-green-400 font-semibold">{{ formatCurrency(ramitFinalAmount - ramitTotalSaved) }}</span>
              </div>
            </div>
          </div>
          <div class="p-6 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
            <h4 class="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Deutsches System</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-[var(--color-text-secondary)]">Monatliche Sparrate:</span>
                <span class="text-[var(--color-text-primary)] font-semibold">{{ formatCurrency(germanMonthlySavings) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[var(--color-text-secondary)]">Nach {{ timeframe }} Jahren:</span>
                <span class="text-[var(--color-text-primary)] font-semibold">{{ formatCurrency(germanFinalAmount) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[var(--color-text-secondary)]">Gespart gesamt:</span>
                <span class="text-[var(--color-text-primary)] font-semibold">{{ formatCurrency(germanTotalSaved) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[var(--color-text-secondary)]">Zinsertrag:</span>
                <span class="text-green-600 dark:text-green-400 font-semibold">{{ formatCurrency(germanFinalAmount - germanTotalSaved) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Auszahlungsrechner -->
    <div v-if="monthlyIncome > 0" class="card mb-8">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">Wie lange reicht mein gespartes Geld?</h2>
      <p class="text-[var(--color-text-secondary)] mb-6">
        Dieser Rechner zeigt dir, über wie viele Jahre du dir dein aktuelles Netto-Gehalt ausgeben könntest, 
        basierend auf deinem gesparten Vermögen. <strong>Wichtig:</strong> Die Lebenserhaltungskosten steigen 
        mit der Zeit durch Inflation, daher müssen die Auszahlungen entsprechend angepasst werden.
      </p>

      <!-- Optionen -->
      <div class="space-y-4 mb-8">
        <!-- Berechnungsmethode -->
        <div>
          <label class="block text-[var(--color-text-secondary)] mb-3 font-medium">Berechnungsmethode</label>
          <div class="flex items-center justify-between p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
            <div class="flex-1">
              <div class="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                {{ withdrawalMode === 'with-growth' ? 'Mit weiterer Berechnung' : 'Ohne weitere Berechnung' }}
              </div>
              <p class="text-xs text-[var(--color-text-muted)]">
                {{ withdrawalMode === 'with-growth' 
                  ? 'Der Restbetrag wirft weiterhin Dividenden/Zinsen ab, die das Kapital erhöhen und die Auszahlungsdauer verlängern.'
                  : 'Alles wird ausgezahlt und nach und nach ausgegeben, keine weiteren Erträge.' }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
              <input 
                type="checkbox" 
                :checked="withdrawalMode === 'with-growth'"
                @change="withdrawalMode = ($event.target as HTMLInputElement).checked ? 'with-growth' : 'without-growth'"
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-[var(--color-border)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-primary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-cyan)]"></div>
            </label>
          </div>
        </div>

        <!-- Zu verwendendes System -->
        <div>
          <label class="block text-[var(--color-text-secondary)] mb-3 font-medium">Zu verwendendes System</label>
          <div class="flex items-center justify-between p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
            <div class="flex-1">
              <div class="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                {{ selectedSystem === 'ramit' ? 'Ramit Sethi System' : 'Deutsches System' }}
              </div>
              <p class="text-xs text-[var(--color-text-muted)]">
                {{ selectedSystem === 'ramit' 
                  ? 'Pragmatisches Budget-System mit 55% Fixkosten, 10% Investitionen, 10% Spaß und flexiblen Ausgaben.'
                  : 'Bewährtes deutsches System mit 50% Fixkosten, 30% Lifestyle und 20% Sparen.' }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
              <input 
                type="checkbox" 
                :checked="selectedSystem === 'ramit'"
                @change="selectedSystem = ($event.target as HTMLInputElement).checked ? 'ramit' : 'german'"
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-[var(--color-border)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-primary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-cyan)]"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Inflationsraten Tabelle -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-[var(--color-text-primary)] mb-4">Auswirkung der Inflation</h3>
        <div class="overflow-x-auto border border-[var(--color-border)] rounded-lg">
          <table class="w-full">
            <thead class="bg-[var(--color-surface)]">
              <tr class="border-b border-[var(--color-border)]">
                <th class="text-left py-3 px-4 font-semibold text-[var(--color-text-primary)]">Inflationsrate</th>
                <th class="text-right py-3 px-4 font-semibold text-[var(--color-text-primary)]">Jahre</th>
                <th class="text-right py-3 px-4 font-semibold text-[var(--color-text-primary)]">Monate</th>
                <th class="text-right py-3 px-4 font-semibold text-[var(--color-text-primary)]">Erste Monatsauszahlung</th>
                <th class="text-right py-3 px-4 font-semibold text-[var(--color-text-primary)]">Letzte Monatsauszahlung</th>
                <th class="text-right py-3 px-4 font-semibold text-[var(--color-text-primary)]">Gesamt ausgezahlt</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(rate, key) in inflationRates" 
                :key="key"
                class="border-b border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors"
              >
                <td class="py-3 px-4 text-[var(--color-text-primary)] font-medium">
                  {{ rate.label }} ({{ rate.value }}%)
                </td>
                <td class="py-3 px-4 text-right text-[var(--color-text-primary)] font-semibold">
                  {{ withdrawalResults[key].years }}
                </td>
                <td class="py-3 px-4 text-right text-[var(--color-text-primary)]">
                  {{ withdrawalResults[key].months }}
                </td>
                <td class="py-3 px-4 text-right text-[var(--color-text-primary)]">
                  {{ formatCurrency(withdrawalResults[key].firstWithdrawal) }}
                </td>
                <td class="py-3 px-4 text-right text-[var(--color-text-primary)]">
                  {{ formatCurrency(withdrawalResults[key].lastWithdrawal) }}
                </td>
                <td class="py-3 px-4 text-right text-[var(--color-text-primary)] font-semibold">
                  {{ formatCurrency(withdrawalResults[key].totalWithdrawn) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Erklärung -->
      <div class="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
        <h4 class="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Wie funktioniert die Berechnung?</h4>
        <ul class="space-y-2 text-sm text-[var(--color-text-secondary)]">
          <li>• <strong>Einzahlungsdauer:</strong> Du hast {{ timeframe }} Jahre lang gespart und investiert</li>
          <li>• <strong>Startkapital:</strong> Dein gespartes Vermögen nach {{ timeframe }} Jahren Einzahlung ({{ formatCurrency(selectedFinalAmount) }})</li>
          <li>• <strong>Monatliche Auszahlung:</strong> Beginnt bei deinem aktuellen Netto-Gehalt ({{ formatCurrency(monthlyIncome) }})</li>
          <li>• <strong>Inflation:</strong> Die monatliche Auszahlung steigt jedes Jahr um die gewählte Inflationsrate</li>
          <li v-if="withdrawalMode === 'with-growth'">
            • <strong>Zinsen/Dividenden:</strong> Auf den verbleibenden Betrag erhältst du weiterhin {{ expectedReturn }}% Rendite p.a., 
            die das Kapital erhöhen und die Auszahlungsdauer verlängern
          </li>
          <li v-else>
            • <strong>Keine weiteren Erträge:</strong> Alles wird ausgezahlt und nach und nach ausgegeben
          </li>
          <li>
            • <strong>Auszahlungsdauer:</strong> Je nach Inflationsrate kannst du dir das Geld 
            {{ Math.min(...Object.values(withdrawalResults).map(r => r.years)) }} bis 
            {{ Math.max(...Object.values(withdrawalResults).map(r => r.years)) }} Jahre lang auszahlen lassen
            <span class="text-[var(--color-text-muted)]">(siehe Tabelle oben für Details je nach Inflationsrate)</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Renteninfo -->
    <div v-if="monthlyIncome > 0" class="card mb-8">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">Erwartete gesetzliche Rente</h2>
      <p class="text-[var(--color-text-secondary)] mb-6">
        Wenn du erst bei Renteneintritt auszahlst, erhältst du zusätzlich eine gesetzliche Rente. 
        Hier ist eine grobe Schätzung basierend auf deinem aktuellen Nettoeinkommen:
      </p>
      
      <div class="grid md:grid-cols-3 gap-6 mb-6">
        <div class="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
          <div class="text-sm text-[var(--color-text-muted)] mb-1">Geschätzte monatliche Rente</div>
          <div class="text-2xl font-bold text-[var(--color-text-primary)]">{{ formatCurrency(estimatedMonthlyPension) }}</div>
          <div class="text-xs text-[var(--color-text-muted)] mt-1">bei Renteneintritt (ca. 67 Jahre)</div>
        </div>
        <div class="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
          <div class="text-sm text-[var(--color-text-muted)] mb-1">Jährliche Rentenzahlung</div>
          <div class="text-2xl font-bold text-[var(--color-text-primary)]">{{ formatCurrency(estimatedMonthlyPension * 12) }}</div>
          <div class="text-xs text-[var(--color-text-muted)] mt-1">pro Jahr</div>
        </div>
        <div class="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
          <div class="text-sm text-[var(--color-text-muted)] mb-1">Rentenlücke</div>
          <div class="text-2xl font-bold" :class="pensionGap >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'">
            {{ formatCurrency(Math.abs(pensionGap)) }}
          </div>
          <div class="text-xs text-[var(--color-text-muted)] mt-1">
            {{ pensionGap >= 0 ? 'Über dein aktuelles Einkommen' : 'Unter deinem aktuellen Einkommen' }}
          </div>
        </div>
      </div>

      <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p class="text-sm text-[var(--color-text-secondary)]">
          <strong>Hinweis:</strong> Diese Berechnung ist eine grobe Schätzung basierend auf dem aktuellen deutschen Rentensystem. 
          Die tatsächliche Rente hängt von vielen Faktoren ab: Beitragsjahren, Durchschnittsentgelt, Rentenwert zum Zeitpunkt des Renteneintritts, 
          und möglichen Reformen. Für eine genaue Berechnung wende dich an die Deutsche Rentenversicherung.
        </p>
      </div>
    </div>

    <!-- Rentenlücken-Auszahlungsrechner -->
    <div v-if="monthlyIncome > 0 && pensionGap < 0" class="card mb-8">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">Wie lange kann ich die Rentenlücke auffüllen?</h2>
      <p class="text-[var(--color-text-secondary)] mb-6">
        Dieser Rechner zeigt dir, über wie viele Jahre du die Rentenlücke ({{ formatCurrency(Math.abs(pensionGap)) }}/Monat) 
        mit deinem gesparten Vermögen auffüllen kannst. <strong>Wichtig:</strong> Die Lebenserhaltungskosten steigen 
        mit der Zeit durch Inflation, daher müssen die Auszahlungen entsprechend angepasst werden.
      </p>

      <!-- Optionen -->
      <div class="space-y-4 mb-8">
        <!-- Berechnungsmethode -->
        <div>
          <label class="block text-[var(--color-text-secondary)] mb-3 font-medium">Berechnungsmethode</label>
          <div class="flex items-center justify-between p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
            <div class="flex-1">
              <div class="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                {{ pensionWithdrawalMode === 'with-growth' ? 'Mit weiterer Berechnung' : 'Ohne weitere Berechnung' }}
              </div>
              <p class="text-xs text-[var(--color-text-muted)]">
                {{ pensionWithdrawalMode === 'with-growth' 
                  ? 'Der Restbetrag wirft weiterhin Dividenden/Zinsen ab, die das Kapital erhöhen und die Auszahlungsdauer verlängern.'
                  : 'Alles wird ausgezahlt und nach und nach ausgegeben, keine weiteren Erträge.' }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
              <input 
                type="checkbox" 
                :checked="pensionWithdrawalMode === 'with-growth'"
                @change="pensionWithdrawalMode = ($event.target as HTMLInputElement).checked ? 'with-growth' : 'without-growth'"
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-[var(--color-border)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-primary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-cyan)]"></div>
            </label>
          </div>
        </div>

        <!-- Zu verwendendes System -->
        <div>
          <label class="block text-[var(--color-text-secondary)] mb-3 font-medium">Zu verwendendes System</label>
          <div class="flex items-center justify-between p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
            <div class="flex-1">
              <div class="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                {{ pensionSelectedSystem === 'ramit' ? 'Ramit Sethi System' : 'Deutsches System' }}
              </div>
              <p class="text-xs text-[var(--color-text-muted)]">
                {{ pensionSelectedSystem === 'ramit' 
                  ? 'Pragmatisches Budget-System mit 55% Fixkosten, 10% Investitionen, 10% Spaß und flexiblen Ausgaben.'
                  : 'Bewährtes deutsches System mit 50% Fixkosten, 30% Lifestyle und 20% Sparen.' }}
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
              <input 
                type="checkbox" 
                :checked="pensionSelectedSystem === 'ramit'"
                @change="pensionSelectedSystem = ($event.target as HTMLInputElement).checked ? 'ramit' : 'german'"
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-[var(--color-border)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-primary)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-cyan)]"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Inflationsraten Tabelle -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-[var(--color-text-primary)] mb-4">Auswirkung der Inflation auf die Rentenlücke</h3>
        <div class="overflow-x-auto border border-[var(--color-border)] rounded-lg">
          <table class="w-full">
            <thead class="bg-[var(--color-surface)]">
              <tr class="border-b border-[var(--color-border)]">
                <th class="text-left py-3 px-4 font-semibold text-[var(--color-text-primary)]">Inflationsrate</th>
                <th class="text-right py-3 px-4 font-semibold text-[var(--color-text-primary)]">Jahre</th>
                <th class="text-right py-3 px-4 font-semibold text-[var(--color-text-primary)]">Monate</th>
                <th class="text-right py-3 px-4 font-semibold text-[var(--color-text-primary)]">Erste Monatsauszahlung</th>
                <th class="text-right py-3 px-4 font-semibold text-[var(--color-text-primary)]">Letzte Monatsauszahlung</th>
                <th class="text-right py-3 px-4 font-semibold text-[var(--color-text-primary)]">Gesamt ausgezahlt</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(rate, key) in inflationRates" 
                :key="key"
                class="border-b border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors"
              >
                <td class="py-3 px-4 text-[var(--color-text-primary)] font-medium">
                  {{ rate.label }} ({{ rate.value }}%)
                </td>
                <td class="py-3 px-4 text-right text-[var(--color-text-primary)] font-semibold">
                  {{ pensionWithdrawalResults[key]?.years || 0 }}
                </td>
                <td class="py-3 px-4 text-right text-[var(--color-text-primary)]">
                  {{ pensionWithdrawalResults[key]?.months || 0 }}
                </td>
                <td class="py-3 px-4 text-right text-[var(--color-text-primary)]">
                  {{ formatCurrency(pensionWithdrawalResults[key]?.firstWithdrawal || 0) }}
                </td>
                <td class="py-3 px-4 text-right text-[var(--color-text-primary)]">
                  {{ formatCurrency(pensionWithdrawalResults[key]?.lastWithdrawal || 0) }}
                </td>
                <td class="py-3 px-4 text-right text-[var(--color-text-primary)] font-semibold">
                  {{ formatCurrency(pensionWithdrawalResults[key]?.totalWithdrawn || 0) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Erklärung -->
      <div class="p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]">
        <h4 class="text-lg font-semibold text-[var(--color-text-primary)] mb-2">Wie funktioniert die Berechnung?</h4>
        <ul class="space-y-2 text-sm text-[var(--color-text-secondary)]">
          <li>• <strong>Einzahlungsdauer:</strong> Du hast {{ timeframe }} Jahre lang gespart und investiert</li>
          <li>• <strong>Startkapital:</strong> Dein gespartes Vermögen nach {{ timeframe }} Jahren Einzahlung ({{ formatCurrency(pensionSelectedFinalAmount) }})</li>
          <li>• <strong>Monatliche Auszahlung:</strong> Beginnt bei der Rentenlücke ({{ formatCurrency(Math.abs(pensionGap)) }})</li>
          <li>• <strong>Inflation:</strong> Die monatliche Auszahlung steigt jedes Jahr um die gewählte Inflationsrate</li>
          <li v-if="pensionWithdrawalMode === 'with-growth'">
            • <strong>Zinsen/Dividenden:</strong> Auf den verbleibenden Betrag erhältst du weiterhin {{ expectedReturn }}% Rendite p.a., 
            die das Kapital erhöhen und die Auszahlungsdauer verlängern
          </li>
          <li v-else>
            • <strong>Keine weiteren Erträge:</strong> Alles wird ausgezahlt und nach und nach ausgegeben
          </li>
          <li>
            • <strong>Auszahlungsdauer:</strong> Je nach Inflationsrate kannst du die Rentenlücke 
            {{ Object.keys(pensionWithdrawalResults).length > 0 ? Math.min(...Object.values(pensionWithdrawalResults).map(r => r.years)) : 0 }} bis 
            {{ Object.keys(pensionWithdrawalResults).length > 0 ? Math.max(...Object.values(pensionWithdrawalResults).map(r => r.years)) : 0 }} Jahre lang auffüllen
            <span class="text-[var(--color-text-muted)]">(siehe Tabelle oben für Details je nach Inflationsrate)</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Weitere Informationen -->
    <div class="card">
      <h2 class="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">Über Ramit Sethi</h2>
      <p class="text-[var(--color-text-secondary)] mb-4">
        Ramit Sethi ist ein Bestseller-Autor und Finanzexperte, bekannt für sein Buch "I Will Teach You To Be Rich". 
        Sein Ansatz betont, dass Sparen nicht bedeutet, auf alles zu verzichten, sondern ein ausgewogenes Verhältnis 
        zwischen Sparen und Genießen zu finden.
      </p>
      <p class="text-[var(--color-text-secondary)]">
        Sein System ist besonders für Menschen geeignet, die einen pragmatischen Ansatz zum Sparen suchen und 
        gleichzeitig ihr Leben genießen möchten.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

useHead({
  title: 'Wie man richtig spart'
})

const monthlyIncome = ref(3000)
const timeframe = ref(20)
const expectedReturn = ref(7)
const savingsRate = ref<'light' | 'normal' | 'aggressive'>('normal')
const withdrawalMode = ref<'with-growth' | 'without-growth'>('with-growth')
const selectedSystem = ref<'ramit' | 'german'>('ramit')
const pensionWithdrawalMode = ref<'with-growth' | 'without-growth'>('with-growth')
const pensionSelectedSystem = ref<'ramit' | 'german'>('ramit')
const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

// Sparraten basierend auf Auswahl
// Ramit's System: 10% Investitionen (immer), aber mehr Spaß bei höheren Sparraten
// Deutsches System: 20% Sparen (immer), aber unterschiedliche Verteilung
const savingsRatePercentages = {
  light: { ramit: 0.10, german: 0.20 }, // Ramit: 10%, Deutsch: 20%
  normal: { ramit: 0.15, german: 0.20 }, // Ramit: 15%, Deutsch: 20%
  aggressive: { ramit: 0.20, german: 0.20 } // Ramit: 20%, Deutsch: 20%
}

// Ausgabenaufteilung für Anzeige
const ramitExpenses = computed(() => {
  const savings = monthlyIncome.value * savingsRatePercentages[savingsRate.value].ramit
  const fixed = monthlyIncome.value * 0.55 // 55% Fixkosten
  const fun = monthlyIncome.value * 0.10 // 10% Spaß
  const flexible = monthlyIncome.value - savings - fixed - fun
  return { fixed, savings, fun, flexible }
})

const germanExpenses = computed(() => {
  const savings = monthlyIncome.value * savingsRatePercentages[savingsRate.value].german
  const fixed = monthlyIncome.value * 0.50 // 50% Fixkosten
  const lifestyle = monthlyIncome.value * 0.30 // 30% Lifestyle
  return { fixed, savings, lifestyle }
})

// Berechnungen
const ramitMonthlySavings = computed(() => {
  return monthlyIncome.value * savingsRatePercentages[savingsRate.value].ramit
})

const germanMonthlySavings = computed(() => {
  return monthlyIncome.value * savingsRatePercentages[savingsRate.value].german
})

// Berechne Endbetrag mit Zinseszins
const calculateFutureValue = (monthlySavings: number, years: number, annualReturn: number): number => {
  const monthlyReturn = annualReturn / 100 / 12
  const months = years * 12
  
  if (monthlyReturn === 0) {
    return monthlySavings * months
  }
  
  return monthlySavings * ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn)
}

const ramitFinalAmount = computed(() => {
  return calculateFutureValue(ramitMonthlySavings.value, timeframe.value, expectedReturn.value)
})

const germanFinalAmount = computed(() => {
  return calculateFutureValue(germanMonthlySavings.value, timeframe.value, expectedReturn.value)
})

const ramitTotalSaved = computed(() => {
  return ramitMonthlySavings.value * timeframe.value * 12
})

const germanTotalSaved = computed(() => {
  return germanMonthlySavings.value * timeframe.value * 12
})

// Rentenberechnung
// Grobe Schätzung der gesetzlichen Rente basierend auf Nettoeinkommen
// Annahmen:
// - Nettoeinkommen × 1.43 ≈ Bruttoeinkommen (ungefähr, je nach Steuerklasse)
// - Durchschnittsentgelt 2024: ca. 45.000€ brutto/Jahr
// - Rentenwert 2024: ca. 37,60€ pro Entgeltpunkt (monatlich)
// - 45 Beitragsjahre (Standard)
// - Formel: (Bruttoeinkommen / Durchschnittsentgelt) × Beitragsjahre × Rentenwert
const estimatedMonthlyPension = computed(() => {
  // Geschätztes Bruttoeinkommen (Netto × 1.43 als grobe Schätzung)
  const estimatedGrossAnnual = monthlyIncome.value * 12 * 1.43
  const averageGrossIncome = 45000 // Durchschnittsentgelt 2024
  const contributionYears = 45 // Standard Beitragsjahre
  const pensionValue = 37.60 // Rentenwert 2024 (€ pro Entgeltpunkt, monatlich)
  
  // Entgeltpunkte pro Jahr
  const pointsPerYear = estimatedGrossAnnual / averageGrossIncome
  // Gesamte Entgeltpunkte
  const totalPoints = pointsPerYear * contributionYears
  // Monatliche Rente (Rentenwert ist bereits monatlich)
  const monthlyPension = totalPoints * pensionValue
  
  return Math.max(0, monthlyPension)
})

const pensionGap = computed(() => {
  return estimatedMonthlyPension.value - monthlyIncome.value
})

// Auszahlungsrechner
const selectedFinalAmount = computed(() => {
  return selectedSystem.value === 'ramit' ? ramitFinalAmount.value : germanFinalAmount.value
})

// Inflationsraten
const inflationRates = {
  average: { label: 'Durchschnitt (letzte 20 Jahre)', value: 1.8 },
  light: { label: 'Leicht', value: 1.0 },
  conservative: { label: 'Konservativ', value: 2.0 },
  strong: { label: 'Stark', value: 3.0 },
  extreme: { label: 'Extrem', value: 5.0 }
}

// Berechne Auszahlungsdauer für verschiedene Inflationsraten
const calculateWithdrawalDuration = (initialAmount: number, monthlyWithdrawal: number, inflationRate: number, annualReturn: number, withGrowth: boolean): {
  years: number
  months: number
  firstWithdrawal: number
  lastWithdrawal: number
  totalWithdrawn: number
} => {
  let remaining = initialAmount
  let currentMonthlyWithdrawal = monthlyWithdrawal
  let totalWithdrawn = 0
  let month = 0
  let year = 0
  let lastMonthlyWithdrawalRate = monthlyWithdrawal // Speichere die monatliche Auszahlungsrate für den letzten Monat
  const monthlyReturn = annualReturn / 100 / 12

  while (remaining > 0 && month < 1000) { // Max 1000 Monate als Sicherheit
    // Wenn mit Wachstum: Zinsen auf Restbetrag hinzufügen (BEVOR wir auszahlen)
    if (withGrowth && remaining > 0) {
      remaining += remaining * monthlyReturn
    }

    // Speichere die aktuelle monatliche Auszahlungsrate (vor der Auszahlung)
    lastMonthlyWithdrawalRate = currentMonthlyWithdrawal

    // Monatliche Auszahlung
    const withdrawal = Math.min(currentMonthlyWithdrawal, remaining)
    remaining -= withdrawal
    totalWithdrawn += withdrawal

    // Wenn Restbetrag zu klein ist, breche ab BEVOR wir die Inflation anwenden
    if (remaining < 0.01) {
      break
    }

    // Inflation: Erhöhe monatliche Auszahlung jedes Jahr (NACH der Auszahlung)
    month++
    if (month % 12 === 0) {
      year++
      currentMonthlyWithdrawal *= (1 + inflationRate / 100)
    }
  }

  return {
    years: year,
    months: month % 12,
    firstWithdrawal: monthlyWithdrawal,
    lastWithdrawal: lastMonthlyWithdrawalRate, // Die monatliche Auszahlungsrate für den letzten Monat
    totalWithdrawn
  }
}

const withdrawalResults = computed(() => {
  const results: Record<string, {
    years: number
    months: number
    firstWithdrawal: number
    lastWithdrawal: number
    totalWithdrawn: number
  }> = {}

  for (const [key, rate] of Object.entries(inflationRates)) {
    results[key] = calculateWithdrawalDuration(
      selectedFinalAmount.value,
      monthlyIncome.value,
      rate.value,
      expectedReturn.value,
      withdrawalMode.value === 'with-growth'
    )
  }

  return results
})

// Rentenlücken-Auszahlungsrechner
const pensionSelectedFinalAmount = computed(() => {
  return pensionSelectedSystem.value === 'ramit' ? ramitFinalAmount.value : germanFinalAmount.value
})

const pensionWithdrawalResults = computed(() => {
  const results: Record<string, {
    years: number
    months: number
    firstWithdrawal: number
    lastWithdrawal: number
    totalWithdrawn: number
  }> = {}

  // Nur berechnen wenn es eine Rentenlücke gibt (pensionGap < 0)
  if (pensionGap.value < 0) {
    const monthlyGap = Math.abs(pensionGap.value)
    
    for (const [key, rate] of Object.entries(inflationRates)) {
      results[key] = calculateWithdrawalDuration(
        pensionSelectedFinalAmount.value,
        monthlyGap,
        rate.value,
        expectedReturn.value,
        pensionWithdrawalMode.value === 'with-growth'
      )
    }
  }

  return results
})

// Vergleichstabelle
const comparisonTable = computed(() => {
  const table = []
  for (let year = 1; year <= timeframe.value; year++) {
    const ramitAmount = calculateFutureValue(ramitMonthlySavings.value, year, expectedReturn.value)
    const germanAmount = calculateFutureValue(germanMonthlySavings.value, year, expectedReturn.value)
    table.push({
      year,
      ramit: ramitAmount,
      german: germanAmount,
      difference: germanAmount - ramitAmount
    })
  }
  return table
})

// Graph aktualisieren
const updateChart = () => {
  if (!chartCanvas.value) return

  const labels = comparisonTable.value.map(row => `Jahr ${row.year}`)
  const ramitData = comparisonTable.value.map(row => row.ramit)
  const germanData = comparisonTable.value.map(row => row.german)

  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  const isDark = document.documentElement.classList.contains('dark')
  const textColor = isDark ? 'rgb(241, 245, 249)' : 'rgb(17, 24, 39)'
  const gridColor = isDark ? 'rgba(241, 245, 249, 0.1)' : 'rgba(17, 24, 39, 0.1)'

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Ramit Sethi System',
          data: ramitData,
          borderColor: 'rgb(37, 99, 235)',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: timeframe.value <= 25 ? 3 : 0
        },
        {
          label: 'Deutsches System',
          data: germanData,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
          pointRadius: timeframe.value <= 25 ? 3 : 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + formatCurrency(context.parsed.y)
            }
          },
          backgroundColor: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          titleColor: textColor,
          bodyColor: textColor,
          borderColor: isDark ? 'rgba(241, 245, 249, 0.2)' : 'rgba(17, 24, 39, 0.2)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
            maxTicksLimit: timeframe.value <= 10 ? 10 : 20
          },
          grid: {
            color: gridColor
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: textColor,
            callback: function(value) {
              return formatCurrency(value as number)
            }
          },
          grid: {
            color: gridColor
          }
        }
      }
    }
  })
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

watch([monthlyIncome, timeframe, expectedReturn, savingsRate, comparisonTable], () => {
  nextTick(() => {
    updateChart()
  })
})

// Watch für Theme-Änderungen
const { theme } = useTheme()
watch(theme, () => {
  nextTick(() => {
    updateChart()
  })
})

onMounted(() => {
  nextTick(() => {
    updateChart()
  })
})
</script>

