export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-sm text-slate-400 font-body">
          ⚠️ All figures are estimates for guidance only. Actual costs depend on your driving habits, energy tariffs, insurance quotes, and vehicle condition. Always check current prices before making financial decisions.
        </p>
        <p className="text-xs text-slate-300 mt-3">
          e-Car Helper · UK Electric Vehicle Cost Comparison · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
