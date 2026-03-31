import Card from '../shared/Card.jsx'
import { formatCurrency } from '../../utils/formatters.js'

export default function YearlySummary({ costs, petrolCar, evCar }) {
  const rows = [
    { label: 'Fuel / Energy', petrol: costs.petrol.fuel, ev: costs.ev.energy },
    { label: 'Insurance', petrol: costs.petrol.insurance, ev: costs.ev.insurance },
    { label: 'Maintenance', petrol: costs.petrol.maintenance, ev: costs.ev.maintenance },
    { label: 'Road Tax (VED)', petrol: costs.petrol.ved, ev: costs.ev.ved },
    ...(costs.petrol.congestion > 0
      ? [{ label: 'Congestion Charge', petrol: costs.petrol.congestion, ev: costs.ev.congestion }]
      : []),
  ]

  return (
    <Card accent>
      <p className="section-label mb-3">📊 Total Running Costs</p>
      <h3 className="font-display font-bold text-xl text-slate-800 mb-5">Full yearly cost comparison</h3>

      <div className="grid grid-cols-3 gap-2 mb-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <div>Category</div>
        <div className="text-center">{petrolCar.make} {petrolCar.model}</div>
        <div className="text-center">{evCar.make} {evCar.model}</div>
      </div>

      <div className="space-y-2">
        {rows.map(row => {
          const evCheaper = row.ev < row.petrol
          return (
            <div key={row.label} className="grid grid-cols-3 gap-2 py-2 border-b border-slate-50 text-sm">
              <div className="text-slate-600">{row.label}</div>
              <div className="text-center font-display font-semibold text-slate-700">
                {formatCurrency(row.petrol)}
              </div>
              <div className={`text-center font-display font-semibold ${evCheaper ? 'text-teal-700' : 'text-slate-700'}`}>
                {formatCurrency(row.ev)}
                {evCheaper && <span className="ml-1 text-xs text-green-500">↓</span>}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 bg-slate-800 text-white rounded-xl p-4">
        <div className="font-display font-bold text-sm">Total / year</div>
        <div className="text-center font-display font-bold text-lg">{formatCurrency(costs.petrol.total)}</div>
        <div className="text-center font-display font-bold text-lg text-teal-300">{formatCurrency(costs.ev.total)}</div>
      </div>

      <div className="mt-4 text-center">
        {costs.annualSaving > 0 ? (
          <div className="inline-block bg-green-50 border border-green-200 rounded-2xl px-6 py-4">
            <p className="text-xs text-green-600 font-semibold mb-1">Annual saving with electric</p>
            <p className="font-display font-bold text-3xl text-green-700">
              {formatCurrency(costs.annualSaving)}
            </p>
            <p className="text-xs text-green-500 mt-1">per year</p>
          </div>
        ) : (
          <div className="inline-block bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4">
            <p className="text-xs text-amber-600 font-semibold mb-1">Electric running costs are higher by</p>
            <p className="font-display font-bold text-3xl text-amber-700">
              {formatCurrency(Math.abs(costs.annualSaving))}
            </p>
            <p className="text-xs text-amber-500 mt-1">per year in this scenario</p>
          </div>
        )}
      </div>
    </Card>
  )
}
