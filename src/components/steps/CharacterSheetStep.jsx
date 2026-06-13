function modifierStr(score) {
  const mod = Math.floor((score - 10) / 2)
  return mod >= 0 ? `+${mod}` : `${mod}`
}

function StatBox({ stat, score }) {
  return (
    <div className="flex flex-col items-center bg-stone-800 border border-stone-600 rounded-lg p-3">
      <span className="text-xs text-stone-400 font-medium">{stat}</span>
      <span className="text-2xl font-bold text-amber-100">{score}</span>
      <span className="text-sm text-amber-400">{modifierStr(score)}</span>
    </div>
  )
}

export default function CharacterSheetStep({ character, onNameChange, onStartOver }) {
  const { name, ancestry, characterClass, alignment, background, abilityScores, gear, spells } = character
  const stats = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']

  return (
    <div className="space-y-8 print:text-black print:bg-white">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-amber-300 print:text-black">Character Sheet</h2>
        <div className="flex gap-3 print:hidden">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-stone-700 hover:bg-stone-600 border border-stone-500 rounded text-sm text-amber-100"
          >
            Print
          </button>
          <button
            onClick={onStartOver}
            className="px-4 py-2 bg-red-900 hover:bg-red-800 border border-red-700 rounded text-sm text-red-100"
          >
            Start Over
          </button>
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm text-stone-400 mb-1">Character Name</label>
        <input
          type="text"
          value={name}
          onChange={e => onNameChange(e.target.value)}
          placeholder="Enter name..."
          className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-amber-100 text-xl font-semibold placeholder-stone-600 focus:outline-none focus:border-amber-500 print:border-stone-400 print:text-black"
        />
      </div>

      {/* Identity row */}
      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          { label: 'Ancestry', value: ancestry?.name },
          { label: 'Class', value: characterClass?.name },
          { label: 'Alignment', value: alignment?.name },
        ].map(({ label, value }) => (
          <div key={label} className="bg-stone-800 border border-stone-600 rounded-lg p-3 print:border-stone-400">
            <div className="text-xs text-stone-400 mb-1">{label}</div>
            <div className="font-bold text-amber-100 print:text-black">{value ?? '—'}</div>
          </div>
        ))}
      </div>

      {/* HP and Hit Die */}
      {characterClass && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-stone-800 border border-stone-600 rounded-lg p-3 text-center">
            <div className="text-xs text-stone-400 mb-1">Hit Die</div>
            <div className="font-bold text-amber-100 text-xl">{characterClass.hit_die}</div>
          </div>
          <div className="bg-stone-800 border border-stone-600 rounded-lg p-3 text-center">
            <div className="text-xs text-stone-400 mb-1">HP at 1st Level</div>
            <div className="font-bold text-amber-100 text-xl">Max + {modifierStr(abilityScores.CON)} CON</div>
          </div>
        </div>
      )}

      {/* Ability Scores */}
      <div>
        <h3 className="text-lg font-semibold text-amber-200 mb-3 print:text-black">Ability Scores</h3>
        <div className="grid grid-cols-6 gap-2">
          {stats.map(stat => (
            <StatBox key={stat} stat={stat} score={abilityScores[stat]} />
          ))}
        </div>
      </div>

      {/* Background */}
      {background && (
        <div>
          <h3 className="text-lg font-semibold text-amber-200 mb-2 print:text-black">Background</h3>
          <div className="bg-stone-800 border border-stone-600 rounded-lg p-3">
            <div className="font-semibold text-amber-100">{background.name}</div>
            <div className="text-sm text-stone-400 mt-1">{background.description}</div>
          </div>
        </div>
      )}

      {/* Class Features */}
      {characterClass?.class_features?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-amber-200 mb-2 print:text-black">Class Features</h3>
          <div className="space-y-2">
            {characterClass.class_features.map(f => (
              <div key={f.name} className="bg-stone-800 border border-stone-600 rounded-lg p-3">
                <div className="font-semibold text-amber-100">{f.name}</div>
                <div className="text-sm text-stone-400 mt-1">{f.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ancestry Traits */}
      {ancestry?.traits?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-amber-200 mb-2 print:text-black">Ancestry Traits</h3>
          <div className="space-y-2">
            {ancestry.traits.map(t => (
              <div key={t.name} className="bg-stone-800 border border-stone-600 rounded-lg p-3">
                <div className="font-semibold text-amber-100">{t.name}</div>
                <div className="text-sm text-stone-400 mt-1">{t.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {ancestry?.languages?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-amber-200 mb-2 print:text-black">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {ancestry.languages.map(lang => (
              <span key={lang} className="px-2 py-1 bg-stone-700 border border-stone-600 rounded text-sm text-stone-300">{lang}</span>
            ))}
          </div>
        </div>
      )}

      {/* Gear */}
      <div>
        <h3 className="text-lg font-semibold text-amber-200 mb-2 print:text-black">Equipment</h3>
        {characterClass?.starting_gear?.length > 0 && (
          <div className="mb-3">
            <div className="text-xs text-stone-500 mb-1">Starting Gear</div>
            <ul className="space-y-1">
              {characterClass.starting_gear.map((item, i) => (
                <li key={i} className="text-stone-300 text-sm">• {item}</li>
              ))}
            </ul>
          </div>
        )}
        {gear.length > 0 && (
          <div>
            <div className="text-xs text-stone-500 mb-1">Additional Gear</div>
            <ul className="space-y-1">
              {gear.map((item, i) => (
                <li key={i} className="text-stone-300 text-sm">• {item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Spells */}
      {spells.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-amber-200 mb-2 print:text-black">Spells</h3>
          <div className="space-y-2">
            {spells.map(spell => (
              <div key={spell.name} className="bg-stone-800 border border-stone-600 rounded-lg p-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-amber-100">{spell.name}</span>
                  <span className="text-xs text-stone-400">Tier {spell.tier} · {spell.duration} · {spell.range}</span>
                </div>
                <div className="text-sm text-stone-400 mt-1">{spell.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
