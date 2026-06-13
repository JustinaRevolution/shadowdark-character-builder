export default function SpellsStep({ characterClass, spells, selectedSpells, onSpellsChange }) {
  const tier1Spells = spells.filter(s => s.class.split(', ').includes(characterClass.name) && s.tier === 1)
  const limit = characterClass.spells_known_at_creation

  function toggleSpell(spell) {
    if (selectedSpells.find(s => s.name === spell.name)) {
      onSpellsChange(selectedSpells.filter(s => s.name !== spell.name))
    } else if (selectedSpells.length < limit) {
      onSpellsChange([...selectedSpells, spell])
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-300 mb-2">Starting Spells</h2>
      <p className="text-stone-400 mb-6">
        Choose {limit} starting spell{limit !== 1 ? 's' : ''} from the {characterClass.name} tier 1 list.{' '}
        <span className="text-amber-300">{selectedSpells.length}/{limit} chosen.</span>
      </p>

      <div className="space-y-2">
        {tier1Spells.map(spell => {
          const isSelected = selectedSpells.some(s => s.name === spell.name)
          const isDisabled = !isSelected && selectedSpells.length >= limit
          return (
            <button
              key={spell.name}
              onClick={() => toggleSpell(spell)}
              disabled={isDisabled}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                isSelected
                  ? 'border-amber-400 bg-amber-950'
                  : isDisabled
                  ? 'border-stone-700 bg-stone-900 opacity-40'
                  : 'border-stone-600 bg-stone-800 hover:border-stone-400'
              }`}
            >
              <div className="flex justify-between">
                <span className="font-semibold text-amber-100">{spell.name}</span>
                <span className="text-xs text-stone-400">{spell.duration} · {spell.range}</span>
              </div>
              <div className="text-sm text-stone-300 mt-1">{spell.description}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
