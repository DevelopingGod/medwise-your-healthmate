import type { TreatmentPreference } from '@/types'

interface TreatmentBadgeProps {
  preference: TreatmentPreference
}

const styles: Record<TreatmentPreference, { bg: string; color: string; label: string }> = {
  allopathic: { bg: '#eff6ff', color: '#1C4D8D', label: 'Allopathic' },
  homeopathic: { bg: '#f0fdf4', color: '#166534', label: 'Homeopathic' },
  ayurvedic:   { bg: '#fff7ed', color: '#9a3412', label: 'Ayurvedic'   },
}

export default function TreatmentBadge({ preference }: TreatmentBadgeProps) {
  const { bg, color, label } = styles[preference]
  return (
    <span
      className="text-xs font-medium px-3 py-1 rounded-full"
      style={{ backgroundColor: bg, color }}
    >
      {label}
    </span>
  )
}
