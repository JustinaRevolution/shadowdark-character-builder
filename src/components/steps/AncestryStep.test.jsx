import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AncestryStep from './AncestryStep'

const ancestries = [
  {
    name: 'Dwarf',
    traits: [{ name: 'Stout', description: 'Add CON modifier to HP each level.' }],
    languages: ['Common', 'Dwarvish'],
    source: 'V1',
  },
  {
    name: 'Elf',
    traits: [{ name: 'Farsight', description: '+1 to ranged attacks.' }],
    languages: ['Common', 'Elvish'],
    source: 'V1',
  },
]

test('renders all ancestry cards', () => {
  render(<AncestryStep ancestries={ancestries} selected={null} onSelect={() => {}} />)
  expect(screen.getByText('Dwarf')).toBeInTheDocument()
  expect(screen.getByText('Elf')).toBeInTheDocument()
})

test('calls onSelect with ancestry when card clicked', async () => {
  const onSelect = vi.fn()
  render(<AncestryStep ancestries={ancestries} selected={null} onSelect={onSelect} />)
  await userEvent.click(screen.getByText('Dwarf'))
  expect(onSelect).toHaveBeenCalledWith(ancestries[0])
})

test('selected ancestry is visually highlighted', () => {
  render(<AncestryStep ancestries={ancestries} selected={ancestries[0]} onSelect={() => {}} />)
  const card = screen.getByText('Dwarf').closest('[data-testid="ancestry-card"]')
  expect(card).toHaveClass('border-amber-400')
})

test('shows traits when ancestry selected', () => {
  render(<AncestryStep ancestries={ancestries} selected={ancestries[0]} onSelect={() => {}} />)
  expect(screen.getByText('Stout')).toBeInTheDocument()
  expect(screen.getByText('Add CON modifier to HP each level.')).toBeInTheDocument()
})
