import { useEffect, useRef, useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip as ReTooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts'

import { getPetrolCarById, getEvCarById } from '../../data/cars.js'
import {
  calcYearlyRunningCosts, calcCO2, resolveChargingRate,
  calcBreakEven, calcCumulativeCosts, calcJourney,
} from '../../utils/calculations.js'
import { formatCurrency, formatYearsMonths, formatKg } from '../../utils/formatters.js'
import { CONSTANTS } from '../../data/constants.js'
import Accordion from '../shared/Accordion.jsx'

// ─── small helpers ────────────────────────────────────────────────────────────

function StatPill({ label, value, light }) {
  return (
    <div className={`rounded-2xl px-5 py-4 ${light ? 'bg-white/15' : 'bg-white border border-slate-100'}`}>
      <p className={`text-xs font-bold mb-0.5 ${light ? 'text-white/60' : 'text-slate-400'}`}>{label}</p>
      <p className={`font-display font-bold text-xl ${light ? 'text-white' : 'text-navy-950'}`}>{value}</p>
    </div>
  )
}

function Row({ label, petrol, ev }) {
  const cheaper = ev < petrol
  return (
    <div className="grid grid-cols-3 gap-3 py-3 border-b border-slate-50 last:border-0 text-sm items-center">
      <span className="text-slate-500">{label}</span>
      <span className="text-center font-display font-semibold text-navy-900">{formatCurrency(petrol)}</span>
      <span className={`text-center font-display font-semibold ${cheaper ? 'text-emerald-600' : 'text-navy-900'}`}>
        {formatCurrency(ev)}{cheaper && <span className="ml-1 text-emerald-500 text-xs">↓</span>}
      </span>
    </div>
  )
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-navy-950 text-white rounded-2xl px-4 py-3 shadow-xl text-sm">
      <p className="font-bold mb-1 text-navy-300">Year {label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">{p.name}: {formatCurrency(p.value)}</p>
      ))}
    </div>
  )
}

function AnimIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.disconnect() } }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={`transition-all duration-500 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {children}
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

export default function ResultsDashboard({ wizardData, onStartOver }) {
  const { desiredPetrolCarId, selectedEvId, annualMiles, hasSolar, hasHomeCharging,
    electricityRate, city, destinations } = wizardData

  const petrolCar = getPetrolCarById(desiredPetrolCarId)
  const evCar     = getEvCarById(selectedEvId)
  const miles     = annualMiles || 8000

  if (!petrolCar || !evCar) return (
    <div className="text-center py-20">
      <p className="text-slate-500 mb-4">Could not load car data. Please try again.</p>
      <button onClick={onStartOver} className="btn-primary">Start over</button>
    </div>
  )

  const chargingRate = resolveChargingRate(hasSolar, hasHomeCharging, electricityRate)
  const costs = calcYearlyRunningCosts({ petrolCar, evCar, annualMiles: miles, chargingRate, userLocation: city, destinations })
  const co2   = calcCO2(petrolCar, evCar, miles)
  const breakEven  = calcBreakEven(petrolCar.purchasePrice, evCar.purchasePrice, costs.annualSaving)
  const chartData  = calcCumulativeCosts(petrolCar, evCar, costs.annualSaving)

  const pName = `${petrolCar.make} ${petrolCar.model}`
  const eName = `${evCar.make} ${evCar.model}`

  const validDests   = (destinations || []).filter(d => d?.trim())
  const journeys     = validDests.map(d => calcJourney(city, d, evCar)).filter(Boolean)

  const rateLabel = chargingRate === 0 ? 'Solar (free)'
    : chargingRate === CONSTANTS.PUBLIC_CHARGING_RATE ? `Public charging (${Math.round(chargingRate * 100)}p/kWh)`
    : `Home charging (${Math.round(chargingRate * 100)}p/kWh)`

  const hasLondon = [city, ...(destinations || [])].some(l => l?.toLowerCase().includes('london'))

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── HERO ── */}
      <div className="bg-navy-950 text-white pt-10 pb-14 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-navy-400 text-sm font-bold mb-3">{pName} vs {eName} · {miles.toLocaleString()} miles/year from {city}</p>

          {costs.annualSaving > 0 ? (
            <>
              <h2 className="font-display font-bold text-4xl sm:text-5xl leading-tight mb-1">
                You could save
              </h2>
              <div className="flex items-end gap-3 mb-4">
                <span className="font-display font-bold text-5xl sm:text-6xl text-coral-400">
                  {formatCurrency(costs.annualSaving)}
                </span>
                <span className="text-navy-400 text-lg mb-1">per year</span>
              </div>
              <p className="text-navy-400 text-sm">by switching to the {eName}</p>
            </>
          ) : (
            <>
              <h2 className="font-display font-bold text-4xl sm:text-5xl leading-tight mb-2">
                Running costs are<br />similar in this scenario
              </h2>
              <p className="text-navy-400 text-sm">The EV costs {formatCurrency(Math.abs(costs.annualSaving))} more per year to run, but has a lower upfront price premium.</p>
            </>
          )}

          <div className="grid grid-cols-3 gap-3 mt-8">
            <StatPill light label="EV range" value={`${evCar.rangeMiles} mi`} />
            <StatPill light label="CO₂ saved" value={`${Math.round(co2.savingKgPerYear).toLocaleString()} kg/yr`} />
            <StatPill light label="Break-even" value={breakEven.never ? 'N/A' : `${breakEven.years}yr ${breakEven.months}mo`} />
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-16 space-y-4">

        {/* YEARLY COST BREAKDOWN */}
        <AnimIn>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <p className="section-label mb-2">Running costs</p>
              <h3 className="font-display font-bold text-xl text-navy-950 mb-5">Full yearly cost breakdown</h3>

              <div className="grid grid-cols-3 gap-3 mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div></div>
                <div className="text-center">{pName}</div>
                <div className="text-center">{eName}</div>
              </div>

              <Row label="Fuel / Energy"  petrol={costs.petrol.fuel}        ev={costs.ev.energy} />
              <Row label="Insurance"      petrol={costs.petrol.insurance}   ev={costs.ev.insurance} />
              <Row label="Maintenance"    petrol={costs.petrol.maintenance} ev={costs.ev.maintenance} />
              <Row label="Road Tax (VED)" petrol={costs.petrol.ved}         ev={costs.ev.ved} />
              {costs.petrol.congestion > 0 && (
                <Row label="Congestion charge" petrol={costs.petrol.congestion} ev={costs.ev.congestion} />
              )}
            </div>

            {/* totals bar */}
            <div className="grid grid-cols-3 gap-3 bg-navy-950 text-white px-6 py-4">
              <span className="font-display font-bold text-sm self-center">Total / year</span>
              <span className="text-center font-display font-bold text-lg">{formatCurrency(costs.petrol.total)}</span>
              <span className="text-center font-display font-bold text-lg text-coral-400">{formatCurrency(costs.ev.total)}</span>
            </div>

            {costs.annualSaving > 0 && (
              <div className="px-6 py-4 bg-emerald-50 border-t border-emerald-100 flex items-center justify-between">
                <span className="text-sm font-bold text-emerald-700">Annual saving with electric</span>
                <span className="font-display font-bold text-2xl text-emerald-600">{formatCurrency(costs.annualSaving)}</span>
              </div>
            )}
          </div>
        </AnimIn>

        {/* BREAK-EVEN CHART */}
        <AnimIn delay={80}>
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <p className="section-label mb-2">Break-even</p>
            <h3 className="font-display font-bold text-xl text-navy-950 mb-1">10-year cumulative cost</h3>
            <p className="text-sm text-slate-500 mb-5">Purchase price + running costs. Where the lines cross, the EV is ahead overall.</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-slate-50 rounded-2xl p-4 text-center">
                <p className="text-xs text-slate-400 mb-1">Price premium</p>
                <p className="font-display font-bold text-xl text-navy-950">
                  {formatCurrency(evCar.purchasePrice - petrolCar.purchasePrice)}
                </p>
                <p className="text-xs text-slate-400">more upfront</p>
              </div>
              <div className={`rounded-2xl p-4 text-center ${breakEven.never ? 'bg-amber-50' : 'bg-emerald-50'}`}>
                <p className={`text-xs mb-1 ${breakEven.never ? 'text-amber-500' : 'text-emerald-600'}`}>Break-even</p>
                {breakEven.never
                  ? <p className="font-display font-bold text-xl text-amber-700">Not within 10 yr</p>
                  : <>
                      <p className="font-display font-bold text-xl text-emerald-700">{formatYearsMonths(breakEven.years, breakEven.months)}</p>
                      <p className="text-xs text-emerald-500">from purchase</p>
                    </>
                }
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={v => `£${Math.round(v/1000)}k`} />
                  <ReTooltip content={<ChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                  {!breakEven.never && (
                    <ReferenceLine x={breakEven.years + breakEven.months / 12} stroke="#10b981"
                      strokeDasharray="4 4"
                      label={{ value: '★ Break-even', position: 'top', fontSize: 10, fill: '#10b981' }} />
                  )}
                  <Line type="monotone" dataKey="petrol" name={pName} stroke="#f97316" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} animationDuration={1200} />
                  <Line type="monotone" dataKey="ev"     name={eName} stroke="#0d9488" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} animationDuration={1200} animationBegin={200} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {!breakEven.never && (
              <div className="mt-4 bg-navy-50 rounded-2xl px-5 py-3 border border-navy-100">
                <p className="text-sm text-navy-700">
                  After <strong>{formatYearsMonths(breakEven.years, breakEven.months)}</strong> the {eName} is the cheaper option overall — saving <strong>{formatCurrency(costs.annualSaving)}</strong> every year after that.
                </p>
              </div>
            )}
          </div>
        </AnimIn>

        {/* DETAIL ACCORDIONS */}
        <AnimIn delay={160}>
          <div className="space-y-3">
            <p className="font-display font-bold text-navy-950 text-sm px-1 pt-2">Explore the detail</p>

            {/* Fuel / Energy */}
            <Accordion title="Fuel &amp; energy costs" icon="⛽">
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                  <p className="text-xs font-bold text-orange-500 mb-1">{pName}</p>
                  <p className="font-display font-bold text-2xl text-orange-700">{formatCurrency(costs.petrol.fuel)}</p>
                  <p className="text-xs text-orange-400 mt-1">petrol / year</p>
                  <p className="text-xs text-slate-400 mt-2">@ £1.45/litre · {petrolCar.mpg} mpg</p>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                  <p className="text-xs font-bold text-emerald-600 mb-1">{eName}</p>
                  <p className="font-display font-bold text-2xl text-emerald-700">{formatCurrency(costs.ev.energy)}</p>
                  <p className="text-xs text-emerald-500 mt-1">electricity / year</p>
                  <p className="text-xs text-slate-400 mt-2">{rateLabel} · {evCar.milesPerKwh} mi/kWh</p>
                </div>
              </div>
            </Accordion>

            {/* Insurance */}
            <Accordion title="Insurance" icon="🛡️">
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-xs font-bold text-slate-500 mb-1">{pName}</p>
                  <p className="font-display font-bold text-2xl text-navy-900">{formatCurrency(costs.petrol.insurance)}</p>
                  <p className="text-xs text-slate-400 mt-1">estimated / year</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-xs font-bold text-slate-500 mb-1">{eName}</p>
                  <p className="font-display font-bold text-2xl text-navy-900">{formatCurrency(costs.ev.insurance)}</p>
                  <p className="text-xs text-slate-400 mt-1">estimated / year</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3">EVs typically cost 10–25% more to insure. These are estimates — always get your own quotes.</p>
            </Accordion>

            {/* Maintenance */}
            <Accordion title="Maintenance &amp; servicing" icon="🔧">
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-xs font-bold text-slate-500 mb-1">Petrol car</p>
                  <p className="font-display font-bold text-2xl text-navy-900">{formatCurrency(CONSTANTS.PETROL_MAINTENANCE_PER_YEAR)}</p>
                  <p className="text-xs text-slate-400 mt-1">avg. / year</p>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-4">
                  <p className="text-xs font-bold text-emerald-600 mb-1">Electric car</p>
                  <p className="font-display font-bold text-2xl text-emerald-700">{formatCurrency(CONSTANTS.EV_MAINTENANCE_PER_YEAR)}</p>
                  <p className="text-xs text-emerald-500 mt-1">avg. / year</p>
                </div>
              </div>
              <div className="mt-3 space-y-1.5 text-xs text-slate-500">
                <div className="flex gap-2"><span className="text-emerald-500">✓</span> No engine oil changes (~£100–150/year)</div>
                <div className="flex gap-2"><span className="text-emerald-500">✓</span> Less brake wear thanks to regenerative braking</div>
                <div className="flex gap-2"><span className="text-emerald-500">✓</span> No timing belt, spark plugs, or exhaust system</div>
              </div>
            </Accordion>

            {/* Road tax */}
            <Accordion title="Road tax &amp; congestion" icon="📋">
              <div className="space-y-2 mt-2">
                <div className="flex justify-between py-2 border-b border-slate-100 text-sm">
                  <div>
                    <p className="font-semibold text-navy-900">VED — {pName}</p>
                    <p className="text-xs text-slate-400">{petrolCar.co2Gkm}g/km CO₂</p>
                  </div>
                  <span className="font-display font-bold text-navy-900">{formatCurrency(costs.petrol.ved)}/yr</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100 text-sm">
                  <div>
                    <p className="font-semibold text-navy-900">VED — {eName}</p>
                    <p className="text-xs text-slate-400">Zero emissions</p>
                  </div>
                  <span className="font-display font-bold text-navy-900">{formatCurrency(costs.ev.ved)}/yr</span>
                </div>
              </div>
              {hasLondon
                ? <div className="mt-3 bg-amber-50 rounded-2xl p-4 text-xs text-amber-700 border border-amber-100">
                    <p className="font-bold mb-1">London Congestion Charge</p>
                    <p>The EV Cleanliness Discount ended December 2025. Both vehicles now pay £15/day if driving in the zone.</p>
                  </div>
                : <p className="text-xs text-slate-400 mt-3 text-center">No London congestion charge applies to your journeys.</p>
              }
            </Accordion>

            {/* Battery */}
            <Accordion title="Battery health over time" icon="🔋">
              <p className="text-xs text-slate-500 mt-2 mb-4">Based on typical real-world degradation data. Most manufacturers warranty the battery for 8 years / 100,000 miles.</p>
              <div className="space-y-4">
                {[
                  { label: 'Now',      pct: 100,                                           range: evCar.rangeMiles, colour: 'bg-navy-800' },
                  { label: '5 years',  pct: Math.round(CONSTANTS.BATTERY_CAPACITY_5YR  * 100), range: Math.round(evCar.rangeMiles * CONSTANTS.BATTERY_CAPACITY_5YR),  colour: 'bg-navy-600' },
                  { label: '10 years', pct: Math.round(CONSTANTS.BATTERY_CAPACITY_10YR * 100), range: Math.round(evCar.rangeMiles * CONSTANTS.BATTERY_CAPACITY_10YR), colour: 'bg-navy-400' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between items-baseline mb-1.5 text-sm">
                      <span className="font-bold text-navy-900">{s.label}</span>
                      <span className="text-navy-600">{s.range} miles ({s.pct}%)</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${s.colour} rounded-full`} style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Accordion>

            {/* Journeys */}
            {journeys.length > 0 && (
              <Accordion title="Journey charging stops" icon="🗺️">
                <p className="text-xs text-slate-500 mt-2 mb-4">
                  Based on the {eName}'s {evCar.rangeMiles}-mile range, with a 25% buffer target on arrival.
                </p>
                <div className="space-y-3">
                  {journeys.map((j, i) => (
                    <div key={i} className={`rounded-2xl p-4 border ${j.withinRange ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <p className="font-bold text-sm text-navy-900">{j.origin} → {j.destination}</p>
                          <p className="text-xs text-slate-500">{j.distanceMiles} miles</p>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${j.withinRange ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'}`}>
                          {j.withinRange ? '✓ No stop' : `${j.stopsNeeded} stop${j.stopsNeeded > 1 ? 's' : ''}`}
                        </span>
                      </div>
                      {!j.withinRange && (
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          <div className="bg-white rounded-xl p-3 text-center">
                            <p className="text-xs text-slate-400 mb-0.5">50kW charger</p>
                            <p className="font-display font-bold text-navy-900">~{j.chargingTime50kw} min</p>
                          </div>
                          <div className="bg-white rounded-xl p-3 text-center">
                            <p className="text-xs text-slate-400 mb-0.5">150kW charger</p>
                            <p className="font-display font-bold text-navy-900">~{j.chargingTime150kw} min</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Accordion>
            )}
          </div>
        </AnimIn>

        {/* ── ENVIRONMENTAL IMPACT (always visible) ── */}
        <AnimIn delay={240}>
          <div className="bg-navy-950 rounded-3xl p-7 text-white">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">Environmental impact</p>
            <h3 className="font-display font-bold text-2xl mb-1">
              Save {formatKg(co2.savingKgPerYear)} of CO₂
            </h3>
            <p className="text-navy-400 text-sm mb-7">every year by switching to the {eName}</p>

            <div className="grid grid-cols-3 gap-3 mb-7">
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <p className="text-3xl mb-2">🚗</p>
                <p className="font-display font-bold text-lg">{formatKg(co2.petrolKgPerYear)}</p>
                <p className="text-xs text-navy-400 mt-0.5">petrol car / yr</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <p className="text-3xl mb-2">⚡</p>
                <p className="font-display font-bold text-lg">{formatKg(co2.evKgPerYear)}</p>
                <p className="text-xs text-navy-400 mt-0.5">electric car / yr</p>
              </div>
              <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-2xl p-4 text-center">
                <p className="text-3xl mb-2">🌿</p>
                <p className="font-display font-bold text-lg text-emerald-400">{formatKg(co2.savingKgPerYear)}</p>
                <p className="text-xs text-emerald-400/70 mt-0.5">saved / yr</p>
              </div>
            </div>

            <p className="text-sm font-bold text-white mb-3">That's roughly equivalent to…</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <p className="text-3xl mb-1">🥗</p>
                <p className="font-display font-bold text-xl">{co2.vegetarianMonths} months</p>
                <p className="text-xs text-navy-400 mt-0.5">going vegetarian</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 text-center">
                <p className="text-3xl mb-1">🌳</p>
                <p className="font-display font-bold text-xl">{co2.treesEquivalent} trees</p>
                <p className="text-xs text-navy-400 mt-0.5">planted per year</p>
              </div>
            </div>
            <p className="text-xs text-navy-500 text-center mt-5">EV emissions will fall further as the UK grid adds more renewables.</p>
          </div>
        </AnimIn>

        <div className="text-center pt-4">
          <button onClick={onStartOver} className="btn-secondary">
            ← Try different cars
          </button>
        </div>
      </div>
    </div>
  )
}
