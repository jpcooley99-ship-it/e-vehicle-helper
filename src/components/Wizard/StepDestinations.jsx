import { UK_CITIES } from '../../data/distances.js'

export default function StepDestinations({ data, onChange }) {
  function updateDest(index, value) {
    const updated = [...(data.destinations || ['', '', ''])]
    updated[index] = value
    onChange({ destinations: updated })
  }

  const dests = data.destinations || ['', '', '']

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display font-bold text-2xl text-slate-800 mb-1">Your top destinations</h2>
        <p className="text-slate-500 text-sm">
          We'll work out if your EV can reach these places on a full charge — and how long any charging stops would take.
        </p>
      </div>

      <div className="space-y-4">
        {[0, 1, 2].map(i => (
          <div key={i}>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              {['Most common destination', 'Second most common', 'Third most common'][i]}
              {i === 0 && <span className="text-red-400 ml-1">*</span>}
              {i > 0 && <span className="text-slate-400 font-normal ml-1">(optional)</span>}
            </label>
            <input
              type="text"
              className="input-base"
              placeholder={['e.g. London', 'e.g. Bristol', 'e.g. Edinburgh'][i]}
              value={dests[i]}
              onChange={e => updateDest(i, e.target.value)}
              list={`cities-${i}`}
            />
            <datalist id={`cities-${i}`}>
              {UK_CITIES.map(city => (
                <option key={city} value={city} />
              ))}
            </datalist>
          </div>
        ))}

        <div className="bg-teal-50 rounded-xl p-4 border border-teal-100">
          <p className="text-sm text-teal-700 font-semibold mb-1">💡 How this works</p>
          <p className="text-xs text-teal-600">
            We calculate the distance from your home city to each destination and compare it against your chosen EV's range. If a stop is needed, we estimate charge time at both 50kW and 150kW rapid chargers.
          </p>
        </div>
      </div>
    </div>
  )
}
