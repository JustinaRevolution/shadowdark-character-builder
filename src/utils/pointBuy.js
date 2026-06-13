const COSTS = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 }
const BUDGET = 27

export function getCost(score) {
  return COSTS[score] ?? 0
}

export function totalSpent(scores) {
  return Object.values(scores).reduce((sum, s) => sum + getCost(s), 0)
}

export function remaining(scores) {
  return BUDGET - totalSpent(scores)
}

export function canIncrease(scores, stat) {
  const next = scores[stat] + 1
  if (next > 15) return false
  return remaining(scores) >= getCost(next) - getCost(scores[stat])
}

export function canDecrease(scores, stat) {
  return scores[stat] > 8
}
