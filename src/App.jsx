import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import WizardContainer from './components/Wizard/WizardContainer.jsx'
import ResultsDashboard from './components/Results/ResultsDashboard.jsx'

const SCREEN = {
  WIZARD: 'wizard',
  CALCULATING: 'calculating',
  RESULTS: 'results',
}

function CalculatingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex flex-col items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
          <span className="text-4xl">⚡</span>
        </div>
        <h2 className="font-display font-bold text-2xl text-slate-800 mb-2">Crunching the numbers…</h2>
        <p className="text-slate-500 text-sm">Calculating your personalised cost comparison</p>
        <div className="mt-6 flex justify-center gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState(SCREEN.WIZARD)
  const [wizardData, setWizardData] = useState(null)

  function handleWizardComplete(data) {
    setWizardData(data)
    setScreen(SCREEN.CALCULATING)
    setTimeout(() => setScreen(SCREEN.RESULTS), 1800)
  }

  function handleStartOver() {
    setWizardData(null)
    setScreen(SCREEN.WIZARD)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {screen === SCREEN.WIZARD && (
          <WizardContainer onComplete={handleWizardComplete} />
        )}
        {screen === SCREEN.CALCULATING && (
          <CalculatingScreen />
        )}
        {screen === SCREEN.RESULTS && wizardData && (
          <ResultsDashboard wizardData={wizardData} onStartOver={handleStartOver} />
        )}
      </main>
      {screen !== SCREEN.CALCULATING && <Footer />}
    </div>
  )
}
