import { useEffect, useRef, useState } from 'react'
import { getPetrolCarById, getEvCarById } from '../../data/cars.js'
import { calcYearlyRunningCosts, calcCO2, resolveChargingRate } from '../../utils/calculations.js'
import { CONSTANTS } from '../../data/constants.js'

import FuelComparison from './FuelComparison.jsx'
import InsuranceComparison from './InsuranceComparison.jsx'
import MaintenanceComparison from './MaintenanceComparison.jsx'
import TaxAndCharges from './TaxAndCharges.jsx'
import YearlySummary from './YearlySummary.jsx'
import BreakEvenChart from './BreakEvenChart.jsx'
import BatteryDegradation from './BatteryDegradation.jsx'
import JourneyStops from './JourneyStops.jsx'
import EnvironmentalImpact from './EnvironmentalImpact.jsx'

function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  )
}

export default function ResultsDashboard({ wizardData, onStartOver }) {
  const {
    desiredPetrolCarId,
    selectedEvId,
    annualMiles,
    hasSolar,
    hasHomeCharging,
    electricityRate,
    city,
    destinations,
  } = wizardData

  const petrolCar = getPetrolCarById(desiredPetrolCarId)
  const evCar = getEvCarById(selectedEvId)

  if (!petrolCar || !evCar) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Could not load car data. Please try again.</p>
        <button onClick={onStartOver} className="btn-primary mt-4">Start over</button>
      </div>
    )
  }

  const chargingRate = resolveChargingRate(hasSolar, hasHomeCharging, electricityRate)
  const costs = calcYearlyRunningCosts({
    petrolCar,
    evCar,
    annualMiles: annualMiles || 8000,
    chargingRate,
    userLocation: city,
    destinations,
  })
  const co2Data = calcCO2(petrolCar, evCar, annualMiles || 8000)

  const sections = [
    <FuelComparison key="fuel" costs={costs} petrolCar={petrolCar} evCar={evCar} chargingRate={chargingRate} />,
    <InsuranceComparison key="insurance" costs={costs} petrolCar={petrolCar} evCar={evCar} />,
    <MaintenanceComparison key="maintenance" costs={costs} />,
    <TaxAndCharges key="tax" costs={costs} petrolCar={petrolCar} evCar={evCar} userLocation={city} destinations={destinations} />,
    <YearlySummary key="summary" costs={costs} petrolCar={petrolCar} evCar={evCar} />,
    <BreakEvenChart key="breakeven" petrolCar={petrolCar} evCar={evCar} costs={costs} annualMiles={annualMiles} />,
    <BatteryDegradation key="battery" evCar={evCar} />,
    <JourneyStops key="journeys" userCity={city} destinations={destinations} evCar={evCar} />,
    <EnvironmentalImpact key="env" co2Data={co2Data} />,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Hero header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-teal-200 text-sm font-semibold mb-2">Your personalised results</p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-2">
            {petrolCar.make} {petrolCar.model} vs {evCar.make} {evCar.model}
          </h2>
          <p className="text-teal-200 text-sm">
            Based on {(annualMiles || 8000).toLocaleString()} miles/year from {city}
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3">
              <p className="text-teal-200 text-xs mb-0.5">Annual saving</p>
              <p className="font-display font-bold text-xl">
                {costs.annualSaving > 0 ? `£${Math.round(costs.annualSaving).toLocaleString()}` : '—'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3">
              <p className="text-teal-200 text-xs mb-0.5">CO₂ saved</p>
              <p className="font-display font-bold text-xl">
                {Math.round(co2Data.savingKgPerYear).toLocaleString()} kg/yr
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 col-span-2 sm:col-span-1">
              <p className="text-teal-200 text-xs mb-0.5">EV range</p>
              <p className="font-display font-bold text-xl">{evCar.rangeMiles} miles</p>
            </div>
          </div>
        </div>
      </div>

      {/* Results sections */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        {sections.map((section, i) => (
          <AnimatedSection key={i} delay={i * 80}>
            {section}
          </AnimatedSection>
        ))}

        <div className="text-center pt-6">
          <button onClick={onStartOver} className="btn-secondary">
            ← Start over with different cars
          </button>
        </div>
      </div>
    </div>
  )
}
