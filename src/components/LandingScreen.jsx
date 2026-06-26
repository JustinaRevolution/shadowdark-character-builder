const SETTINGS = [
  {
    key: 'shadowdark',
    title: 'Shadowdark RPG',
    subtitle: 'Core rules + supplements',
    description: 'Build a character using the official Shadowdark ruleset, including Letters from the Dark and other supplements.',
    accent: 'amber',
  },
  {
    key: 'palladium',
    title: 'Palladium Fantasy',
    subtitle: 'Shadowdark adaptation',
    description: 'Play the races and classes of the Palladium Fantasy world, adapted for the Shadowdark system.',
    accent: 'orange',
  },
]

export default function LandingScreen({ onSelect }) {
  return (
    <div className="min-h-screen bg-stone-900 text-amber-100 flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-amber-400 mb-3">Shadowdark</h1>
        <p className="text-stone-400 text-lg">Character Creator</p>
      </div>

      <p className="text-stone-300 mb-8 text-center">Choose your ruleset to begin.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {SETTINGS.map(s => (
          <button
            key={s.key}
            onClick={() => onSelect(s.key)}
            className="group p-8 rounded-xl border border-stone-600 bg-stone-800 hover:border-amber-400 hover:bg-stone-750 text-left transition-all"
          >
            <div className="text-2xl font-bold text-amber-300 mb-1 group-hover:text-amber-200">
              {s.title}
            </div>
            <div className="text-sm text-amber-500 mb-4 font-medium">{s.subtitle}</div>
            <p className="text-stone-400 text-sm leading-relaxed">{s.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
