import Card from '../shared/Card.jsx'
import { formatCurrency } from '../../utils/formatters.js'
import { CONSTANTS } from '../../data/constants.js'

export default function FuelComparison({ costs, petrolCar, evCar, chargingRate }) {
  const rateLabel =
    chargingRate === 0
      ? 'Solar (free)'
      : chargingRate === CONSTANTS.PUBLIC_CHARGING_RATE
      ? `Public charging (${Math.round(chargingRate * 100)}p/kWh)`
      : `Home charging (${Math.round(chargingRate * 100)}p/kWh)`

  return (
    <Card>
      <p className="section-label mb-3">⛽ Fuel & Energy</p>
      <h3 className="font-display font-bold text-xl text-slate-800 mb-1">Annual fuel costs</h3>
      <p className="text-sm text-slate-500 mb-5">Based on {petrolCar.mpg}mpg for the petrol car and {evCar.milesPerKwh} mi/kWh for the EV.</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
          <p className="text-xs font-semibold text-orange-600 mb-1">
            {petrolCar.make} {petrolCar.model}
          </p>
          <p className="font-display font-bold text-2xl text-orange-700">
            {formatCurrency(costs.petrol.fuel)}
          </p>
          <p className="text-xs text-orange-500 mt-1">petrol per year</p>
          <p className="text-xs text-slate-400 mt-2">@ £1.45/litre · 4.55 litres/gallon</p>
        </div>

        <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
          <p className="text-xs font-semibold text-teal-600 mb-1">
            {evCar.make} {evCar.model}
          </p>
          <p className="font-display font-bold text-2xl text-teal-700">
            {formatCurrency(costs.ev.energy)}
          </p>
          <p className="text-xs text-teal-500 mt-1">electricity per year</p>
          <p className="text-xs text-slate-400 mt-2">{rateLabel}</p>
        </div>
      </div>

      <div className="mt-4 bg-green-50 rounded-xl px-4 py-3 flex items-center justify-between border border-green-100">
        <span className="text-sm font-semibold text-green-700">Annual fuel saving</span>
        <span className="font-display font-bold text-lg text-green-700">
          {formatCurrency(costs.petrol.fuel - costs.ev.energy)}
        </span>
      </div>
    </Card>
  )
}
