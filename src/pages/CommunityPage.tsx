import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import { useTranslation } from '../i18n/useTranslation'

interface Comment {
  id: string
  author: string
  avatar: string
  timeAgo: string
  text: string
}

interface CommunityPost {
  id: string
  author: string
  avatar: string
  timeAgo: string
  content: string
  image?: string
  likes: number
  comments: Comment[]
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
    comments: [
      { id: 'c1a', author: 'Marco B.', avatar: '👨', timeAgo: 'vor 1 Std.', text: 'Super! Welches Rezept war das genau? Wir suchen noch einfache Sachen für unseren Kleinen.' },
      { id: 'c1b', author: 'Sarah K.', avatar: '👩', timeAgo: 'vor 1 Std.', text: 'Das sieht so lecker aus! Die Pancakes aus der App sind bei uns auch der Hit.' },
      { id: 'c1c', author: 'Julia H.', avatar: '👩‍🦱', timeAgo: 'vor 45 Min.', text: 'Toll! Ab welchem Alter klappt das gut?' },
    ],
    tag: 'Rezept',
  },
  {
    id: '2',
    author: 'Marco B.',
    avatar: '👨',
    timeAgo: 'vor 5 Std.',
    content: 'Tipp für alle Tuki-Eltern: Wir haben den Tuki ans Waschbecken gestellt und unsere Tochter (2) wäscht jetzt jeden Abend selbst ihre Hände. Die Selbstständigkeit die das fördert ist unglaublich!',
    likes: 41,
    comments: [
      { id: 'c2a', author: 'Thomas M.', avatar: '👨‍🦲', timeAgo: 'vor 4 Std.', text: 'Genau das gleiche bei uns! Der Tuki am Waschbecken ist ein Game-Changer.' },
      { id: 'c2b', author: 'Alena Z.', avatar: '👩‍🦰', timeAgo: 'vor 3 Std.', text: 'Welche Höhenstufe nutzt ihr dafür?' },
      { id: 'c2c', author: 'Marco B.', avatar: '👨', timeAgo: 'vor 3 Std.', text: '@Alena Stufe 2 bei uns, sie ist 87cm gross.' },
      { id: 'c2d', author: 'Sarah K.', avatar: '👩', timeAgo: 'vor 2 Std.', text: 'Das probieren wir heute Abend direkt aus!' },
    ],
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
    comments: [
      { id: 'c3a', author: 'Julia H.', avatar: '👩‍🦱', timeAgo: 'vor 20 Std.', text: 'Die Energy Balls sind bei uns auch der Favorit! Wir machen sie jede Woche.' },
      { id: 'c3b', author: 'Thomas M.', avatar: '👨‍🦲', timeAgo: 'vor 18 Std.', text: '20 Minuten Ruhe? Das ist beeindruckend!' },
    ],
    tag: 'Rezept',
  },
  {
    id: '4',
    author: 'Julia H.',
    avatar: '👩‍🦱',
    timeAgo: 'vor 2 Tagen',
    content: 'Frage an die Community: Welche Höhenstufe nutzt ihr bei einem 18 Monate alten Kind? Unsere Kleine will unbedingt an die Arbeitsfläche aber ich bin unsicher welche Einstellung am besten passt.',
    likes: 12,
    comments: [
      { id: 'c4a', author: 'Marco B.', avatar: '👨', timeAgo: 'vor 2 Tagen', text: 'Bei 18 Monaten haben wir Stufe 3 genutzt. Kommt aber auf die Grösse an!' },
      { id: 'c4b', author: 'Alena Z.', avatar: '👩‍🦰', timeAgo: 'vor 2 Tagen', text: 'Wir auch Stufe 3. Am besten einmal ausprobieren, ob sie bequem an die Kante kommt.' },
      { id: 'c4c', author: 'Thomas M.', avatar: '👨‍🦲', timeAgo: 'vor 1 Tag', text: 'Schau mal in der App unter dem Tuki-Guide, da gibt es eine Tabelle mit Empfehlungen nach Grösse.' },
      { id: 'c4d', author: 'Sarah K.', avatar: '👩', timeAgo: 'vor 1 Tag', text: 'Stufe 3 ist ein guter Start. Unsere war mit 18 Monaten auch auf Stufe 3.' },
      { id: 'c4e', author: 'Julia H.', avatar: '👩‍🦱', timeAgo: 'vor 1 Tag', text: 'Danke euch allen! Wir probieren Stufe 3 aus.' },
    ],
    tag: 'Frage',
  },
  {
    id: '5',
    author: 'Thomas M.',
    avatar: '👨‍🦲',
    timeAgo: 'vor 3 Tagen',
    content: 'Herbstblätter-Kunstwerk mit unserer 4-Jährigen gemacht. Sie hat im Tuki am Küchentisch die schönsten Blätter-Tiere geklebt. Dieses Kind hat mehr Kreativität als ich jemals haben werde 😄',
    likes: 52,
    comments: [
      { id: 'c5a', author: 'Alena Z.', avatar: '👩‍🦰', timeAgo: 'vor 3 Tagen', text: 'Wie schön! Hast du ein Foto?' },
      { id: 'c5b', author: 'Sarah K.', avatar: '👩', timeAgo: 'vor 2 Tagen', text: 'Das müssen wir auch unbedingt ausprobieren! Perfekt für den Herbst.' },
      { id: 'c5c', author: 'Marco B.', avatar: '👨', timeAgo: 'vor 2 Tagen', text: 'Tolle Idee! Blätter-Tiere klingt super kreativ.' },
    ],
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
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'feed' | 'join'>('feed')
  const [liked, setLiked] = useState<string[]>([])
  const [expandedComments, setExpandedComments] = useState<string[]>([])
  const [newComments, setNewComments] = useState<Record<string, Comment[]>>({})
  const [commentText, setCommentText] = useState<Record<string, string>>({})
  const commentInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const toggleLike = (id: string) => {
    setLiked(l => l.includes(id) ? l.filter(x => x !== id) : [...l, id])
  }

  const toggleComments = (id: string) => {
    setExpandedComments(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
    setTimeout(() => {
      commentInputRefs.current[id]?.focus()
    }, 300)
  }

  const handleAddComment = (postId: string) => {
    const text = (commentText[postId] || '').trim()
    if (!text) return

    const comment: Comment = {
      id: `new-${Date.now()}`,
      author: 'Du',
      avatar: '🧑',
      timeAgo: t.community.commentJustNow,
      text,
    }

    setNewComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment],
    }))
    setCommentText(prev => ({ ...prev, [postId]: '' }))
  }

  const getAllComments = (post: CommunityPost): Comment[] => {
    return [...post.comments, ...(newComments[post.id] || [])]
  }

  return (
    <div className="pb-24">
      <Header title={t.community.title} />

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
            {tab === 'feed' ? t.community.feedTab : t.community.clubTab}
          </button>
        ))}
      </div>

      {activeTab === 'feed' ? (
        <motion.div
          className="space-y-4 px-4"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {posts.map(post => {
            const allComments = getAllComments(post)
            const isExpanded = expandedComments.includes(post.id)

            return (
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
                        {t.community.postTags[post.tag.toLowerCase()] || post.tag}
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
                  <button
                    onClick={() => toggleComments(post.id)}
                    className={`flex items-center gap-1.5 text-xs ${isExpanded ? 'text-tuki-rot' : ''}`}
                  >
                    <span>💬</span>
                    <span className={isExpanded ? 'text-tuki-rot font-medium' : 'text-gray-500'}>{allComments.length}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-xs ml-auto">
                    <span>🔗</span>
                    <span className="text-gray-500">{t.community.share}</span>
                  </button>
                </div>

                {/* Comments Section */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-100 bg-gray-50/50">
                        {/* Comment list */}
                        <div className="px-4 pt-3 space-y-3">
                          {allComments.map(comment => (
                            <div key={comment.id} className="flex gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-tuki-mint-bg flex items-center justify-center text-sm shrink-0 mt-0.5">
                                {comment.avatar}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xs font-semibold text-gray-800">{comment.author}</span>
                                  <span className="text-[10px] text-gray-400">{comment.timeAgo}</span>
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Comment input */}
                        <div className="flex items-center gap-2 px-4 py-3 mt-1">
                          <div className="w-7 h-7 rounded-full bg-tuki-rot/10 flex items-center justify-center text-sm shrink-0">
                            {'🧑'}
                          </div>
                          <div className="flex-1 flex items-center gap-2 bg-white rounded-full border border-gray-200 pl-3 pr-1 py-1">
                            <input
                              ref={el => { commentInputRefs.current[post.id] = el }}
                              type="text"
                              value={commentText[post.id] || ''}
                              onChange={e => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                              onKeyDown={e => { if (e.key === 'Enter') handleAddComment(post.id) }}
                              placeholder={t.community.commentPlaceholder}
                              className="flex-1 text-xs bg-transparent outline-none text-gray-700 placeholder-gray-400"
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              disabled={!(commentText[post.id] || '').trim()}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                                (commentText[post.id] || '').trim()
                                  ? 'bg-tuki-rot text-white'
                                  : 'bg-gray-100 text-gray-300'
                              }`}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      ) : (
        <div className="px-4">
          <div className="bg-gradient-to-br from-tuki-rot to-tuki-rot-dark rounded-3xl p-6 text-center">
            <span className="text-5xl block mb-4">🏆</span>
            <h2 className="text-xl font-bold text-white mb-2">{t.community.clubTitle}</h2>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">
              {t.community.clubDescription}
            </p>

            <div className="space-y-3 text-left mb-6">
              {(t.community.clubFeatures as string[]).map((feature, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                  <span className="text-lg">✨</span>
                  <span className="text-white text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full py-3.5 bg-white text-tuki-rot font-semibold rounded-xl text-sm shadow-lg">
              {t.community.joinFree}
            </button>
            <p className="text-white/50 text-[10px] mt-3">
              {t.community.joinNote}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
