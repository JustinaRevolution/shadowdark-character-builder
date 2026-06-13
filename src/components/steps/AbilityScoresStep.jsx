import DiceRoller from '../DiceRoller'
import { canIncrease, canDecrease, remaining } from '../../utils/pointBuy'

const STAT_LABELS = { STR: 'Strength', DEX: 'Dexterity', CON: 'Constitution', INT: 'Intelligence', WIS: 'Wisdom', CHA: 'Charisma' }

function modifierStr(score) {
  const mod = Math.floor((score - 10) / 2)
  return mod >= 0 ? `+${mod}` : `${mod}`
}

export default function AbilityScoresStep({ statsConfig, scores, method, onMethodChange, onScoreChange }) {
  const TABS = [
    { id: 'roll', label: 'Roll 3d6' },
    { id: 'array', label: 'Standard Array' },
    { id: 'pointbuy', label: 'Point Buy' },
  ]
  const stats = statsConfig.stats

  return (
    <div>
      <h2 className="text-2xl font-bold text-amber-300 mb-6">Ability Scores</h2>

      <div className="flex gap-2 mb-6">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onMethodChange(tab.id)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              method === tab.id ? 'bg-amber-600 text-stone-900' : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {method === 'roll' && (
        <div className="space-y-3">
          <p className="text-stone-400 text-sm mb-4">Roll 3d6 for each ability score in order.</p>
          {stats.map(stat => (
            <div key={stat} className="flex items-center gap-4">
              <span className="w-12 font-bold text-amber-200">{stat}</span>
              <DiceRoller onRoll={v => onScoreChange(stat, v)} />
              <span className="text-xl font-bold text-amber-100 w-8">{scores[stat] ?? '—'}</span>
              <span className="text-stone-400">({modifierStr(scores[stat] ?? 10)})</span>
              <span className="text-xs text-stone-500">{STAT_LABELS[stat]}</span>
            </div>
          ))}
        </div>
      )}

      {method === 'array' && (
        <div className="space-y-3">
          <p className="text-stone-400 text-sm mb-4">Assign these values: {statsConfig.standard_array.join(', ')}</p>
          {stats.map(stat => (
            <div key={stat} className="flex items-center gap-4">
              <span className="w-12 font-bold text-amber-200">{stat}</span>
              <select
                value={scores[stat] ?? ''}
                onChange={e => onScoreChange(stat, Number(e.target.value))}
                className="bg-stone-700 border border-stone-500 rounded px-2 py-1 text-amber-100"
              >
                <option value="">—</option>
                {statsConfig.standard_array.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
              <span className="text-stone-400">({modifierStr(scores[stat] ?? 10)})</span>
              <span className="text-xs text-stone-500">{STAT_LABELS[stat]}</span>
            </div>
          ))}
        </div>
      )}

      {method === 'pointbuy' && (
        <div>
          <p className="text-stone-400 text-sm mb-2">
            Budget: <span className="text-amber-300 font-bold">{remaining(scores)}</span> / {statsConfig.point_buy.budget} points remaining
          </p>
          <div className="space-y-3 mt-4">
            {stats.map(stat => (
              <div key={stat} className="flex items-center gap-4">
                <span className="w-12 font-bold text-amber-200">{stat}</span>
                <button
                  onClick={() => canDecrease(scores, stat) && onScoreChange(stat, scores[stat] - 1)}
                  disabled={!canDecrease(scores, stat)}
                  className="w-8 h-8 bg-stone-700 hover:bg-stone-600 rounded disabled:opacity-30"
                >−</button>
                <span className="text-xl font-bold text-amber-100 w-8 text-center">{scores[stat]}</span>
                <button
                  onClick={() => canIncrease(scores, stat) && onScoreChange(stat, scores[stat] + 1)}
                  disabled={!canIncrease(scores, stat)}
                  className="w-8 h-8 bg-stone-700 hover:bg-stone-600 rounded disabled:opacity-30"
                >+</button>
                <span className="text-stone-400">({modifierStr(scores[stat])})</span>
                <span className="text-xs text-stone-500">{STAT_LABELS[stat]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
