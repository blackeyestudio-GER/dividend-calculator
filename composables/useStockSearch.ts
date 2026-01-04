import stocksData from '~/data/stocks.json'

export interface Stock {
  symbol: string
  name: string
  type: string
}

export interface StockData {
  symbol: string
  name: string
  price: number | null
  dividendYield: number | null
  dividendPerShare: number | null
  lastDividendDate?: string
  dividendFrequency?: 'monthly' | 'quarterly' | 'yearly'
  currency: string
}

const stocks = stocksData as Stock[]

export const useStockSearch = () => {
  const filterStocks = (query: string): Stock[] => {
    if (!query || query.length < 1) return []
    const upperQuery = query.toUpperCase()
    return stocks.filter(stock => 
      stock.symbol.toUpperCase().includes(upperQuery) || 
      stock.name.toUpperCase().includes(upperQuery)
    ).slice(0, 10)
  }

  return {
    filterStocks,
    stocks
  }
}

