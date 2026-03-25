interface ShareButtonProps {
  title: string
  text: string
  className?: string
}

export default function ShareButton({ title, text, className = '' }: ShareButtonProps) {
  const canShare = typeof navigator !== 'undefined' && !!navigator.share

  if (!canShare) return null

  const handleShare = async () => {
    try {
      await navigator.share({
        title,
        text,
        url: window.location.href
      })
    } catch {
      // User cancelled or share failed silently
    }
  }

  return (
    <button
      onClick={handleShare}
      className={`flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-xl active:scale-95 transition-transform ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
      Teilen
    </button>
  )
}
