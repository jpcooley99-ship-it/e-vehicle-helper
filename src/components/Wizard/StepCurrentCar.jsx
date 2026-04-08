import { useState } from 'react'
import { PETROL_CARS } from '../../data/cars.js'
import Tooltip from '../shared/Tooltip.jsx'

export default function StepCurrentCar({ data, onChange }) {
  const noCar = data.currentCarId === 'none'
  const selected = data.currentCarId && !noCar
    ? PETROL_CARS.find(c => c.id === data.currentCarId)
    : null

  const [search, setSearch] = useState(selected ? `${selected.make} ${selected.model}` : '')
  const [showDropdown, setShowDropdown] = useState(false)

  const filtered = PETROL_CARS.filter(c =>
    `${c.make} ${c.model}`.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 40)

  function selectCar(car) {
    setSearch(`${car.make} ${car.model}`)
    setShowDropdown(false)
    onChange({ currentCarId: car.id })
  }

  function selectNoCar() {
    setSearch('')
    onChange({ currentCarId: 'none' })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="section-label mb-2">Step 2</p>
        <h2 className="font-display font-bold text-2xl text-navy-950 mb-1">Your current car</h2>
        <p className="text-slate-500 text-sm">Tell us what you drive today, or select that you don't own a car yet.</p>
      </div>

      {/* No car option */}
      <button
        type="button"
        onClick={selectNoCar}
        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
          noCar
            ? 'border-navy-800 bg-navy-950 text-white'
            : 'border-slate-200 hover:border-slate-300 bg-white'
        }`}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
          noCar ? 'bg-navy-700' : 'bg-slate-100'
        }`}>🚶</div>
        <div className="flex-1">
          <p className={`font-display font-bold text-sm ${noCar ? 'text-white' : 'text-navy-900'}`}>
            I don't currently own a car
          </p>
          <p className={`text-xs mt-0.5 ${noCar ? 'text-navy-300' : 'text-slate-400'}`}>
            I'm buying my first car and considering going electric
          </p>
        </div>
        {noCar && <span className="text-coral-400 font-bold shrink-0">✓</span>}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs text-slate-400 font-semibold">or search for your car</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <div className="space-y-5">
        <div className="relative">
          <label className="block text-sm font-bold text-navy-800 mb-2">What car do you currently drive?</label>
          <input
            type="text"
            className="input-base"
            placeholder="Search make and model… (e.g. Ford Focus)"
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setShowDropdown(true)
              if (!e.target.value) onChange({ currentCarId: null })
            }}
            onFocus={() => { setShowDropdown(true); if (noCar) onChange({ currentCarId: null }) }}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />
          {showDropdown && filtered.length > 0 && (
            <div className="absolute z-20 left-0 right-0 mt-1 bg-white border-2 border-slate-100 rounded-2xl shadow-xl overflow-auto max-h-56">
              {filtered.map(car => (
                <button
                  key={car.id}
                  type="button"
                  className="w-full text-left px-4 py-3 text-sm hover:bg-navy-50 text-navy-800 transition-colors border-b border-slate-50 last:border-0"
                  onMouseDown={() => selectCar(car)}
                >
                  <span className="font-bold">{car.make}</span> {car.model}
                  <span className="text-slate-400 text-xs ml-2">{car.mpg} mpg</span>
                </button>
              ))}
            </div>
          )}
          {selected && (
            <p className="mt-1.5 text-xs font-bold text-coral-500">✓ Selected</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-navy-800 mb-2">
            <Tooltip text="The UK average is around 8,000 miles per year. A typical commuter might do 10,000–15,000 miles.">
              Miles driven per year
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
          <p className="text-xs text-slate-400 mt-1.5">UK average is ~8,000 miles/year</p>
        </div>
      </div>
    </div>
  )
}
