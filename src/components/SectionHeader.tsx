import { useNavigate } from 'react-router-dom'

interface SectionHeaderProps {
  title: string
  emoji?: string
  linkTo?: string
  linkText?: string
}

export default function SectionHeader({ title, emoji, linkTo, linkText = 'Alle anzeigen' }: SectionHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between px-4 mb-3">
      <h2 className="font-rubik font-semibold text-base text-gray-800">
        {emoji && <span className="mr-1.5">{emoji}</span>}
        {title}
      </h2>
      {linkTo && (
        <button
          onClick={() => navigate(linkTo)}
          className="text-xs font-medium text-tuki-rot"
        >
          {linkText} →
        </button>
      )}
    </div>
  )
}
