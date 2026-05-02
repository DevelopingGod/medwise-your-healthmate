interface EmergencyAlertProps {
  visible: boolean
}

export default function EmergencyAlert({ visible }: EmergencyAlertProps) {
  if (!visible) return null

  return (
    <div
      className="w-full px-4 py-3 flex items-center justify-center gap-2 flex-shrink-0 border-b"
      style={{ backgroundColor: '#fef2f2', borderBottomColor: '#fca5a5' }}
    >
      <span className="text-base flex-shrink-0">🚨</span>
      <p className="text-sm font-medium text-center" style={{ color: '#dc2626' }}>
        This may be a medical emergency. Please call emergency services{' '}
        <strong>112</strong> or go to your nearest hospital immediately.
      </p>
    </div>
  )
}
