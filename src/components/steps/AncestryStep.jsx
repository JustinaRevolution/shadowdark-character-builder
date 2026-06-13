export default function AncestryStep({ ancestries, selected, onSelect }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-300 mb-2">Choose Your Ancestry</h2>
      <p className="text-stone-400 mb-6">Your ancestry determines your innate traits and starting languages.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {ancestries.map(ancestry => (
          <button
            key={ancestry.name}
            data-testid="ancestry-card"
            onClick={() => onSelect(ancestry)}
            className={`p-4 rounded-lg border text-left transition-colors ${
              selected?.name === ancestry.name
                ? 'border-amber-400 bg-amber-950'
                : 'border-stone-600 bg-stone-800 hover:border-stone-400'
            }`}
          >
            <div className="font-semibold text-amber-100">{ancestry.name}</div>
            <div className="text-xs text-stone-400 mt-1">{ancestry.source}</div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-stone-800 border border-stone-600 rounded-lg p-4">
          <h3 className="font-bold text-amber-300 mb-3">{selected.name} Traits</h3>
          <ul className="space-y-2 mb-4">
            {selected.traits.map(t => (
              <li key={t.name}>
                <span className="font-semibold text-amber-100">{t.name}</span>:{' '}
                <span className="text-stone-300">{t.description}</span>
              </li>
            ))}
          </ul>
          <div className="text-sm text-stone-400">
            <span className="font-semibold text-stone-300">Languages:</span>{' '}
            {selected.languages.join(', ')}
          </div>
        </div>
      )}
    </div>
  )
}
