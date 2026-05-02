export default function DisclaimerBanner() {
  return (
    <div
      className="sticky bottom-0 left-0 right-0 z-40 w-full px-4 py-2 flex items-center justify-center gap-2"
      style={{ backgroundColor: '#fef3c7', color: '#92400e' }}
    >
      <span className="text-sm flex-shrink-0">⚠️</span>
      <p className="text-xs text-center">
        MedWise provides general guidance only — not a substitute for professional medical advice.
        In emergencies call <strong>112</strong>.
      </p>
    </div>
  )
}
