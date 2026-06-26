import { useState } from 'react'

const INITIAL_SCORES = { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 }

const INITIAL = {
  name: '',
  level: 1,
  ancestry: null,
  ancestryTrait: null,
  characterClass: null,
  alignment: null,
  background: null,
  abilityScores: { ...INITIAL_SCORES },
  abilityScoreMethod: 'roll',
  gear: [],
  spells: [],
}

export function useCharacter() {
  const [character, setCharacter] = useState(INITIAL)

  function setField(field, value) {
    setCharacter(prev => ({ ...prev, [field]: value }))
  }

  function setAbilityScore(stat, value) {
    setCharacter(prev => ({
      ...prev,
      abilityScores: { ...prev.abilityScores, [stat]: value },
    }))
  }

  function reset() {
    setCharacter({ ...INITIAL, abilityScores: { ...INITIAL_SCORES } })
  }

  return { character, setField, setAbilityScore, reset }
}
