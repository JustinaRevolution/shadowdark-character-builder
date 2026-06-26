import { useState } from 'react'
import { useCharacter } from './hooks/useCharacter'
import ProgressBar from './components/ProgressBar'
import LandingScreen from './components/LandingScreen'
import AncestryStep from './components/steps/AncestryStep'
import ClassStep from './components/steps/ClassStep'
import BackgroundStep from './components/steps/BackgroundStep'
import AbilityScoresStep from './components/steps/AbilityScoresStep'
import GearStep from './components/steps/GearStep'
import SpellsStep from './components/steps/SpellsStep'
import CharacterSheetStep from './components/steps/CharacterSheetStep'

import ancestries from '../data/ancestries.json'
import classes from '../data/classes.json'
import spells from '../data/spells.json'
import backgrounds from '../data/backgrounds.json'
import gear from '../data/gear.json'
import languages from '../data/languages.json'
import statsConfig from '../data/stats_config.json'

const SHADOWDARK_SOURCES = [
  'Shadowdark RPG V1',
  'Letters from the Dark Vol. 1: Out of Time',
  'Letters from the Dark Vol. 3: Tales of the Fey',
  'Letters from the Dark Vol. III: Tales of the Fey',
  'Shadowdark: Necronomicon',
]

const PALLADIUM_SOURCES = ['Palladium Fantasy 2nd Ed.']

function filterBySource(items, setting) {
  if (setting === 'shadowdark') return items.filter(i => SHADOWDARK_SOURCES.includes(i.source))
  if (setting === 'palladium') return items.filter(i => PALLADIUM_SOURCES.includes(i.source))
  return items
}

const ALL_ALIGNMENTS = [
  { name: 'Lawful', description: 'You uphold law, order, and tradition above all.', source: 'Shadowdark RPG V1' },
  { name: 'Neutral', description: 'You follow your own moral compass.', source: 'Shadowdark RPG V1' },
  { name: 'Chaotic', description: 'You prize freedom and personal choice above all.', source: 'Shadowdark RPG V1' },
  { name: 'Principled', description: 'The highest moral standards. Honest, just, and loyal even at personal cost.', source: 'Palladium Fantasy 2nd Ed.' },
  { name: 'Scrupulous', description: 'Good and ethical, but will bend rules to protect the innocent.', source: 'Palladium Fantasy 2nd Ed.' },
  { name: 'Unprincipled', description: 'Typically good but places personal freedom first. Will deceive when necessary.', source: 'Palladium Fantasy 2nd Ed.' },
  { name: 'Anarchist', description: 'Believes in absolute personal freedom. Unpredictable, a wild card.', source: 'Palladium Fantasy 2nd Ed.' },
  { name: 'Miscreant', description: 'Selfish and evil. Will harm others for personal gain without remorse.', source: 'Palladium Fantasy 2nd Ed.' },
  { name: 'Aberrant', description: 'Ruthless but with a personal code. Will not betray those who hired them.', source: 'Palladium Fantasy 2nd Ed.' },
  { name: 'Diabolic', description: 'Pure evil, without mercy or remorse. Cruelty is a way of life.', source: 'Palladium Fantasy 2nd Ed.' },
]

const ALL_STEPS = [
  { key: 'ancestry', label: 'Ancestry' },
  { key: 'class', label: 'Class' },
  { key: 'background', label: 'Background' },
  { key: 'scores', label: 'Ability Scores' },
  { key: 'gear', label: 'Gear' },
  { key: 'spells', label: 'Spells' },
  { key: 'sheet', label: 'Character Sheet' },
]

export default function App() {
  const { character, setField, setAbilityScore, reset } = useCharacter()
  const [setting, setSetting] = useState(null)
  const [stepIndex, setStepIndex] = useState(0)

  const filteredAncestries = filterBySource(ancestries, setting)
  const filteredClasses = filterBySource(classes, setting)
  const filteredAlignments = filterBySource(ALL_ALIGNMENTS, setting)
  const filteredBackgrounds = filterBySource(backgrounds, setting)

  const isCaster = !!character.characterClass?.spellcasting
  const visibleSteps = ALL_STEPS.filter(s => s.key !== 'spells' || isCaster)
  const currentStep = visibleSteps[stepIndex]

  function canProceed() {
    switch (currentStep.key) {
      case 'ancestry': return !!character.ancestry && (!character.ancestry.chooseOneTrait || !!character.ancestryTrait)
      case 'class': return !!character.characterClass
      case 'background': return !!character.background && !!character.alignment
      case 'scores': return true
      case 'gear': return true
      case 'spells': return character.spells.length >= (character.characterClass?.spells_known_at_creation ?? 0)
      case 'sheet': return false
      default: return false
    }
  }

  function next() {
    if (stepIndex < visibleSteps.length - 1) setStepIndex(i => i + 1)
  }

  function back() {
    if (stepIndex > 0) setStepIndex(i => i - 1)
  }

  function handleClassSelect(cls) {
    setField('characterClass', cls)
    setField('spells', [])
  }

  function handleStartOver() {
    reset()
    setSetting(null)
    setStepIndex(0)
  }

  function renderStep() {
    switch (currentStep.key) {
      case 'ancestry':
        return (
          <AncestryStep
            ancestries={filteredAncestries}
            selected={character.ancestry}
            onSelect={a => { setField('ancestry', a); setField('ancestryTrait', null) }}
            selectedTrait={character.ancestryTrait}
            onSelectTrait={t => setField('ancestryTrait', t)}
          />
        )
      case 'class':
        return (
          <ClassStep
            classes={filteredClasses}
            selected={character.characterClass}
            onSelect={handleClassSelect}
          />
        )
      case 'background':
        return (
          <BackgroundStep
            backgrounds={filteredBackgrounds}
            alignments={filteredAlignments}
            selectedBackground={character.background}
            selectedAlignment={character.alignment}
            onSelectBackground={b => setField('background', b)}
            onSelectAlignment={a => setField('alignment', a)}
          />
        )
      case 'scores':
        return (
          <AbilityScoresStep
            statsConfig={statsConfig}
            scores={character.abilityScores}
            method={character.abilityScoreMethod}
            onMethodChange={m => setField('abilityScoreMethod', m)}
            onScoreChange={setAbilityScore}
          />
        )
      case 'gear':
        return (
          <GearStep
            characterClass={character.characterClass}
            gear={gear}
            selectedGear={character.gear}
            onGearChange={g => setField('gear', g)}
          />
        )
      case 'spells':
        return (
          <SpellsStep
            characterClass={character.characterClass}
            spells={filterBySource(spells, setting)}
            selectedSpells={character.spells}
            onSpellsChange={s => setField('spells', s)}
          />
        )
      case 'sheet':
        return (
          <CharacterSheetStep
            character={character}
            availableLanguages={filterBySource(languages, setting)}
            onNameChange={n => setField('name', n)}
            onLevelChange={n => setField('level', n)}
            onLanguageAdd={lang => setField('languages', [...character.languages, lang])}
            onLanguageRemove={lang => setField('languages', character.languages.filter(l => l !== lang))}
            onStartOver={handleStartOver}
          />
        )
    }
  }

  const isLastStep = stepIndex === visibleSteps.length - 1

  if (!setting) return <LandingScreen onSelect={s => { setSetting(s); setStepIndex(0) }} />

  const settingLabel = setting === 'palladium' ? 'Palladium Fantasy' : 'Shadowdark RPG'

  return (
    <div className="min-h-screen bg-stone-900 text-amber-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-400">Shadowdark</h1>
          <p className="text-stone-500 mt-1">Character Creator &mdash; {settingLabel}</p>
        </div>

        <ProgressBar steps={visibleSteps.map(s => s.label)} current={stepIndex} />

        <div className="mb-8 min-h-96">
          {renderStep()}
        </div>

        <div className="flex justify-between items-center border-t border-stone-700 pt-6">
          <button
            onClick={back}
            disabled={stepIndex === 0}
            className="px-6 py-2 bg-stone-700 hover:bg-stone-600 border border-stone-500 rounded text-amber-100 disabled:opacity-30 transition-colors"
          >
            Back
          </button>

          {!isLastStep && (
            <button
              onClick={next}
              disabled={!canProceed()}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-500 rounded text-stone-900 font-semibold disabled:opacity-30 transition-colors"
            >
              {stepIndex === visibleSteps.length - 2 ? 'Finish →' : 'Next →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
