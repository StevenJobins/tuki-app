import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
  { path: '/', label: 'Home', icon: 'home' },
  { path: '/rezepte', label: 'Rezepte', icon: 'recipe' },
  { path: '/aktivitaeten', label: 'Aktivitäten', icon: 'activity' },
  { path: '/community', label: 'Community', icon: 'community' },
  { path: '/profil', label: 'Profil', icon: 'profile' },
]

function NavIcon({ icon, active }: { icon: string; active: boolean }) {
  const color = active ? '#8F5652' : '#9CA3AF'
  const icons: Record<string, JSX.Element> = {
    home: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" fill={active ? '#8F565220' : 'none'} /><polyline points="9 22 9 12 15 12 15 22" /></svg>),
    recipe: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10" fill={active ? '#8F565220' : 'none'} /><path d="M15 2a6 6 0 016 6" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>),
    activity: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="10" fill={active ? '#8F565220' : 'none'} /><path d="M8 12l2 2 4-4" /></svg>),
    community: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" fill={active ? '#8F565220' : 'none'} /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>),
    profile: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" fill={active ? '#8F565220' : 'none'} /></svg>),
  }
  return icons[icon] || null
}

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const hideOn = ['/rezept/', '/aktivitaet/', '/entwicklung']
  if (hideOn.some(p => location.pathname.includes(p))) return null
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-gray-100 safe-bottom">
      <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map(item => {
          const active = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
          return (
            <button key={item.path} onClick={() => navigate(item.path)} className="flex flex-col items-center gap-0.5 py-1 px-3 relative">
              {active && (<motion.div layoutId="navIndicator" className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-tuki-rot" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />)}
              <NavIcon icon={item.icon} active={active} />
              <span className={`text-[10px] font-medium ${active ? 'text-tuki-rot' : 'text-gray-400'}`}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
