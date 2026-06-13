import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BackgroundStep from './BackgroundStep'

const backgrounds = [
  { roll: 1, name: 'Urchin', description: 'You grew up on the streets.', source: 'V1' },
  { roll: 2, name: 'Soldier', description: 'You served in an army.', source: 'V1' },
]

const alignments = [
  { name: 'Lawful', description: 'You believe in order and duty.' },
  { name: 'Neutral', description: 'You follow your own moral compass.' },
  { name: 'Chaotic', description: 'You prize freedom above all.' },
]

test('renders alignment options', () => {
  render(<BackgroundStep backgrounds={backgrounds} alignments={alignments} selectedBackground={null} selectedAlignment={null} onSelectBackground={() => {}} onSelectAlignment={() => {}} />)
  expect(screen.getByText('Lawful')).toBeInTheDocument()
  expect(screen.getByText('Neutral')).toBeInTheDocument()
  expect(screen.getByText('Chaotic')).toBeInTheDocument()
})

test('calls onSelectAlignment when alignment chosen', async () => {
  const onSelectAlignment = vi.fn()
  render(<BackgroundStep backgrounds={backgrounds} alignments={alignments} selectedBackground={null} selectedAlignment={null} onSelectBackground={() => {}} onSelectAlignment={onSelectAlignment} />)
  await userEvent.click(screen.getByText('Lawful'))
  expect(onSelectAlignment).toHaveBeenCalledWith(alignments[0])
})

test('shows background list for manual pick', () => {
  render(<BackgroundStep backgrounds={backgrounds} alignments={alignments} selectedBackground={null} selectedAlignment={null} onSelectBackground={() => {}} onSelectAlignment={() => {}} />)
  expect(screen.getByText('Urchin')).toBeInTheDocument()
})

test('highlights selected background', () => {
  render(<BackgroundStep backgrounds={backgrounds} alignments={alignments} selectedBackground={backgrounds[0]} selectedAlignment={null} onSelectBackground={() => {}} onSelectAlignment={() => {}} />)
  const btn = screen.getByText('Urchin').closest('button')
  expect(btn).toHaveClass('border-amber-400')
})
