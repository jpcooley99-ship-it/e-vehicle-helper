export default function ProgressBar({ currentStep, totalSteps, labels }) {
  const pct = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100)

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {labels.map((label, i) => {
          const stepNum = i + 1
          const isActive = stepNum === currentStep
          const isDone = stepNum < currentStep
          return (
            <div key={label} className="flex flex-col items-center gap-1" style={{ flex: 1 }}>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-bold transition-all duration-300 ${
                  isDone
                    ? 'bg-teal-600 text-white'
                    : isActive
                    ? 'bg-teal-600 text-white ring-4 ring-teal-100'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isDone ? '✓' : stepNum}
              </div>
              <span
                className={`text-xs font-body hidden sm:block text-center ${
                  isActive ? 'text-teal-700 font-semibold' : 'text-slate-400'
                }`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
