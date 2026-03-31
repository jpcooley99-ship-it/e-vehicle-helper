import Card from '../shared/Card.jsx'
import { formatCurrency } from '../../utils/formatters.js'

export default function TaxAndCharges({ costs, petrolCar, evCar, userLocation, destinations }) {
  const hasLondon = [userLocation, ...(destinations || [])].some(
    l => l && l.toLowerCase().includes('london')
  )

  return (
    <Card>
      <p className="section-label mb-3">📋 Tax & Charges</p>
      <h3 className="font-display font-bold text-xl text-slate-800 mb-1">Road tax & congestion charge</h3>
      <p className="text-sm text-slate-500 mb-5">
        From April 2025, EVs pay the same standard VED rate as petrol cars (£190/year), so the playing field has levelled here.
      </p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div>
            <p className="text-sm font-semibold text-slate-700">Vehicle Excise Duty (VED)</p>
            <p className="text-xs text-slate-400">{petrolCar.make} {petrolCar.model} ({petrolCar.co2Gkm}g/km CO₂)</p>
          </div>
          <span className="font-display font-bold text-slate-700">{formatCurrency(costs.petrol.ved)}/yr</span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div>
            <p className="text-sm font-semibold text-slate-700">Vehicle Excise Duty (VED)</p>
            <p className="text-xs text-slate-400">{evCar.make} {evCar.model} (zero emissions)</p>
          </div>
          <span className="font-display font-bold text-slate-700">{formatCurrency(costs.ev.ved)}/yr</span>
        </div>
      </div>

      {hasLondon && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-amber-700 mb-1">🏙️ London Congestion Charge</p>
          <p className="text-xs text-amber-600">
            The EV Cleanliness Discount for the London Congestion Charge ended in December 2025. Both petrol and electric vehicles now pay the full £15/day charge if driving in the zone. The charge is included in both totals above if London appears in your journeys.
          </p>
        </div>
      )}

      {!hasLondon && (
        <p className="text-xs text-slate-400 text-center">
          No London congestion charge applies to your journeys.
        </p>
      )}
    </Card>
  )
}
