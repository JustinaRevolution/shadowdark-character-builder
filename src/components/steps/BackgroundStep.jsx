export default function BackgroundStep({
  backgrounds, alignments, selectedBackground, selectedAlignment,
  onSelectBackground, onSelectAlignment,
}) {
  function rollBackground() {
    const roll = Math.ceil(Math.random() * 20)
    const match = backgrounds.find(b => b.roll === roll) ?? backgrounds[backgrounds.length - 1]
    onSelectBackground(match)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-amber-300 mb-2">Background & Alignment</h2>

      <div>
        <h3 className="text-lg font-semibold text-amber-200 mb-3">Alignment</h3>
        <div className="grid grid-cols-3 gap-3">
          {alignments.map(a => (
            <button
              key={a.name}
              onClick={() => onSelectAlignment(a)}
              className={`p-3 rounded-lg border text-left transition-colors ${
                selectedAlignment?.name === a.name
                  ? 'border-amber-400 bg-amber-950'
                  : 'border-stone-600 bg-stone-800 hover:border-stone-400'
              }`}
            >
              <div className="font-semibold text-amber-100">{a.name}</div>
              <div className="text-xs text-stone-400 mt-1">{a.description}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-amber-200">Background</h3>
          <button
            onClick={rollBackground}
            className="px-3 py-1 bg-stone-700 hover:bg-stone-600 border border-stone-500 rounded text-sm text-amber-100 transition-colors"
          >
            Roll d20
          </button>
        </div>
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {backgrounds.map(b => (
            <button
              key={b.roll}
              onClick={() => onSelectBackground(b)}
              className={`w-full p-2 rounded border text-left text-sm transition-colors ${
                selectedBackground?.roll === b.roll
                  ? 'border-amber-400 bg-amber-950'
                  : 'border-transparent hover:border-stone-600 bg-stone-800'
              }`}
            >
              <span className="text-stone-500 w-8 inline-block">{b.roll}.</span>
              <span className="font-semibold text-amber-100">{b.name}</span>
              <span className="text-stone-400 ml-2">{b.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
