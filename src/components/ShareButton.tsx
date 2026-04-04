import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ShareButtonProps {
  title: string
  text: string
  className?: string
  recipeId?: string
  activityId?: string
}

export default function ShareButton({ title, text, className = '', recipeId, activityId }: ShareButtonProps) {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const canShare = typeof navigator !== 'undefined' && !!navigator.share

  function handleNativeShare() {
    setShowMenu(false)
    if (canShare) {
      navigator.share({ title, text, url: window.location.href }).catch(() => {})
    }
  }

  function handleCommunityShare() {
    setShowMenu(false)
    const params = new URLSearchParams()
    if (recipeId) params.set('recipe', recipeId)
    if (activityId) params.set('activity', activityId)
    params.set('title', title)
    navigate('/community?' + params.toString())
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={className || 'w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-90 transition-transform'}
        aria-label="Teilen"
      >
        {'📤'}
      </button>
      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-lg border border-gray-200 py-1.5 w-52 animate-in fade-in slide-in-from-top-2">
            <button onClick={handleCommunityShare} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2.5 transition-colors">
              <span className="text-base">{'👨‍👩‍👧'}</span>
              <span>In Community teilen</span>
            </button>
            {canShare && (
              <button onClick={handleNativeShare} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2.5 transition-colors">
                <span className="text-base">{'📱'}</span>
                <span>Extern teilen...</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  )
}
