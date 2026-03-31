export default function Header() {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center text-white text-lg">
          ⚡
        </div>
        <div>
          <h1 className="font-display font-bold text-xl text-slate-800 leading-none">
            e-Car Helper
          </h1>
          <p className="text-xs text-slate-400 font-body mt-0.5">UK Electric Vehicle Cost Comparison</p>
        </div>
      </div>
    </header>
  )
}
