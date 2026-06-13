import { getCost, totalSpent, remaining, canIncrease, canDecrease } from './pointBuy'

const allEights = { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 }
const maxed = { STR: 15, DEX: 15, CON: 8, INT: 8, WIS: 8, CHA: 8 }

describe('getCost', () => {
  test('8 costs 0', () => expect(getCost(8)).toBe(0))
  test('14 costs 7', () => expect(getCost(14)).toBe(7))
  test('15 costs 9', () => expect(getCost(15)).toBe(9))
})

describe('totalSpent', () => {
  test('all 8s costs 0', () => expect(totalSpent(allEights)).toBe(0))
  test('two 15s costs 18', () => expect(totalSpent(maxed)).toBe(18))
})

describe('remaining', () => {
  test('all 8s has 27 remaining', () => expect(remaining(allEights)).toBe(27))
  test('two 15s has 9 remaining', () => expect(remaining(maxed)).toBe(9))
})

describe('canIncrease', () => {
  test('can increase 8 when budget available', () => expect(canIncrease(allEights, 'STR')).toBe(true))
  test('cannot increase 15', () => expect(canIncrease({ ...allEights, STR: 15 }, 'STR')).toBe(false))
  test('cannot increase when insufficient budget', () => {
    const scores = { STR: 15, DEX: 15, CON: 15, INT: 8, WIS: 8, CHA: 8 }
    expect(canIncrease(scores, 'INT')).toBe(false)
  })
})

describe('canDecrease', () => {
  test('can decrease 9', () => expect(canDecrease({ ...allEights, STR: 9 }, 'STR')).toBe(true))
  test('cannot decrease 8', () => expect(canDecrease(allEights, 'STR')).toBe(false))
})
