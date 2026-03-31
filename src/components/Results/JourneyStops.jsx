import Card from '../shared/Card.jsx'
import { calcJourney } from '../../utils/calculations.js'

export default function JourneyStops({ userCity, destinations, evCar }) {
  const validDests = (destinations || []).filter(d => d && d.trim())

  if (!userCity || validDests.length === 0) return null

  const journeys = validDests.map(dest => calcJourney(userCity, dest, evCar)).filter(Boolean)

  return (
    <Card>
      <p className="section-label mb-3">🗺️ Journey Planning</p>
      <h3 className="font-display font-bold text-xl text-slate-800 mb-1">Charging stops for your journeys</h3>
      <p className="text-sm text-slate-500 mb-5">
        Based on the {evCar.make} {evCar.model}'s {evCar.rangeMiles}-mile range, with a 25% battery buffer target on arrival.
      </p>

      <div className="space-y-4">
        {journeys.map((j, i) => (
          <div
            key={i}
            className={`rounded-xl p-4 border ${
              j.withinRange
                ? 'bg-green-50 border-green-100'
                : 'bg-amber-50 border-amber-100'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-display font-semibold text-slate-800">
                  {j.origin} → {j.destination}
                </p>
                <p className="text-xs text-slate-500">{j.distanceMiles} miles</p>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  j.withinRange
                    ? 'bg-green-200 text-green-800'
                    : 'bg-amber-200 text-amber-800'
                }`}
              >
                {j.withinRange ? '✓ No stop needed' : `${j.stopsNeeded} stop${j.stopsNeeded > 1 ? 's' : ''}`}
              </span>
            </div>

            {j.withinRange ? (
              <p className="text-sm text-green-700">
                This journey fits comfortably within your EV's range. You'll arrive with charge to spare.
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-amber-700">
                  You'll need <strong>{j.stopsNeeded}</strong> charging stop{j.stopsNeeded > 1 ? 's' : ''} on this journey.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-xs text-slate-400 mb-1">50kW rapid charger</p>
                    <p className="font-display font-bold text-lg text-slate-700">
                      ~{j.chargingTime50kw} min
                    </p>
                    <p className="text-xs text-slate-400">per stop</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 text-center">
                    <p className="text-xs text-slate-400 mb-1">150kW rapid charger</p>
                    <p className="font-display font-bold text-lg text-slate-700">
                      ~{j.chargingTime150kw} min
                    </p>
                    <p className="text-xs text-slate-400">per stop</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  150kW chargers (e.g. Gridserve, Osprey) are widely available on major UK routes.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
