import { useState } from 'react'

export default function Tooltip({ text, children }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-flex items-center gap-1">
      {children}
      <button
        type="button"
        className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 text-xs flex items-center justify-center hover:bg-navy-100 hover:text-navy-700 transition-colors"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-label="More information"
      >?</button>
      {open && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-navy-950 text-white text-xs rounded-xl px-3 py-2 z-50 shadow-xl pointer-events-none">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-navy-950" />
        </span>
      )}
    </span>
  )
}
