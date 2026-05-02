export type TreatmentPreference = 'allopathic' | 'homeopathic' | 'ayurvedic'

export interface UserProfile {
  name?: string
  age: number
  weight: number
  preference: TreatmentPreference
}

export interface IntakeFormData {
  name: string
  age: string
  weight: string
  preference: TreatmentPreference
}
