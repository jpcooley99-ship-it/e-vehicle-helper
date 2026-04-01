import Tooltip from '../shared/Tooltip.jsx'

function YesNo({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {['Yes', 'No'].map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt === 'Yes')}
          className={`toggle-pill ${value === (opt === 'Yes') ? 'toggle-pill-on' : 'toggle-pill-off'}`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

export default function StepLocation({ data, onChange }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <p className="section-label mb-2">Step 1</p>
        <h2 className="font-display font-bold text-2xl text-navy-950 mb-1">About you</h2>
        <p className="text-slate-500 text-sm">Helps us tailor charging costs and charges to your situation.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-navy-800 mb-2">Your town or city</label>
          <input type="text" className="input-base" placeholder="e.g. Manchester"
            value={data.city || ''}
            onChange={e => onChange({ city: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-bold text-navy-800 mb-2">Do you have a driveway or off-street parking?</label>
          <YesNo value={data.hasDriveway} onChange={v => onChange({ hasDriveway: v })} />
        </div>

        <div>
          <label className="block text-sm font-bold text-navy-800 mb-2">Do you have solar panels?</label>
          <YesNo value={data.hasSolar} onChange={v => onChange({ hasSolar: v })} />
        </div>

        {data.hasDriveway && (
          <div className="animate-slide-up">
            <label className="block text-sm font-bold text-navy-800 mb-2">Can you charge from your home mains?</label>
            <YesNo value={data.hasHomeCharging} onChange={v => onChange({ hasHomeCharging: v })} />
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-navy-800 mb-2">
            <Tooltip text="Find this on your energy bill. We'll use 28p/kWh (UK average 2025) if you leave this blank.">
              Your electricity rate
            </Tooltip>
          </label>
          <div className="relative">
            <input type="number" className="input-base pr-16" placeholder="28"
              min="5" max="100"
              value={data.electricityRate ? Math.round(data.electricityRate * 100) : ''}
              onChange={e => onChange({ electricityRate: e.target.value ? parseFloat(e.target.value) / 100 : null })} />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">p/kWh</span>
          </div>
          <p className="text-xs text-slate-400 mt-1.5">Optional — leave blank to use UK average (28p/kWh)</p>
        </div>
      </div>
    </div>
  )
}
