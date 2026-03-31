import Card from '../shared/Card.jsx'
import { CONSTANTS } from '../../data/constants.js'

export default function BatteryDegradation({ evCar }) {
  const originalRange = evCar.rangeMiles
  const range5yr = Math.round(originalRange * CONSTANTS.BATTERY_CAPACITY_5YR)
  const range10yr = Math.round(originalRange * CONSTANTS.BATTERY_CAPACITY_10YR)

  const segments = [
    { year: 'Now', pct: 100, range: originalRange, colour: 'bg-teal-500' },
    { year: '5 years', pct: Math.round(CONSTANTS.BATTERY_CAPACITY_5YR * 100), range: range5yr, colour: 'bg-teal-400' },
    { year: '10 years', pct: Math.round(CONSTANTS.BATTERY_CAPACITY_10YR * 100), range: range10yr, colour: 'bg-teal-300' },
  ]

  return (
    <Card>
      <p className="section-label mb-3">🔋 Battery Health</p>
      <h3 className="font-display font-bold text-xl text-slate-800 mb-1">Battery degradation over time</h3>
      <p className="text-sm text-slate-500 mb-5">
        All lithium batteries degrade slightly over time — but EV batteries are more resilient than you might think.
        Most manufacturers offer an 8-year / 100,000-mile battery warranty.
      </p>

      <div className="space-y-4 mb-5">
        {segments.map(s => (
          <div key={s.year}>
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-sm font-semibold text-slate-700">{s.year}</span>
              <span className="text-sm font-display font-bold text-slate-700">{s.range} mile range ({s.pct}%)</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${s.colour} rounded-full transition-all duration-700`}
                style={{ width: `${s.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-xs text-slate-500">
        <div className="flex gap-2">
          <span className="text-teal-500 font-bold">✓</span>
          Most EVs retain ~90% capacity after 5 years of typical use
        </div>
        <div className="flex gap-2">
          <span className="text-teal-500 font-bold">✓</span>
          8-year / 100,000-mile battery warranty from most major manufacturers
        </div>
        <div className="flex gap-2">
          <span className="text-teal-500 font-bold">✓</span>
          Real-world data from Nissan Leaf, Tesla, and others shows ~80% capacity at 10 years
        </div>
        <div className="flex gap-2">
          <span className="text-amber-500 font-bold">ℹ</span>
          Avoid frequent DC rapid charging and 100% charging to slow degradation
        </div>
      </div>
    </Card>
  )
}
