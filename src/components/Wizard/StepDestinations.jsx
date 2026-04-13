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
        <p className="section-label mb-2">Step 4</p>
        <h2 className="font-display font-bold text-2xl text-navy-950 mb-1">Your top destinations</h2>
        <p className="text-slate-500 text-sm">We'll work out charging stops and times for each journey.</p>
      </div>

      <div className="space-y-4">
        {[0, 1, 2].map(i => (
          <div key={i}>
            <label className="block text-sm font-bold text-navy-800 mb-2">
              {['Most common destination', 'Second most common', 'Third most common'][i]}
              {i === 0 && <span className="text-coral-500 ml-1">*</span>}
              {i > 0  && <span className="text-slate-400 font-normal ml-1">(optional)</span>}
            </label>
            <input type="text" className="input-base"
              placeholder={['e.g. London', 'e.g. Bristol', 'e.g. Edinburgh'][i]}
              value={dests[i]}
              onChange={e => updateDest(i, e.target.value)}
              list={`cities-${i}`}
            />
            <datalist id={`cities-${i}`}>
              {UK_CITIES.map(c => <option key={c} value={c} />)}
            </datalist>
          </div>
        ))}

        <div className="bg-navy-50 rounded-2xl p-4 border border-navy-100">
          <p className="text-sm font-bold text-navy-800 mb-1">How this works</p>
          <p className="text-xs text-navy-600">
            We compare your EV's range against the distance to each destination. If a charge stop is needed, we estimate the time at both 50kW and 150kW rapid chargers.
          </p>
        </div>
      </div>
    </div>
  )
}
