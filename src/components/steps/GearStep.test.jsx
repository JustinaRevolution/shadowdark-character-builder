import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GearStep from './GearStep'

const characterClass = {
  name: 'Fighter',
  starting_gear: ['Longsword', 'Shield', 'Chain mail', '5 gp'],
}
const gear = {
  weapons: [{ name: 'Dagger', damage: 'd4', cost_gp: 1, properties: [], source: 'V1' }],
  armor: [{ name: 'Leather', ac: 11, cost_gp: 10, properties: [], source: 'V1' }],
  adventuring_gear: [{ name: 'Rope (50 ft)', cost_gp: 1, slots: 1, source: 'V1' }],
}

test('shows class starting gear', () => {
  render(<GearStep characterClass={characterClass} gear={gear} selectedGear={[]} onGearChange={() => {}} />)
  expect(screen.getByText('Longsword')).toBeInTheDocument()
  expect(screen.getByText('Chain mail')).toBeInTheDocument()
})

test('shows full gear sections', () => {
  render(<GearStep characterClass={characterClass} gear={gear} selectedGear={[]} onGearChange={() => {}} />)
  expect(screen.getByText('Dagger')).toBeInTheDocument()
  expect(screen.getByText('Leather')).toBeInTheDocument()
  expect(screen.getByText('Rope (50 ft)')).toBeInTheDocument()
})
