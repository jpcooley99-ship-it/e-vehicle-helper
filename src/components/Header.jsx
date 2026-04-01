export default function Header() {
  return (
    <header className="bg-navy-950 text-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-5 py-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-coral-500 rounded-lg flex items-center justify-center text-base font-bold">
          ⚡
        </div>
        <span className="font-display font-bold text-lg tracking-tight">e-Car Helper</span>
        <span className="hidden sm:inline text-navy-400 text-sm ml-1">· UK Electric Vehicle Cost Comparison</span>
      </div>
    </header>
  )
}
