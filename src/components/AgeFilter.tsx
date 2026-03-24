import { motion } from 'framer-motion'

interface AgeFilterProps {
  selected: string
  onChange: (age: string) => void
}

const ages = [
  { value: 'all', label: 'Alle' },
  { value: '1-2', label: '1-2 J.' },
  { value: '2-3', label: '2-3 J.' },
  { value: '3-5', label: '3-5 J.' },
  { value: '5-8', label: '5-8 J.' },
]

export default function AgeFilter({ selected, onChange }: AgeFilterProps) {
  return (
    <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar py-1">
      {ages.map(age => (
        <button
          key={age.value}
          onClick={() => onChange(age.value)}
          className="relative px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors"
        >
          {selected === age.value && (
            <motion.div
              layoutId="ageFilter"
              className="absolute inset-0 bg-tuki-rot rounded-full"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
          <span className={`relative z-10 ${selected === age.value ? 'text-white' : 'text-gray-500'}`}>
            {age.label}
          </span>
        </button>
      ))}
    </div>
  )
}
