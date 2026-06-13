import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SpellsStep from './SpellsStep'

const characterClass = { name: 'Wizard', spells_known_at_creation: 3 }
const spells = [
  { name: 'Charm Person', tier: 1, class: 'Wizard', duration: '1 hour', range: 'Near', description: 'Target treats you as friend.', source: 'V1' },
  { name: 'Magic Missile', tier: 1, class: 'Wizard', duration: 'Instant', range: 'Far', description: 'Deal 1d4 force damage.', source: 'V1' },
  { name: 'Shield', tier: 1, class: 'Wizard', duration: '1 round', range: 'Self', description: '+2 AC until your next turn.', source: 'V1' },
]

test('renders tier 1 spells for the class', () => {
  render(<SpellsStep characterClass={characterClass} spells={spells} selectedSpells={[]} onSpellsChange={() => {}} />)
  expect(screen.getByText('Charm Person')).toBeInTheDocument()
  expect(screen.getByText('Magic Missile')).toBeInTheDocument()
})

test('shows how many spells to pick', () => {
  render(<SpellsStep characterClass={characterClass} spells={spells} selectedSpells={[]} onSpellsChange={() => {}} />)
  expect(screen.getByText(/choose 3/i)).toBeInTheDocument()
})

test('calls onSpellsChange when spell selected', async () => {
  const onSpellsChange = vi.fn()
  render(<SpellsStep characterClass={characterClass} spells={spells} selectedSpells={[]} onSpellsChange={onSpellsChange} />)
  await userEvent.click(screen.getByText('Charm Person'))
  expect(onSpellsChange).toHaveBeenCalledWith([spells[0]])
})

test('cannot select more than spells_known_at_creation', async () => {
  const onSpellsChange = vi.fn()
  const selected = [spells[0], spells[1]]
  const limitedClass = { name: 'Wizard', spells_known_at_creation: 2 }
  render(<SpellsStep characterClass={limitedClass} spells={spells} selectedSpells={selected} onSpellsChange={onSpellsChange} />)
  await userEvent.click(screen.getByText('Shield'))
  expect(onSpellsChange).not.toHaveBeenCalled()
})
