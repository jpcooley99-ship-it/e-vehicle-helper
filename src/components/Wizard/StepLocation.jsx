import Tooltip from '../shared/Tooltip.jsx'

export default function StepLocation({ data, onChange }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="font-display font-bold text-2xl text-slate-800 mb-1">About you & your location</h2>
        <p className="text-slate-500 text-sm">This helps us tailor your costs to your situation.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Your town or city
          </label>
          <input
            type="text"
            className="input-base"
            placeholder="e.g. Manchester"
            value={data.city || ''}
            onChange={e => onChange({ city: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Do you have a driveway or off-street parking?
          </label>
          <div className="flex gap-3">
            {['Yes', 'No'].map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ hasDriveway: opt === 'Yes' })}
                className={`flex-1 py-3 rounded-xl border-2 font-display font-semibold text-sm transition-all ${
                  data.hasDriveway === (opt === 'Yes')
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Do you have solar panels?
          </label>
          <div className="flex gap-3">
            {['Yes', 'No'].map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ hasSolar: opt === 'Yes' })}
                className={`flex-1 py-3 rounded-xl border-2 font-display font-semibold text-sm transition-all ${
                  data.hasSolar === (opt === 'Yes')
                    ? 'border-teal-500 bg-teal-50 text-teal-700'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {data.hasDriveway && (
          <div className="animate-slide-up">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Can you charge from your home's mains electricity?
            </label>
            <div className="flex gap-3">
              {['Yes', 'No'].map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => onChange({ hasHomeCharging: opt === 'Yes' })}
                  className={`flex-1 py-3 rounded-xl border-2 font-display font-semibold text-sm transition-all ${
                    data.hasHomeCharging === (opt === 'Yes')
                      ? 'border-teal-500 bg-teal-50 text-teal-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            <Tooltip text="Your home electricity rate in pence per kWh. You can find this on your energy bill. We'll use 28p/kWh if you leave this blank.">
              Your electricity rate (pence per kWh)
            </Tooltip>
          </label>
          <input
            type="number"
            className="input-base"
            placeholder="e.g. 28 (leave blank for UK average)"
            min="5"
            max="100"
            value={data.electricityRate || ''}
            onChange={e => onChange({ electricityRate: e.target.value ? parseFloat(e.target.value) / 100 : null })}
          />
          <p className="text-xs text-slate-400 mt-1">Optional — default is 28p/kWh (UK average 2025)</p>
        </div>
      </div>
    </div>
  )
}
