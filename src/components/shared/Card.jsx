export default function Card({ children, className = '', accent = false }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border ${
        accent ? 'border-teal-200 ring-1 ring-teal-100' : 'border-slate-100'
      } p-6 ${className}`}
    >
      {children}
    </div>
  )
}
