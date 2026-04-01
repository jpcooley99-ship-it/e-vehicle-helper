export default function Card({ children, className = '', dark = false }) {
  return (
    <div className={`rounded-3xl border p-6 ${
      dark
        ? 'bg-navy-900 border-navy-700 text-white'
        : 'bg-white border-slate-100 shadow-sm'
    } ${className}`}>
      {children}
    </div>
  )
}
