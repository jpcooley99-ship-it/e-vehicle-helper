export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-400 mt-0">
      <div className="max-w-4xl mx-auto px-5 py-8 text-center">
        <p className="text-sm">
          All figures are estimates for guidance only. Actual costs depend on your driving habits, energy tariffs, insurance quotes, and vehicle condition. Always check current prices before making financial decisions.
        </p>
        <p className="text-xs text-navy-600 mt-3">
          e-Car Helper · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
