'use client'

import { useState } from 'react'
import type { UserProfile, TreatmentPreference } from '@/types'

interface IntakeFormProps {
  onSubmit: (profile: UserProfile) => void
}

interface FormErrors {
  age?: string
  weight?: string
  preference?: string
}

const treatmentOptions: { value: TreatmentPreference; label: string; emoji: string }[] = [
  { value: 'allopathic', label: 'Allopathic', emoji: '💊' },
  { value: 'homeopathic', label: 'Homeopathic', emoji: '🌿' },
  { value: 'ayurvedic', label: 'Ayurvedic', emoji: '🌱' },
]

export default function IntakeForm({ onSubmit }: IntakeFormProps) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [preference, setPreference] = useState<TreatmentPreference | ''>('')
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const next: FormErrors = {}
    if (!age || isNaN(Number(age)) || Number(age) < 1 || Number(age) > 120) {
      next.age = 'Please enter a valid age between 1 and 120.'
    }
    if (!weight || isNaN(Number(weight)) || Number(weight) < 1 || Number(weight) > 300) {
      next.weight = 'Please enter a valid weight between 1 and 300 kg.'
    }
    if (!preference) {
      next.preference = 'Please select a treatment preference.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({
      name: name.trim() || undefined,
      age: Number(age),
      weight: Number(weight),
      preference: preference as TreatmentPreference,
    })
  }

  const canSubmit = age.trim() !== '' && weight.trim() !== '' && preference !== ''

  return (
    <div className="flex items-center justify-center min-h-full px-4 py-10">
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <span className="text-3xl font-bold" style={{ color: '#1a56db' }}>⚕️ MedWise</span>
        </div>

        {/* Heading */}
        <h1 className="text-xl font-semibold text-gray-900 text-center mb-1">
          Let&apos;s personalize your consultation
        </h1>
        <p className="text-sm text-gray-500 text-center mb-7">
          Tell us a bit about yourself so we can give you accurate recommendations
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Rahul"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Age <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              placeholder="e.g. 28"
              min={1}
              max={120}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
            />
            {errors.age && (
              <p className="mt-1 text-xs text-red-600">{errors.age}</p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Weight (in kg) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="e.g. 65"
              min={1}
              max={300}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent"
            />
            {errors.weight && (
              <p className="mt-1 text-xs text-red-600">{errors.weight}</p>
            )}
          </div>

          {/* Treatment Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Treatment Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {treatmentOptions.map(option => {
                const selected = preference === option.value
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPreference(option.value)}
                    className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 text-sm font-medium transition-colors"
                    style={{
                      borderColor: selected ? '#1a56db' : '#d1d5db',
                      backgroundColor: selected ? '#eff6ff' : '#ffffff',
                      color: selected ? '#1a56db' : '#374151',
                    }}
                  >
                    <span className="text-xl">{option.emoji}</span>
                    <span>{option.label}</span>
                  </button>
                )
              })}
            </div>
            {errors.preference && (
              <p className="mt-1 text-xs text-red-600">{errors.preference}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed mt-2"
            style={{ backgroundColor: '#1a56db' }}
          >
            Start My Consultation →
          </button>
        </form>
      </div>
    </div>
  )
}
