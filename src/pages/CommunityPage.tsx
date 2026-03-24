import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/Header'

interface CommunityPost {
  id: string
  author: string
  avatar: string
  timeAgo: string
  content: string
  image?: string
  likes: number
  comments: number
  tag: string
}

const posts: CommunityPost[] = [
  {
    id: '1',
    author: 'Alena Z.',
    avatar: '👩‍🦰',
    timeAgo: 'vor 2 Std.',
    content: 'Unser kleiner Chefkoch hat heute seine ersten Pancakes im Tuki gemacht! Er ist so stolz auf sich. Das Rezept aus der App war perfekt — nur 3 Zutaten und er konnte fast alles selbst machen.',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=300&fit=crop',
    likes: 24,
    comments: 8,
    tag: 'Rezept',
  },
  {
    id: '2',
    author: 'Marco B.',
    avatar: '👨',
    timeAgo: 'vor 5 Std.',
    content: 'Tipp für alle Tuki-Eltern: Wir haben den Tuki ans Waschbecken gestellt und unsere Tochter (2) wäscht jetzt jeden Abend selbst ihre Hände. Die Selbstständigkeit die das fördert ist unglaublich!',
    likes: 41,
    comments: 12,
    tag: 'Tipp',
  },
  {
    id: '3',
    author: 'Sarah K.',
    avatar: '👩',
    timeAgo: 'vor 1 Tag',
    content: 'Wir haben gestern die Dattel-Energy-Balls aus der App gemacht. Mein Sohn (3) hat die Kugeln geformt und war so fokussiert dabei — 20 Minuten ruhiges, konzentriertes Arbeiten. Besser als jedes Spielzeug!',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=300&fit=crop',
    likes: 35,
    comments: 6,
    tag: 'Rezept',
  },
  {
    id: '4',
    author: 'Julia H.',
    avatar: '👩‍🦱',
    timeAgo: 'vor 2 Tagen',
    content: 'Frage an die Community: Welche Höhenstufe nutzt ihr bei einem 18 Monate alten Kind? Unsere Kleine will unbedingt an die Arbeitsfläche aber ich bin unsicher welche Einstellung am besten passt.',
    likes: 12,
    comments: 19,
    tag: 'Frage',
  },
  {
    id: '5',
    author: 'Thomas M.',
    avatar: '👨‍🦲',
    timeAgo: 'vor 3 Tagen',
    content: 'Herbstblätter-Kunstwerk mit unserer 4-Jährigen gemacht. Sie hat im Tuki am Küchentisch die schönsten Blätter-Tiere geklebt. Dieses Kind hat mehr Kreativität als ich jemals haben werde 😄',
    likes: 52,
    comments: 14,
    tag: 'Aktivität',
  },
]

const tagColors: Record<string, string> = {
  'Rezept': 'bg-orange-100 text-orange-700',
  'Tipp': 'bg-blue-100 text-blue-700',
  'Frage': 'bg-purple-100 text-purple-700',
  'Aktivität': 'bg-green-100 text-green-700',
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'join'>('feed')
  const [liked, setLiked] = useState<string[]>([])

  const toggleLike = (id: string) => {
    setLiked(l => l.includes(id) ? l.filter(x => x !== id) : [...l, id])
  }

  return (
    <div className="pb-24">
      <Header title="Community" />

      {/* Tabs */}
      <div className="flex gap-1 mx-4 mt-1 mb-4 bg-gray-100 rounded-xl p-1">
        {(['feed', 'join'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            {tab === 'feed' ? '📱 Feed' : '🔒 Tuki Club beitreten'}
          </button>
        ))}
      </div>

      {activeTab === 'feed' ? (
        <motion.div
          className="space-y-4 px-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {posts.map(post => (
            <motion.div
              key={post.id}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
            >
              {/* Post Header */}
              <div className="flex items-center gap-3 p-4 pb-2">
                <div className="w-10 h-10 rounded-full bg-tuki-mint-bg flex items-center justify-center text-lg">
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-800">{post.author}</span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tagColors[post.tag] || 'bg-gray-100 text-gray-500'}`}>
                      {post.tag}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400">{post.timeAgo}</span>
                </div>
              </div>

              {/* Content */}
              <div className="px-4 pb-3">
                <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
              </div>

              {/* Image */}
              {post.image && (
                <img src={post.image} alt="" className="w-full h-48 object-cover" loading="lazy" />
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 px-4 py-3 border-t border-gray-50">
                <button
                  onClick={() => toggleLike(post.id)}
                  className="flex items-center gap-1.5 text-xs"
                >
                  <span>{liked.includes(post.id) ? '❤️' : '🤍'}</span>
                  <span className="text-gray-500">{post.likes + (liked.includes(post.id) ? 1 : 0)}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs">
                  <span>💬</span>
                  <span className="text-gray-500">{post.comments}</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs ml-auto">
                  <span>🔗</span>
                  <span className="text-gray-500">Teilen</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="px-4">
          <div className="bg-gradient-to-br from-tuki-rot to-tuki-rot-dark rounded-3xl p-6 text-center">
            <span className="text-5xl block mb-4">🏆</span>
            <h2 className="text-xl font-bold text-white mb-2">Tuki Family Club</h2>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              Werde Teil unserer exklusiven Community! Tausche dich mit anderen Tuki-Familien aus,
              erhalte exklusive Rezepte, frühzeitigen Zugang zu neuen Produkten und vieles mehr.
            </p>

            <div className="space-y-3 text-left mb-6">
              {[
                { emoji: '👨‍👩‍👧‍👦', text: 'Private Eltern-Community' },
                { emoji: '🍳', text: 'Exklusive Premium-Rezepte' },
                { emoji: '🎁', text: 'Frühzeitiger Zugang zu neuen Produkten' },
                { emoji: '💬', text: 'Direkte Linie zum Tuki-Team' },
                { emoji: '📸', text: 'Monatliche Foto-Challenges' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-white text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-3.5 bg-white text-tuki-rot font-semibold rounded-xl text-sm shadow-lg">
              Kostenlos beitreten
            </button>
            <p className="text-white/50 text-[10px] mt-3">
              Für alle Tuki-Besitzer kostenlos. Registrierung mit Kaufbeleg.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
