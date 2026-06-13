import { renderHook, act } from '@testing-library/react'
import { useCharacter } from './useCharacter'

test('initializes with null choices', () => {
  const { result } = renderHook(() => useCharacter())
  expect(result.current.character.ancestry).toBeNull()
  expect(result.current.character.characterClass).toBeNull()
  expect(result.current.character.alignment).toBeNull()
  expect(result.current.character.background).toBeNull()
  expect(result.current.character.spells).toEqual([])
  expect(result.current.character.gear).toEqual([])
  expect(result.current.character.name).toBe('')
})

test('setField updates a single field', () => {
  const { result } = renderHook(() => useCharacter())
  act(() => result.current.setField('name', 'Bryn'))
  expect(result.current.character.name).toBe('Bryn')
  expect(result.current.character.ancestry).toBeNull()
})

test('reset returns to initial state', () => {
  const { result } = renderHook(() => useCharacter())
  act(() => result.current.setField('name', 'Bryn'))
  act(() => result.current.reset())
  expect(result.current.character.name).toBe('')
})

test('setAbilityScore updates one score', () => {
  const { result } = renderHook(() => useCharacter())
  act(() => result.current.setAbilityScore('STR', 14))
  expect(result.current.character.abilityScores.STR).toBe(14)
  expect(result.current.character.abilityScores.DEX).toBe(8)
})
