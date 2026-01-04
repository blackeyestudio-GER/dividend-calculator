export type PayoutInterval = 'monthly' | 'quarterly' | 'yearly'
export type CalculationMethod = 'perShare' | 'yield'

export interface Position {
  id: number
  name: string
  shares: number
  method: CalculationMethod
  dividendPerShare?: number
  payoutInterval?: PayoutInterval
  dividendYield?: number
  currentValue?: number
}

export const useDividendCalculation = () => {
  const getMultiplier = (interval: PayoutInterval): number => {
    switch (interval) {
      case 'monthly':
        return 12
      case 'quarterly':
        return 4
      case 'yearly':
        return 1
    }
  }

  const calculateAnnualDividend = (position: Position): number => {
    if (position.method === 'perShare') {
      const annualDividendPerShare = position.dividendPerShare! * getMultiplier(position.payoutInterval!)
      return position.shares * annualDividendPerShare
    } else {
      const totalValue = position.shares * (position.currentValue || 0)
      return totalValue * (position.dividendYield || 0) / 100
    }
  }

  const calculateMonthlyDividend = (position: Position): number => {
    return calculateAnnualDividend(position) / 12
  }

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return {
    calculateAnnualDividend,
    calculateMonthlyDividend,
    formatCurrency,
    getMultiplier
  }
}

