export default function ClassStep({ classes, selected, onSelect }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-300 mb-2">Choose Your Class</h2>
      <p className="text-stone-400 mb-6">Your class defines your abilities and how you fight or cast.</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {classes.map(cls => (
          <button
            key={cls.name}
            onClick={() => onSelect(cls)}
            className={`p-4 rounded-lg border text-left transition-colors ${
              selected?.name === cls.name
                ? 'border-amber-400 bg-amber-950'
                : 'border-stone-600 bg-stone-800 hover:border-stone-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-amber-100">{cls.name}</span>
              {cls.spellcasting && (
                <span data-testid="spellcaster-badge" className="text-xs bg-indigo-900 text-indigo-300 px-1 rounded">
                  Magic
                </span>
              )}
            </div>
            <div className="text-xs text-stone-400">HD {cls.hit_die}</div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-stone-800 border border-stone-600 rounded-lg p-4 space-y-3">
          <div>
            <span className="text-sm font-semibold text-stone-300">Armor:</span>{' '}
            <span className="text-sm text-stone-400">
              {selected.armor_proficiencies.length ? selected.armor_proficiencies.join(', ') : 'None'}
            </span>
          </div>
          <div>
            <span className="text-sm font-semibold text-stone-300">Weapons:</span>{' '}
            <span className="text-sm text-stone-400">{selected.weapon_proficiencies.join(', ')}</span>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-300 mb-1">Class Features</h4>
            <ul className="space-y-1">
              {selected.class_features.map(f => (
                <li key={f.name} className="text-sm">
                  <span className="font-semibold text-amber-100">{f.name}</span>
                  <span>:</span>{' '}
                  <span className="text-stone-300">{f.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
