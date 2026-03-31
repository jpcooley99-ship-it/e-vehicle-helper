import Card from '../shared/Card.jsx'
import { formatCurrency } from '../../utils/formatters.js'
import { CONSTANTS } from '../../data/constants.js'

export default function MaintenanceComparison({ costs }) {
  const saving = costs.petrol.maintenance - costs.ev.maintenance

  return (
    <Card>
      <p className="section-label mb-3">🔧 Maintenance</p>
      <h3 className="font-display font-bold text-xl text-slate-800 mb-1">Annual maintenance</h3>
      <p className="text-sm text-slate-500 mb-5">
        EVs have fewer moving parts — no oil changes, less brake wear thanks to regenerative braking, and no exhaust system to maintain.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-semibold text-slate-500 mb-1">Petrol car</p>
          <p className="font-display font-bold text-2xl text-slate-700">
            {formatCurrency(CONSTANTS.PETROL_MAINTENANCE_PER_YEAR)}
          </p>
          <p className="text-xs text-slate-400 mt-1">avg. per year</p>
        </div>

        <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
          <p className="text-xs font-semibold text-teal-600 mb-1">Electric car</p>
          <p className="font-display font-bold text-2xl text-teal-700">
            {formatCurrency(CONSTANTS.EV_MAINTENANCE_PER_YEAR)}
          </p>
          <p className="text-xs text-teal-500 mt-1">avg. per year</p>
        </div>
      </div>

      <div className="space-y-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span> No engine oil changes (~£100-150/year)
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span> Less frequent brake pad replacement (regen braking)
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-500">✓</span> No timing belt, spark plugs, or exhaust system
        </div>
      </div>

      <div className="mt-4 bg-green-50 rounded-xl px-4 py-3 flex items-center justify-between border border-green-100">
        <span className="text-sm font-semibold text-green-700">Annual maintenance saving</span>
        <span className="font-display font-bold text-lg text-green-700">{formatCurrency(saving)}</span>
      </div>
    </Card>
  )
}
