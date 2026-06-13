import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AbilityScoresStep from './AbilityScoresStep'

const statsConfig = {
  standard_array: [15, 14, 13, 12, 10, 8],
  point_buy: { budget: 27, min: 8, max: 15, costs: { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 } },
  roll_method: '3d6',
  stats: ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'],
}
const scores = { STR: 8, DEX: 8, CON: 8, INT: 8, WIS: 8, CHA: 8 }

test('renders all six stats', () => {
  render(<AbilityScoresStep statsConfig={statsConfig} scores={scores} method="roll" onMethodChange={() => {}} onScoreChange={() => {}} />)
  for (const stat of ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']) {
    expect(screen.getByText(stat)).toBeInTheDocument()
  }
})

test('shows three method tabs', () => {
  render(<AbilityScoresStep statsConfig={statsConfig} scores={scores} method="roll" onMethodChange={() => {}} onScoreChange={() => {}} />)
  expect(screen.getByText('Roll 3d6')).toBeInTheDocument()
  expect(screen.getByText('Standard Array')).toBeInTheDocument()
  expect(screen.getByText('Point Buy')).toBeInTheDocument()
})

test('calls onMethodChange when tab clicked', async () => {
  const onMethodChange = vi.fn()
  render(<AbilityScoresStep statsConfig={statsConfig} scores={scores} method="roll" onMethodChange={onMethodChange} onScoreChange={() => {}} />)
  await userEvent.click(screen.getByText('Point Buy'))
  expect(onMethodChange).toHaveBeenCalledWith('pointbuy')
})
