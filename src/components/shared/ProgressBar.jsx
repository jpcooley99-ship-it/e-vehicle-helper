export default function ProgressBar({ currentStep, totalSteps, labels }) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-3">
        {labels.map((label, i) => {
          const n = i + 1
          const done   = n < currentStep
          const active = n === currentStep
          return (
            <div key={label} className="flex flex-col items-center gap-1.5" style={{ flex: 1 }}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold transition-all duration-300 ${
                done   ? 'bg-coral-500 text-white'
                : active ? 'bg-navy-800 text-white ring-4 ring-navy-200'
                : 'bg-slate-100 text-slate-400'
              }`}>
                {done ? '✓' : n}
              </div>
              <span className={`text-xs font-body hidden sm:block text-center leading-tight ${
                active ? 'text-navy-800 font-semibold' : 'text-slate-400'
              }`}>
                {label}
              </span>
            </div>
          )
        })}
      </div>
      <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-coral-500 rounded-full transition-all duration-500"
          style={{ width: `${Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)}%` }}
        />
      </div>
    </div>
  )
}
