import { useState } from 'react'
import { PETROL_CARS, EV_CARS, getEvEquivalent } from '../../data/cars.js'

export default function StepDesiredCar({ data, onChange }) {
  const selected = data.desiredPetrolCarId ? PETROL_CARS.find(c => c.id === data.desiredPetrolCarId) : null
  const [search, setSearch] = useState(selected ? `${selected.make} ${selected.model}` : '')
  const [showDropdown, setShowDropdown] = useState(false)

  const filtered = PETROL_CARS.filter(c =>
    `${c.make} ${c.model}`.toLowerCase().includes(search.toLowerCase())
  )

  function selectPetrolCar(car) {
    setSearch(`${car.make} ${car.model}`)
    setShowDropdown(false)
    const ev = getEvEquivalent(car.id)
    onChange({ desiredPetrolCarId: car.id, selectedEvId: ev ? ev.id : null })
  }

  const suggestedEv = data.desiredPetrolCarId ? getEvEquivalent(data.desiredPetrolCarId) : null

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="section-label mb-2">Step 3</p>
        <h2 className="font-display font-bold text-2xl text-navy-950 mb-1">The petrol car you'd buy</h2>
        <p className="text-slate-500 text-sm">This is your comparison baseline — what you'd choose if not going electric.</p>
      </div>

      <div className="space-y-5">
        <div className="relative">
          <label className="block text-sm font-bold text-navy-800 mb-2">Which petrol car would you choose?</label>
          <input type="text" className="input-base" placeholder="Search make and model…"
            value={search}
            onChange={e => { setSearch(e.target.value); setShowDropdown(true); if (!e.target.value) onChange({ desiredPetrolCarId: null, selectedEvId: null }) }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          />
          {showDropdown && filtered.length > 0 && (
            <div className="absolute z-20 left-0 right-0 mt-1 bg-white border-2 border-slate-100 rounded-2xl shadow-xl overflow-auto max-h-52">
              {filtered.map(car => (
                <button key={car.id} type="button"
                  className="w-full text-left px-4 py-3 text-sm hover:bg-navy-50 text-navy-800 transition-colors"
                  onMouseDown={() => selectPetrolCar(car)}>
                  <span className="font-bold">{car.make}</span> {car.model}
                  <span className="text-slate-400 text-xs ml-2">{car.mpg}mpg · ~£{car.purchasePrice.toLocaleString()}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {suggestedEv && (
          <div className="animate-slide-up space-y-3">
            <label className="block text-sm font-bold text-navy-800">Matched electric equivalent</label>
            <p className="text-xs text-slate-400 -mt-2">We've matched the closest EV. You can swap to a Tesla below.</p>

            {[suggestedEv, ...(suggestedEv.id !== 'tesla-model3' ? [EV_CARS.find(e => e.id === 'tesla-model3')] : [])].map(ev => (
              <button key={ev.id} type="button"
                onClick={() => onChange({ selectedEvId: ev.id })}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                  data.selectedEvId === ev.id
                    ? 'border-navy-800 bg-navy-950 text-white'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                  data.selectedEvId === ev.id ? 'bg-navy-700' : 'bg-slate-100'
                }`}>⚡</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-display font-bold text-sm">{ev.make} {ev.model}</p>
                    {ev.id === suggestedEv.id && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        data.selectedEvId === ev.id ? 'bg-coral-500 text-white' : 'bg-coral-100 text-coral-600'
                      }`}>Recommended</span>
                    )}
                  </div>
                  <p className={`text-xs mt-0.5 ${data.selectedEvId === ev.id ? 'text-navy-300' : 'text-slate-400'}`}>
                    {ev.rangeMiles} mile range · {ev.milesPerKwh} mi/kWh · ~£{ev.purchasePrice.toLocaleString()}
                  </p>
                </div>
                {data.selectedEvId === ev.id && <span className="text-coral-400 font-bold shrink-0">✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
