import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import Card from '../shared/Card.jsx'
import { formatCurrency, formatYearsMonths } from '../../utils/formatters.js'
import { calcCumulativeCosts, calcBreakEven } from '../../utils/calculations.js'

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-lg text-sm">
        <p className="font-display font-semibold text-slate-700 mb-1">Year {label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: p.color }} className="font-semibold">
            {p.name}: {formatCurrency(p.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function BreakEvenChart({ petrolCar, evCar, costs, annualMiles }) {
  const [animated, setAnimated] = useState(false)
  const breakEven = calcBreakEven(petrolCar.purchasePrice, evCar.purchasePrice, costs.annualSaving)
  const chartData = calcCumulativeCosts(petrolCar, evCar, costs.annualSaving)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(t)
  }, [])

  const petrolName = `${petrolCar.make} ${petrolCar.model}`
  const evName = `${evCar.make} ${evCar.model}`

  return (
    <Card accent>
      <p className="section-label mb-3">📈 Break-Even Analysis</p>
      <h3 className="font-display font-bold text-xl text-slate-800 mb-1">Cumulative cost over 10 years</h3>
      <p className="text-sm text-slate-500 mb-6">
        Includes purchase price plus yearly running costs. Where the lines cross is when the EV becomes the cheaper option overall.
      </p>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-500 mb-1">Purchase price premium</p>
          <p className="font-display font-bold text-xl text-slate-700">
            {formatCurrency(evCar.purchasePrice - petrolCar.purchasePrice)}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">more upfront for the EV</p>
        </div>
        <div className={`rounded-xl p-4 text-center ${breakEven.never ? 'bg-amber-50' : 'bg-green-50'}`}>
          <p className={`text-xs mb-1 ${breakEven.never ? 'text-amber-500' : 'text-green-600'}`}>Break-even point</p>
          {breakEven.never ? (
            <p className="font-display font-bold text-xl text-amber-700">Never</p>
          ) : (
            <>
              <p className="font-display font-bold text-xl text-green-700">
                {formatYearsMonths(breakEven.years, breakEven.months)}
              </p>
              <p className="text-xs text-green-500 mt-0.5">from purchase</p>
            </>
          )}
        </div>
      </div>

      {animated && (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                label={{ value: 'Years owned', position: 'insideBottom', offset: -2, fontSize: 11, fill: '#94a3b8' }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                tickFormatter={v => `£${Math.round(v / 1000)}k`}
              />
              <ReTooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
              />
              {!breakEven.never && (
                <ReferenceLine
                  x={breakEven.years + breakEven.months / 12}
                  stroke="#10b981"
                  strokeDasharray="4 4"
                  label={{ value: '★ Break-even', position: 'top', fontSize: 10, fill: '#10b981' }}
                />
              )}
              <Line
                type="monotone"
                dataKey="petrol"
                name={petrolName}
                stroke="#f97316"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
                animationDuration={1200}
              />
              <Line
                type="monotone"
                dataKey="ev"
                name={evName}
                stroke="#0d9488"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
                animationDuration={1200}
                animationBegin={200}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {!breakEven.never && (
        <div className="mt-5 bg-teal-50 border border-teal-100 rounded-xl px-5 py-4">
          <p className="text-sm text-teal-700">
            <span className="font-display font-bold">After {formatYearsMonths(breakEven.years, breakEven.months)}</span>, the {evName} becomes the cheaper option overall — and keeps saving you{' '}
            <strong>{formatCurrency(costs.annualSaving)}</strong> every year after that.
          </p>
        </div>
      )}
    </Card>
  )
}
