import { useState } from 'react'
import { PETROL_CARS, EV_CARS, getEvEquivalent } from '../../data/cars.js'

export default function StepDesiredCar({ data, onChange }) {
  const [search, setSearch] = useState(
    data.desiredPetrolCarId
      ? (() => {
          const c = PETROL_CARS.find(x => x.id === data.desiredPetrolCarId)
          return c ? `${c.make} ${c.model}` : ''
        })()
      : ''
  )
  const [showDropdown, setShowDropdown] = useState(false)

  const filtered = PETROL_CARS.filter(c =>
    `${c.make} ${c.model}`.toLowerCase().includes(search.toLowerCase())
  )

  function selectPetrolCar(car) {
    setSearch(`${car.make} ${car.model}`)
    setShowDropdown(false)
    const ev = getEvEquivalent(car.id)
    onChange({
      desiredPetrolCarId: car.id,
      selectedEvId: ev ? ev.id : null,
    })
  }

  function selectEv(evId) {
    onChange({ selectedEvId: evId })
  }

  const selectedEv = data.selectedEvId ? EV_CARS.find(e => e.id === data.selectedEvId) : null
  const suggestedEv = data.desiredPetrolCarId ? getEvEquivalent(data.desiredPetrolCarId) : null

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display font-bold text-2xl text-slate-800 mb-1">The petrol car you'd buy</h2>
        <p className="text-slate-500 text-sm">This is your baseline — the petrol car you'd choose if you weren't going electric.</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Which petrol car would you choose?
          </label>
          <input
            type="text"
            className="input-base"
            placeholder="Search make and model..."
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setShowDropdown(true)
              if (!e.target.value) onChange({ desiredPetrolCarId: null, selectedEvId: null })
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
                  onMouseDown={() => selectPetrolCar(car)}
                >
                  <span className="font-semibold">{car.make}</span> {car.model}
                  <span className="text-slate-400 text-xs ml-2">{car.mpg}mpg · ~£{car.purchasePrice.toLocaleString()}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {suggestedEv && (
          <div className="animate-slide-up">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Suggested electric equivalent
            </label>
            <p className="text-xs text-slate-400 mb-3">We've picked the closest EV match. You can change it below.</p>
            <div className="grid grid-cols-1 gap-2">
              {/* Suggested EV */}
              <button
                type="button"
                onClick={() => selectEv(suggestedEv.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                  data.selectedEvId === suggestedEv.id
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-2xl">⚡</div>
                <div className="flex-1">
                  <p className="font-display font-semibold text-slate-800">
                    {suggestedEv.make} {suggestedEv.model}
                    <span className="ml-2 text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-body">Recommended</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {suggestedEv.rangeMiles} mile range · {suggestedEv.milesPerKwh} mi/kWh · ~£{suggestedEv.purchasePrice.toLocaleString()}
                  </p>
                </div>
                {data.selectedEvId === suggestedEv.id && (
                  <span className="text-teal-600 font-bold">✓</span>
                )}
              </button>

              {/* Tesla as alternative option */}
              {suggestedEv.id !== 'tesla-model3' && (
                <button
                  type="button"
                  onClick={() => selectEv('tesla-model3')}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    data.selectedEvId === 'tesla-model3'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">🚗</div>
                  <div className="flex-1">
                    <p className="font-display font-semibold text-slate-800">Tesla Model 3</p>
                    <p className="text-xs text-slate-400 mt-0.5">358 mile range · 4.1 mi/kWh · ~£42,990</p>
                  </div>
                  {data.selectedEvId === 'tesla-model3' && (
                    <span className="text-teal-600 font-bold">✓</span>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
