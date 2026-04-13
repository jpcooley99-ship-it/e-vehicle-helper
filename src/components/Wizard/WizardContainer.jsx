import { useState } from 'react'
import ProgressBar from '../shared/ProgressBar.jsx'
import StepLocation from './StepLocation.jsx'
import StepCurrentCar from './StepCurrentCar.jsx'
import StepDesiredCar from './StepDesiredCar.jsx'
import StepDestinations from './StepDestinations.jsx'

const STEPS = [
  { label: 'About you',    component: StepLocation },
  { label: 'Your car',     component: StepCurrentCar },
  { label: 'New car',      component: StepDesiredCar },
  { label: 'Journeys',     component: StepDestinations },
]

function validateStep(step, data) {
  if (step === 1) {
    if (!data.city?.trim()) return 'Please enter your town or city.'
    if (data.hasDriveway === undefined) return 'Please tell us if you have a driveway.'
    if (data.hasSolar === undefined) return 'Please tell us if you have solar panels.'
    if (data.hasDriveway && data.hasHomeCharging === undefined) return 'Please tell us if you can charge from home.'
  }
  if (step === 2) {
    if (!data.currentCarId) return "Please select your current car, or choose 'I don't currently own a car'."
    if (!data.annualMiles || data.annualMiles < 100) return 'Please enter a valid annual mileage.'
  }
  if (step === 3) {
    if (!data.desiredPetrolCarId) return 'Please select a petrol car to compare against.'
    if (!data.selectedEvId) return 'Please select an electric car.'
  }
  if (step === 4) {
    if (!data.destinations?.[0]?.trim()) return 'Please enter at least your most common destination.'
  }
  return null
}

export default function WizardContainer({ onComplete }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    city: '', hasDriveway: undefined, hasSolar: undefined, hasHomeCharging: undefined,
    electricityRate: null, currentCarId: null, annualMiles: 8000,
    desiredPetrolCarId: null, selectedEvId: null, destinations: ['', '', ''],
  })
  const [error, setError] = useState(null)

  function handleChange(updates) {
    setData(prev => ({ ...prev, ...updates }))
    setError(null)
  }

  function handleNext() {
    const err = validateStep(step, data)
    if (err) { setError(err); return }
    if (step < STEPS.length) setStep(s => s + 1)
    else onComplete(data)
  }

  const StepComponent = STEPS[step - 1].component

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start py-10 px-4">
      {/* Hero tagline */}
      {step === 1 && (
        <div className="w-full max-w-lg mb-8 text-center animate-fade-in">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-navy-950 mb-2 leading-tight">
            Should you go electric?
          </h1>
          <p className="text-slate-500 text-base">
            Find out the true cost in under 2 minutes.
          </p>
        </div>
      )}

      <div className="w-full max-w-lg">
        <div className="mb-7">
          <ProgressBar currentStep={step} totalSteps={STEPS.length} labels={STEPS.map(s => s.label)} />
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-7">
          <StepComponent data={data} onChange={handleChange} />

          {error && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl px-4 py-3 font-semibold">
              {error}
            </div>
          )}

          <div className="flex gap-3 mt-7">
            {step > 1 && (
              <button type="button" onClick={() => { setError(null); setStep(s => s - 1) }} className="btn-secondary flex-none">
                ← Back
              </button>
            )}
            <button type="button" onClick={handleNext} className="btn-primary flex-1">
              {step < STEPS.length ? 'Continue →' : 'Show my results →'}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">{step} of {STEPS.length}</p>
      </div>
    </div>
  )
}
