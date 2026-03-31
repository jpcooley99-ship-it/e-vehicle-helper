export function formatCurrency(amount, decimals = 0) {
  return `£${Math.round(amount).toLocaleString('en-GB')}`
}

export function formatPence(poundsAmount) {
  const p = Math.round(poundsAmount * 100)
  return `${p}p`
}

export function formatMiles(miles) {
  return `${Math.round(miles).toLocaleString('en-GB')} miles`
}

export function formatKg(kg) {
  if (kg >= 1000) return `${(kg / 1000).toFixed(1)} tonnes`
  return `${Math.round(kg).toLocaleString('en-GB')} kg`
}

export function formatYearsMonths(years, months) {
  const parts = []
  if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`)
  if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`)
  return parts.join(' and ') || '0 months'
}

export function formatPercent(ratio, decimals = 0) {
  return `${(ratio * 100).toFixed(decimals)}%`
}
