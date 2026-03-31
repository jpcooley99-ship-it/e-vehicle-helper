import Card from '../shared/Card.jsx'
import { formatCurrency } from '../../utils/formatters.js'

export default function InsuranceComparison({ costs, petrolCar, evCar }) {
  const diff = costs.ev.insurance - costs.petrol.insurance
  const pctMore = Math.round((diff / costs.petrol.insurance) * 100)

  return (
    <Card>
      <p className="section-label mb-3">🛡️ Insurance</p>
      <h3 className="font-display font-bold text-xl text-slate-800 mb-1">Annual insurance</h3>
      <p className="text-sm text-slate-500 mb-5">
        EVs typically cost 10–25% more to insure due to higher repair costs. These are estimates — get quotes for accuracy.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-1">
            {petrolCar.make} {petrolCar.model}
          </p>
          <p className="font-display font-bold text-2xl text-slate-700">
            {formatCurrency(costs.petrol.insurance)}
          </p>
          <p className="text-xs text-slate-400 mt-1">estimated per year</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-1">
            {evCar.make} {evCar.model}
          </p>
          <p className="font-display font-bold text-2xl text-slate-700">
            {formatCurrency(costs.ev.insurance)}
          </p>
          <p className="text-xs text-slate-400 mt-1">estimated per year</p>
        </div>
      </div>

      {diff > 0 && (
        <p className="mt-3 text-xs text-slate-400 text-center">
          EV insurance is ~{pctMore}% higher ({formatCurrency(diff)}/year more)
        </p>
      )}
    </Card>
  )
}
