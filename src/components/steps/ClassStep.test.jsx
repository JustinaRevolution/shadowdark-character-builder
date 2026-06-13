import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ClassStep from './ClassStep'

const classes = [
  {
    name: 'Fighter',
    hit_die: 'd8',
    armor_proficiencies: ['all armor'],
    weapon_proficiencies: ['all weapons'],
    class_features: [{ name: 'Hauler', description: 'Add CON modifier to gear slots.' }],
    spellcasting: false,
    source: 'V1',
  },
  {
    name: 'Wizard',
    hit_die: 'd4',
    armor_proficiencies: [],
    weapon_proficiencies: ['daggers', 'staves'],
    class_features: [{ name: 'Magic Items', description: 'You can read and use magic scrolls.' }],
    spellcasting: true,
    spell_stat: 'INT',
    source: 'V1',
  },
]

test('renders all class cards', () => {
  render(<ClassStep classes={classes} selected={null} onSelect={() => {}} />)
  expect(screen.getByText('Fighter')).toBeInTheDocument()
  expect(screen.getByText('Wizard')).toBeInTheDocument()
})

test('spellcasting classes show magic indicator', () => {
  render(<ClassStep classes={classes} selected={null} onSelect={() => {}} />)
  expect(screen.getByTestId('spellcaster-badge')).toBeInTheDocument()
})

test('calls onSelect when clicked', async () => {
  const onSelect = vi.fn()
  render(<ClassStep classes={classes} selected={null} onSelect={onSelect} />)
  await userEvent.click(screen.getByText('Fighter'))
  expect(onSelect).toHaveBeenCalledWith(classes[0])
})

test('shows class features when selected', () => {
  render(<ClassStep classes={classes} selected={classes[0]} onSelect={() => {}} />)
  expect(screen.getByText('Hauler')).toBeInTheDocument()
})
