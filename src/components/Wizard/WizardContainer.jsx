import { useState } from 'react'
import ProgressBar from '../shared/ProgressBar.jsx'
import StepLocation from './StepLocation.jsx'
import StepCurrentCar from './StepCurrentCar.jsx'
import StepDesiredCar from './StepDesiredCar.jsx'
import StepDestinations from './StepDestinations.jsx'

const STEPS = [
  { label: 'You', component: StepLocation },
  { label: 'Current Car', component: StepCurrentCar },
  { label: 'New Car', component: StepDesiredCar },
  { label: 'Journeys', component: StepDestinations },
]

function validateStep(step, data) {
  if (step === 1) {
    if (!data.city || !data.city.trim()) return 'Please enter your town or city.'
    if (data.hasDriveway === undefined) return 'Please tell us if you have a driveway.'
    if (data.hasSolar === undefined) return 'Please tell us if you have solar panels.'
    if (data.hasDriveway && data.hasHomeCharging === undefined)
      return 'Please tell us if you can charge from home.'
    return null
  }
  if (step === 2) {
    if (!data.currentCarId) return 'Please select your current car.'
    if (!data.annualMiles || data.annualMiles < 100) return 'Please enter a valid annual mileage.'
    return null
  }
  if (step === 3) {
    if (!data.desiredPetrolCarId) return 'Please select a petrol car to compare against.'
    if (!data.selectedEvId) return 'Please select an EV to compare with.'
    return null
  }
  if (step === 4) {
    if (!data.destinations || !data.destinations[0] || !data.destinations[0].trim())
      return 'Please enter at least your most common destination.'
    return null
  }
  return null
}

export default function WizardContainer({ onComplete }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    city: '',
    hasDriveway: undefined,
    hasSolar: undefined,
    hasHomeCharging: undefined,
    electricityRate: null,
    currentCarId: null,
    annualMiles: 8000,
    desiredPetrolCarId: null,
    selectedEvId: null,
    destinations: ['', '', ''],
  })
  const [error, setError] = useState(null)

  function handleChange(updates) {
    setData(prev => ({ ...prev, ...updates }))
    setError(null)
  }

  function handleNext() {
    const err = validateStep(step, data)
    if (err) {
      setError(err)
      return
    }
    if (step < STEPS.length) {
      setStep(s => s + 1)
    } else {
      onComplete(data)
    }
  }

  function handleBack() {
    setError(null)
    setStep(s => s - 1)
  }

  const StepComponent = STEPS[step - 1].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex flex-col items-center justify-start py-10 px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8">
          <ProgressBar
            currentStep={step}
            totalSteps={STEPS.length}
            labels={STEPS.map(s => s.label)}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-md border border-slate-100 p-8">
          <StepComponent data={data} onChange={handleChange} />

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button type="button" onClick={handleBack} className="btn-secondary flex-1">
                ← Back
              </button>
            )}
            <button type="button" onClick={handleNext} className="btn-primary flex-1">
              {step < STEPS.length ? 'Continue →' : 'Calculate my results →'}
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Step {step} of {STEPS.length}
        </p>
      </div>
    </div>
  )
}
