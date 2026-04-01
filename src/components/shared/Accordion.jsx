import { useState } from 'react'

export default function Accordion({ title, icon, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className={`border-2 rounded-3xl overflow-hidden transition-colors duration-200 ${open ? 'border-navy-200' : 'border-slate-100'}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200 ${open ? 'bg-navy-50' : 'bg-white hover:bg-slate-50'}`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className="font-display font-bold text-navy-900 text-base">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform duration-250 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2 bg-white animate-slide-up">
          {children}
        </div>
      )}
    </div>
  )
}
