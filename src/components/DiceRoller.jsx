import { useState } from 'react'

function rollD6() {
  return Math.ceil(Math.random() * 6)
}

export default function DiceRoller({ onRoll }) {
  const [value, setValue] = useState(null)
  const [rolling, setRolling] = useState(false)

  function roll() {
    setRolling(true)
    let ticks = 0
    const interval = setInterval(() => {
      setValue(rollD6())
      ticks++
      if (ticks >= 8) {
        clearInterval(interval)
        const final = rollD6()
        setValue(final)
        setRolling(false)
        onRoll?.(final)
      }
    }, 60)
  }

  return (
    <button
      onClick={roll}
      disabled={rolling}
      className="w-12 h-12 bg-stone-700 hover:bg-stone-600 border border-stone-500 rounded text-xl font-bold text-amber-100 transition-colors disabled:opacity-50"
    >
      {value ?? '?'}
    </button>
  )
}
