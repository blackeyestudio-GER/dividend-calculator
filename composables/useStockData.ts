import type { StockData } from './useStockSearch'

// API 1: Yahoo Finance - Hole Dividendenhistorie
const fetchFromYahooFinance = async (symbol: string): Promise<{ data: StockData | null, source: string }> => {
  try {
    const proxyUrl = 'https://api.allorigins.win/raw?url='
    const yahooUrl = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=summaryDetail,price,defaultKeyStatistics,calendarEvents`
    
    const response = await fetch(proxyUrl + encodeURIComponent(yahooUrl), {
      headers: { 'Accept': 'application/json' }
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = await response.json()
    const quoteSummary = data.quoteSummary?.result?.[0]
    
    if (!quoteSummary) return { data: null, source: 'Yahoo Finance' }

    const price = quoteSummary.price?.regularMarketPrice?.raw || quoteSummary.price?.regularMarketPrice
    const dividendYield = quoteSummary.summaryDetail?.dividendYield?.raw || quoteSummary.summaryDetail?.dividendYield
    const dividendRate = quoteSummary.summaryDetail?.dividendRate?.raw || quoteSummary.summaryDetail?.dividendRate
    const trailingAnnualDividendRate = quoteSummary.summaryDetail?.trailingAnnualDividendRate?.raw || quoteSummary.summaryDetail?.trailingAnnualDividendRate
    const name = quoteSummary.price?.longName || quoteSummary.price?.shortName || symbol
    const currency = quoteSummary.price?.currency || 'USD'
    const exDividendDate = quoteSummary.calendarEvents?.exDividendDate

    let lastDividendPerShare: number | null = null
    let dividendFrequency: 'monthly' | 'quarterly' | 'yearly' = 'quarterly'
    
    try {
      const dividendHistoryUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=2y&events=dividends`
      const divResponse = await fetch(proxyUrl + encodeURIComponent(dividendHistoryUrl), {
        headers: { 'Accept': 'application/json' }
      })
      
      if (divResponse.ok) {
        const divData = await divResponse.json()
        const events = divData.chart?.result?.[0]?.events?.dividends
        
        if (events) {
          const dividendDates = Object.keys(events).sort((a, b) => parseInt(b) - parseInt(a))
          
          if (dividendDates.length > 0) {
            const lastDividend = events[dividendDates[0]]
            lastDividendPerShare = lastDividend.amount || null
            
            if (dividendDates.length >= 2) {
              const dates = dividendDates.slice(0, 4).map(d => parseInt(d) * 1000)
              const intervals = []
              for (let i = 0; i < dates.length - 1; i++) {
                intervals.push(dates[i] - dates[i + 1])
              }
              const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
              const daysBetween = avgInterval / (1000 * 60 * 60 * 24)
              
              if (daysBetween < 40) {
                dividendFrequency = 'monthly'
              } else if (daysBetween < 100) {
                dividendFrequency = 'quarterly'
              } else {
                dividendFrequency = 'yearly'
              }
            }
          }
        }
      }
    } catch {
      // Ignoriere Fehler bei Dividendenhistorie
    }

    let dividendPerShare: number | null = null
    
    if (lastDividendPerShare) {
      dividendPerShare = lastDividendPerShare
    } else if (dividendRate || trailingAnnualDividendRate) {
      const annualDividend = dividendRate || trailingAnnualDividendRate
      if (dividendFrequency === 'monthly') {
        dividendPerShare = annualDividend / 12
      } else if (dividendFrequency === 'quarterly') {
        dividendPerShare = annualDividend / 4
      } else {
        dividendPerShare = annualDividend
      }
    } else if (dividendYield && price) {
      const annualDividend = (price * dividendYield)
      if (dividendFrequency === 'monthly') {
        dividendPerShare = annualDividend / 12
      } else if (dividendFrequency === 'quarterly') {
        dividendPerShare = annualDividend / 4
      } else {
        dividendPerShare = annualDividend
      }
    }

    if (!price) return { data: null, source: 'Yahoo Finance' }

    return {
      data: {
        symbol,
        name,
        price,
        dividendYield: dividendYield ? dividendYield * 100 : null,
        dividendPerShare,
        dividendFrequency,
        currency
      },
      source: 'Yahoo Finance'
    }
  } catch (error) {
    return { data: null, source: 'Yahoo Finance' }
  }
}

// API 2: TradingView
const fetchFromTradingView = async (symbol: string): Promise<{ data: StockData | null, source: string }> => {
  try {
    const proxyUrl = 'https://api.allorigins.win/raw?url='
    const exchanges = [
      { code: 'NYSEARCA', name: 'NYSEARCA' },
      { code: 'AMEX', name: 'AMEX' },
      { code: 'NYSE', name: 'NYSE' },
      { code: 'NASDAQ', name: 'NASDAQ' }
    ]
    
    for (const exchange of exchanges) {
      try {
        const analysisUrl = `https://de.tradingview.com/symbols/${exchange.code}-${symbol}/analysis/`
        
        const htmlResponse = await fetch(proxyUrl + encodeURIComponent(analysisUrl), {
          headers: { 
            'Accept': 'text/html,application/xhtml+xml',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        })

        if (htmlResponse.ok) {
          const html = await htmlResponse.text()
          
          let yieldValue: number | null = null
          const patterns = [
            /Dividendenrendite[^>]*>[\s\S]{0,200}?(\d+[,.]?\d*)\s*%/i,
            /dividend[\s-]*yield[^>]*>[\s\S]{0,200}?(\d+[,.]?\d*)\s*%/i
          ]
          
          for (const pattern of patterns) {
            const match = html.match(pattern)
            if (match) {
              const value = parseFloat(match[1].replace(',', '.'))
              if (value > 0 && value < 50) {
                yieldValue = value
                break
              }
            }
          }
          
          let price: number | null = null
          const pricePatterns = [
            /data-symbol-price[^>]*>[\s\S]*?(\d+[,.]?\d*)/i,
            /last-price[^>]*>[\s\S]*?(\d+[,.]?\d*)/i
          ]
          
          for (const pattern of pricePatterns) {
            const match = html.match(pattern)
            if (match) {
              const value = parseFloat(match[1].replace(',', '.'))
              if (value > 0 && value < 100000) {
                price = value
                break
              }
            }
          }
          
          let name = symbol
          const namePatterns = [
            /<h1[^>]*>([^<]+)<\/h1>/i,
            /symbol-name[^>]*>([^<]+)</i
          ]
          
          for (const pattern of namePatterns) {
            const match = html.match(pattern)
            if (match && match[1].trim()) {
              name = match[1].trim()
              break
            }
          }
          
          if (yieldValue && yieldValue > 0) {
            return {
              data: {
                symbol,
                name,
                price: price || 0,
                dividendYield: yieldValue,
                dividendPerShare: null,
                currency: 'USD'
              },
              source: 'TradingView'
            }
          }
        }
      } catch {
        continue
      }
    }

    return { data: null, source: 'TradingView' }
  } catch (error) {
    return { data: null, source: 'TradingView' }
  }
}

// API 3: Yahoo Finance Alternative
const fetchFromYahooDirect = async (symbol: string): Promise<{ data: StockData | null, source: string }> => {
  try {
    const proxies = [
      'https://api.allorigins.win/raw?url=',
    ]

    const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`
    
    for (const proxy of proxies) {
      try {
        const response = await fetch(proxy + encodeURIComponent(yahooUrl), {
          headers: { 'Accept': 'application/json' }
        })

        if (!response.ok) continue

        const data = await response.json()
        const result = data.chart?.result?.[0]
        
        if (!result || !result.meta) continue

        const price = result.meta.regularMarketPrice
        const name = result.meta.longName || result.meta.shortName || symbol

        if (!price) continue

        return {
          data: {
            symbol,
            name,
            price,
            dividendYield: null,
            dividendPerShare: null,
            currency: result.meta.currency || 'USD'
          },
          source: 'Yahoo Finance (Chart API)'
        }
      } catch {
        continue
      }
    }

    return { data: null, source: 'Yahoo Finance (Chart API)' }
  } catch (error) {
    return { data: null, source: 'Yahoo Finance (Chart API)' }
  }
}

// API 4: Alpha Vantage
const fetchFromAlphaVantage = async (symbol: string): Promise<{ data: StockData | null, source: string }> => {
  try {
    const proxyUrl = 'https://api.allorigins.win/raw?url='
    const alphaUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=demo`
    
    const response = await fetch(proxyUrl + encodeURIComponent(alphaUrl), {
      headers: { 'Accept': 'application/json' }
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = await response.json()
    
    if (data.Note || data['Error Message'] || !data.Symbol) {
      return { data: null, source: 'Alpha Vantage' }
    }

    const price = parseFloat(data['52WeekHigh']) || parseFloat(data['50DayMovingAverage']) || parseFloat(data['200DayMovingAverage']) || null
    const dividendYield = data.DividendYield ? parseFloat(data.DividendYield) * 100 : null
    const dividendPerShare = data.DividendPerShare ? parseFloat(data.DividendPerShare) / 4 : null

    if (!price && !dividendYield) return { data: null, source: 'Alpha Vantage' }

    return {
      data: {
        symbol: data.Symbol,
        name: data.Name || symbol,
        price: price || 0,
        dividendYield,
        dividendPerShare,
        currency: data.Currency || 'USD'
      },
      source: 'Alpha Vantage'
    }
  } catch (error) {
    return { data: null, source: 'Alpha Vantage' }
  }
}

// API 5: Finnhub
const fetchFromFinnhub = async (symbol: string): Promise<{ data: StockData | null, source: string }> => {
  try {
    const proxyUrl = 'https://api.allorigins.win/raw?url='
    const finnhubUrl = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=demo`
    
    const response = await fetch(proxyUrl + encodeURIComponent(finnhubUrl), {
      headers: { 'Accept': 'application/json' }
    })

    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    const data = await response.json()
    
    if (!data || data.error || !data.c) {
      return { data: null, source: 'Finnhub' }
    }

    return {
      data: {
        symbol,
        name: symbol,
        price: data.c,
        dividendYield: null,
        dividendPerShare: null,
        currency: 'USD'
      },
      source: 'Finnhub'
    }
  } catch (error) {
    return { data: null, source: 'Finnhub' }
  }
}

// Web-Suche nach Dividendenrendite
const searchDividendYield = async (symbol: string, stockName: string): Promise<{ dividendYield: number | null, source: string }> => {
  try {
    const proxyUrl = 'https://api.allorigins.win/raw?url='
    
    // TradingView
    try {
      const exchanges = ['NYSEARCA', 'AMEX', 'NYSE', 'NASDAQ']
      for (const exchange of exchanges) {
        const analysisUrl = `https://de.tradingview.com/symbols/${exchange}-${symbol}/analysis/`
        const response = await fetch(proxyUrl + encodeURIComponent(analysisUrl), {
          headers: { 
            'Accept': 'text/html',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        })

        if (response.ok) {
          const html = await response.text()
          const patterns = [
            /Dividendenrendite[^>]*>[\s\S]{0,200}?(\d+[,.]?\d*)\s*%/i,
            /dividend[\s-]*yield[^>]*>[\s\S]{0,200}?(\d+[,.]?\d*)\s*%/i
          ]
          
          for (const pattern of patterns) {
            const match = html.match(pattern)
            if (match) {
              const yieldValue = parseFloat(match[1].replace(',', '.'))
              if (yieldValue > 0 && yieldValue < 50) {
                return { dividendYield: yieldValue, source: 'TradingView' }
              }
            }
          }
        }
      }
    } catch {
      // Ignoriere Fehler
    }
    
    // Yahoo Finance Key Statistics
    try {
      const yahooStatsUrl = `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=defaultKeyStatistics`
      const response = await fetch(proxyUrl + encodeURIComponent(yahooStatsUrl), {
        headers: { 'Accept': 'application/json' }
      })

      if (response.ok) {
        const data = await response.json()
        const stats = data.quoteSummary?.result?.[0]?.defaultKeyStatistics
        
        if (stats?.dividendYield?.raw) {
          const yieldValue = stats.dividendYield.raw * 100
          if (yieldValue > 0 && yieldValue < 50) {
            return { dividendYield: yieldValue, source: 'Yahoo Finance Statistics' }
          }
        }
      }
    } catch {
      // Ignoriere Fehler
    }

    return { dividendYield: null, source: 'Web-Suche' }
  } catch (error) {
    return { dividendYield: null, source: 'Web-Suche' }
  }
}

// LocalStorage Cache Helper - Wochenschlüssel für aktuelles Jahr
const getWeekKey = (): string => {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000))
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7)
  return `${now.getFullYear()}-W${weekNumber}`
}

const getCachedData = (symbol: string): { data: StockData | null, source: string } | null => {
  if (!process.client) return null
  
  try {
    const weekKey = getWeekKey()
    const cacheKey = `stock_${symbol.toUpperCase()}_${weekKey}`
    const cached = localStorage.getItem(cacheKey)
    
    if (cached) {
      const parsed = JSON.parse(cached)
      // Prüfe ob Cache noch gültig (diese Woche)
      const cacheDate = new Date(parsed.timestamp)
      const now = new Date()
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      
      if (cacheDate > weekAgo) {
        return {
          data: parsed.data,
          source: `${parsed.source} (aus Cache)`
        }
      } else {
        // Cache abgelaufen, entfernen
        localStorage.removeItem(cacheKey)
      }
    }
  } catch (error) {
    // Ignoriere Fehler beim Lesen aus Cache
  }
  
  return null
}

const setCachedData = (symbol: string, data: StockData | null, source: string): void => {
  if (!process.client || !data) return
  
  try {
    const weekKey = getWeekKey()
    const cacheKey = `stock_${symbol.toUpperCase()}_${weekKey}`
    
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      source,
      timestamp: new Date().toISOString()
    }))
  } catch (error) {
    // Ignoriere Fehler beim Schreiben in Cache
  }
}

export const useStockData = () => {
  const searchStock = async (symbol: string): Promise<{ data: StockData | null, source: string }> => {
    // Prüfe zuerst den Cache
    const cached = getCachedData(symbol)
    if (cached) {
      return cached
    }
    const apis = [
      { name: 'Yahoo Finance', call: () => fetchFromYahooFinance(symbol) },
      { name: 'TradingView', call: () => fetchFromTradingView(symbol) },
      { name: 'Yahoo Finance (Chart)', call: () => fetchFromYahooDirect(symbol) },
      { name: 'Alpha Vantage', call: () => fetchFromAlphaVantage(symbol) },
      { name: 'Finnhub', call: () => fetchFromFinnhub(symbol) },
    ]

    let foundStockData: StockData | null = null
    let foundSource = ''
    let foundPrice = 0
    let foundName = symbol

    for (const api of apis) {
      try {
        const result = await api.call()
        
        if (result.data) {
          const stockData = result.data
          
          if (stockData.name) {
            foundName = stockData.name
          }

          let priceInEUR = stockData.price || 0
          if (stockData.currency !== 'EUR' && stockData.currency === 'USD' && stockData.price) {
            try {
              const eurResponse = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://query1.finance.yahoo.com/v8/finance/chart/EURUSD=X'))
              const eurData = await eurResponse.json()
              const eurRate = eurData.chart?.result?.[0]?.meta?.regularMarketPrice || 0.92
              priceInEUR = stockData.price * eurRate
            } catch {
              priceInEUR = stockData.price * 0.92
            }
          }

          foundPrice = priceInEUR
          foundSource = result.source

          if (stockData.dividendPerShare) {
            return {
              data: {
                ...stockData,
                price: priceInEUR
              },
              source: result.source
            }
          }
          
          if (stockData.dividendYield && stockData.price) {
            return {
              data: {
                ...stockData,
                price: priceInEUR
              },
              source: result.source
            }
          }

          if (stockData.price && !foundStockData) {
            foundStockData = stockData
          }
        }
      } catch (error) {
        continue
      }
    }

    // Wenn wir Preis aber keine Dividendenrendite haben, suche nach Dividendenrendite
    if (foundPrice > 0 && (!foundStockData?.dividendYield || foundStockData.dividendYield === 0)) {
      try {
        const yieldResult = await searchDividendYield(symbol, foundName)
        
        if (yieldResult.dividendYield && yieldResult.dividendYield > 0) {
          return {
            data: {
              symbol,
              name: foundName,
              price: foundPrice,
              dividendYield: yieldResult.dividendYield,
              dividendPerShare: null,
              currency: 'EUR'
            },
            source: `${foundSource} + ${yieldResult.source}`
          }
        }
      } catch (error) {
        // Ignoriere Fehler
      }
    }

    if (foundPrice > 0 && (!foundStockData?.dividendYield || foundStockData.dividendYield === 0) && !foundStockData?.dividendPerShare) {
      const result = null
      // Cache auch null-Ergebnisse (um wiederholte API-Calls zu vermeiden)
      setCachedData(symbol, null, foundSource)
      return result
    }

    const result = foundStockData ? { data: foundStockData, source: foundSource } : null
    
    // Cache das Ergebnis
    if (result?.data) {
      setCachedData(symbol, result.data, result.source)
    }
    
    return result
  }

  return {
    searchStock
  }
}

