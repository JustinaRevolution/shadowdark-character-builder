export default function GearStep({ characterClass, gear, selectedGear, onGearChange }) {
  function toggleItem(itemName) {
    if (selectedGear.includes(itemName)) {
      onGearChange(selectedGear.filter(g => g !== itemName))
    } else {
      onGearChange([...selectedGear, itemName])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-amber-300 mb-2">Equipment</h2>
        <p className="text-stone-400 text-sm">Your class starting gear is shown below. You may also add items from the full lists.</p>
      </div>

      <div className="bg-stone-800 border border-amber-800 rounded-lg p-4">
        <h3 className="font-semibold text-amber-200 mb-3">{characterClass.name} Starting Gear</h3>
        <ul className="space-y-1">
          {characterClass.starting_gear.map((item, i) => (
            <li key={i} className="text-stone-300 text-sm flex items-center gap-2">
              <span className="text-amber-600">•</span> {item}
            </li>
          ))}
        </ul>
      </div>

      {[
        { label: 'Weapons', items: gear.weapons, detail: i => `${i.damage}, ${i.cost_gp}gp` },
        { label: 'Armor', items: gear.armor, detail: i => `AC ${i.ac}, ${i.cost_gp}gp` },
        { label: 'Adventuring Gear', items: gear.adventuring_gear, detail: i => `${i.cost_gp}gp${i.slots ? `, ${i.slots} slot` : ''}` },
      ].map(({ label, items, detail }) => (
        <div key={label}>
          <h3 className="font-semibold text-amber-200 mb-2">{label}</h3>
          <div className="space-y-1">
            {items.map(item => (
              <button
                key={item.name}
                onClick={() => toggleItem(item.name)}
                className={`w-full text-left text-sm px-3 py-2 rounded border transition-colors ${
                  selectedGear.includes(item.name)
                    ? 'border-amber-400 bg-amber-950 text-amber-100'
                    : 'border-stone-700 bg-stone-800 text-stone-300 hover:border-stone-500'
                }`}
              >
                {item.name} <span className="text-stone-500">({detail(item)})</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
