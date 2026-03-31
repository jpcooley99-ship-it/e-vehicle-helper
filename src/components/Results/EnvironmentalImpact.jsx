import Card from '../shared/Card.jsx'
import { formatKg } from '../../utils/formatters.js'

export default function EnvironmentalImpact({ co2Data }) {
  const { petrolKgPerYear, evKgPerYear, savingKgPerYear, vegetarianMonths, treesEquivalent } = co2Data

  const pctReduction = Math.round((savingKgPerYear / petrolKgPerYear) * 100)

  return (
    <Card>
      <p className="section-label mb-3">🌿 Environmental Impact</p>
      <h3 className="font-display font-bold text-xl text-slate-800 mb-1">Your CO₂ footprint comparison</h3>
      <p className="text-sm text-slate-500 mb-5">
        Based on the UK grid carbon intensity of 0.18 kg CO₂/kWh — which continues to fall as more renewables come online.
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
          <p className="text-xs font-semibold text-orange-500 mb-1">Petrol car CO₂</p>
          <p className="font-display font-bold text-2xl text-orange-700">{formatKg(petrolKgPerYear)}</p>
          <p className="text-xs text-orange-400 mt-0.5">per year</p>
        </div>
        <div className="bg-teal-50 rounded-xl p-4 text-center border border-teal-100">
          <p className="text-xs font-semibold text-teal-600 mb-1">Electric car CO₂</p>
          <p className="font-display font-bold text-2xl text-teal-700">{formatKg(evKgPerYear)}</p>
          <p className="text-xs text-teal-500 mt-0.5">per year</p>
        </div>
      </div>

      <div className="bg-green-50 border border-green-100 rounded-xl p-5 mb-5">
        <div className="text-center mb-3">
          <p className="text-xs text-green-600 font-semibold mb-1">Annual CO₂ saving</p>
          <p className="font-display font-bold text-3xl text-green-700">{formatKg(savingKgPerYear)}</p>
          <p className="text-xs text-green-500 mt-1">a {pctReduction}% reduction in your driving footprint</p>
        </div>
      </div>

      <p className="text-sm font-semibold text-slate-700 mb-3">That's roughly equivalent to…</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
          <p className="text-3xl mb-1">🥗</p>
          <p className="font-display font-bold text-xl text-green-700">{vegetarianMonths} months</p>
          <p className="text-xs text-green-600">of going vegetarian</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-100">
          <p className="text-3xl mb-1">🌳</p>
          <p className="font-display font-bold text-xl text-emerald-700">{treesEquivalent} trees</p>
          <p className="text-xs text-emerald-600">planted per year</p>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center mt-4">
        EV carbon footprint will further decrease as the UK grid transitions to more renewables.
      </p>
    </Card>
  )
}
