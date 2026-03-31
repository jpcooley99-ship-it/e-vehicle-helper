import { useState } from 'react'
import { PETROL_CARS } from '../../data/cars.js'
import Tooltip from '../shared/Tooltip.jsx'

export default function StepCurrentCar({ data, onChange }) {
  const [search, setSearch] = useState(
    data.currentCarId
      ? PETROL_CARS.find(c => c.id === data.currentCarId)
        ? `${PETROL_CARS.find(c => c.id === data.currentCarId).make} ${PETROL_CARS.find(c => c.id === data.currentCarId).model}`
        : ''
      : ''
  )
  const [showDropdown, setShowDropdown] = useState(false)

  const filtered = PETROL_CARS.filter(c =>
    `${c.make} ${c.model}`.toLowerCase().includes(search.toLowerCase())
  )

  function selectCar(car) {
    setSearch(`${car.make} ${car.model}`)
    setShowDropdown(false)
    onChange({ currentCarId: car.id })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display font-bold text-2xl text-slate-800 mb-1">Your current car</h2>
        <p className="text-slate-500 text-sm">Tell us about the car you drive now.</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            What car do you currently drive?
          </label>
          <input
            type="text"
            className="input-base"
            placeholder="Search make and model..."
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setShowDropdown(true)
              if (!e.target.value) onChange({ currentCarId: null })
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />
          {showDropdown && filtered.length > 0 && (
            <div className="absolute z-20 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-auto max-h-52">
              {filtered.map(car => (
                <button
                  key={car.id}
                  type="button"
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-teal-50 text-slate-700 transition-colors first:rounded-t-xl last:rounded-b-xl"
                  onMouseDown={() => selectCar(car)}
                >
                  <span className="font-semibold">{car.make}</span> {car.model}
                  <span className="text-slate-400 text-xs ml-2">{car.mpg}mpg</span>
                </button>
              ))}
            </div>
          )}
          {data.currentCarId && (
            <p className="mt-1 text-xs text-teal-600 font-semibold">✓ Selected</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            <Tooltip text="The UK average is around 8,000 miles per year. A typical commuter might do 10,000–15,000 miles.">
              How many miles do you drive per year?
            </Tooltip>
          </label>
          <input
            type="number"
            className="input-base"
            placeholder="8000"
            min="1000"
            max="100000"
            value={data.annualMiles || ''}
            onChange={e => onChange({ annualMiles: e.target.value ? parseInt(e.target.value, 10) : null })}
          />
          <p className="text-xs text-slate-400 mt-1">UK average is around 8,000 miles per year</p>
        </div>
      </div>
    </div>
  )
}
