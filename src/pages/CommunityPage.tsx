import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

/* ── helpers ── */
function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'gerade eben'
  if (mins < 60) return 'vor ' + mins + ' Min.'
  const hours = Math.floor(mins / 60)
  if (hours < 24) return 'vor ' + hours + ' Std.'
  const days = Math.floor(hours / 24)
  if (days < 7) return 'vor ' + days + (days === 1 ? ' Tag' : ' Tagen')
  const weeks = Math.floor(days / 7)
  return 'vor ' + weeks + (weeks === 1 ? ' Woche' : ' Wochen')
}

const tagConfig: Record<string, { emoji: string; color: string; bg: string }> = {
  Rezept:      { emoji: '\u{1F373}', color: 'text-orange-700',  bg: 'bg-orange-50 border-orange-200' },
  Tipp:        { emoji: '\u{1F4A1}', color: 'text-yellow-700',  bg: 'bg-yellow-50 border-yellow-200' },
  Frage:       { emoji: '\u{2753}',  color: 'text-blue-700',    bg: 'bg-blue-50 border-blue-200' },
  'Aktivit\u{00E4}t': { emoji: '\u{1F3AF}', color: 'text-green-700',   bg: 'bg-green-50 border-green-200' },
  Erfahrung:   { emoji: '\u{1F49C}', color: 'text-purple-700',  bg: 'bg-purple-50 border-purple-200' },
  Meilenstein: { emoji: '\u{1F31F}', color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200' },
}

const reactions = ['\u{2764}\u{FE0F}', '\u{1F44F}', '\u{1F60D}', '\u{1F4AA}', '\u{1F929}', '\u{1F917}']

const avatarGradients = [
  'from-tuki-mint to-emerald-200',
  'from-orange-200 to-rose-200',
  'from-blue-200 to-indigo-200',
  'from-purple-200 to-pink-200',
  'from-yellow-200 to-orange-200',
  'from-teal-200 to-cyan-200',
]

/* ── seed data (shown when DB is empty) ── */
const seedPosts = [
  {
    id: 'seed-1',
    profile_name: 'Sarah M.',
    avatar_emoji: '\u{1F469}\u{200D}\u{1F373}',
    tag: 'Rezept',
    content: 'Die Dattel-Energy-Balls kommen bei uns mega an! Mein Tipp: etwas Kokosraspeln dazu, dann kleben sie nicht so. Perfekt f\u{00FC}r unterwegs \u{1F60B}',
    image_url: '',
    created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
    like_count: 12,
    comment_count: 4,
    reactions: { '\u{2764}\u{FE0F}': 8, '\u{1F60D}': 3, '\u{1F44F}': 1 },
  },
  {
    id: 'seed-2',
    profile_name: 'Marco & Lisa',
    avatar_emoji: '\u{1F46A}',
    tag: 'Aktivit\u{00E4}t',
    content: 'Heute den Barfusspfad im Wald ausprobiert \u{2013} die Kinder waren begeistert! Unbedingt Wechselkleider mitnehmen, es wird matschig \u{1F602}\u{1F33F}',
    image_url: '',
    created_at: new Date(Date.now() - 8 * 3600000).toISOString(),
    like_count: 23,
    comment_count: 7,
    reactions: { '\u{2764}\u{FE0F}': 12, '\u{1F44F}': 8, '\u{1F929}': 3 },
  },
  {
    id: 'seed-3',
    profile_name: 'Julia K.',
    avatar_emoji: '\u{1F31F}',
    tag: 'Meilenstein',
    content: 'Unser Kleiner hat heute zum ersten Mal \u{00AB}Mama\u{00BB} gesagt! Ich heule immer noch \u{1F62D}\u{2764}\u{FE0F} Hat bei euch auch so lange gedauert (14 Monate)?',
    image_url: '',
    created_at: new Date(Date.now() - 18 * 3600000).toISOString(),
    like_count: 45,
    comment_count: 18,
    reactions: { '\u{2764}\u{FE0F}': 30, '\u{1F917}': 10, '\u{1F929}': 5 },
  },
  {
    id: 'seed-4',
    profile_name: 'Tina R.',
    avatar_emoji: '\u{1F4A1}',
    tag: 'Tipp',
    content: 'Game-Changer f\u{00FC}r abendliches Z\u{00E4}hneputzen: Wir haben eine \u{00AB}Zahnputz-Disco\u{00BB} eingef\u{00FC}hrt \u{2013} Licht aus, bunte LED-Zahnb\u{00FC}rste an, Lieblingslied l\u{00E4}uft. Kein Geschrei mehr seit 3 Wochen!',
    image_url: '',
    created_at: new Date(Date.now() - 26 * 3600000).toISOString(),
    like_count: 67,
    comment_count: 22,
    reactions: { '\u{1F44F}': 35, '\u{1F60D}': 20, '\u{1F4AA}': 12 },
  },
  {
    id: 'seed-5',
    profile_name: 'Anna & Tom',
    avatar_emoji: '\u{1F469}\u{200D}\u{1F467}\u{200D}\u{1F466}',
    tag: 'Frage',
    content: 'Unsere Tochter (3) will pl\u{00F6}tzlich nur noch Nudeln essen \u{2013} kennt ihr das? Habt ihr Tricks, wie man Gem\u{00FC}se \u{00AB}reinschmuggeln\u{00BB} kann? \u{1F35D}\u{1F966}',
    image_url: '',
    created_at: new Date(Date.now() - 48 * 3600000).toISOString(),
    like_count: 34,
    comment_count: 29,
    reactions: { '\u{2764}\u{FE0F}': 15, '\u{1F917}': 12, '\u{1F4AA}': 7 },
  },
  {
    id: 'seed-6',
    profile_name: 'Dominic',
    avatar_emoji: '\u{1F468}\u{200D}\u{1F4BB}',
    tag: 'Erfahrung',
    content: 'Seit wir Tuki nutzen planen wir unsere Mahlzeiten viel besser. Der K\u{00FC}hlschrank-Check spart uns ca. CHF 50 pro Woche an Food Waste. Kann ich nur empfehlen! \u{1F4AA}\u{267B}\u{FE0F}',
    image_url: '',
    created_at: new Date(Date.now() - 72 * 3600000).toISOString(),
    like_count: 56,
    comment_count: 14,
    reactions: { '\u{1F44F}': 28, '\u{1F929}': 18, '\u{2764}\u{FE0F}': 10 },
  },
]

const seedComments: Record<string, Array<{author: string; emoji: string; text: string; ago: string}>> = {
  'seed-1': [
    { author: 'Lisa W.', emoji: '\u{1F64B}\u{200D}\u{2640}\u{FE0F}', text: 'Oh ja, Kokosraspeln sind der Trick! Wir machen auch noch Chiasamen rein.', ago: 'vor 1 Std.' },
    { author: 'Marco P.', emoji: '\u{1F468}\u{200D}\u{1F373}', text: 'Wie lange halten die sich im K\u{00FC}hlschrank?', ago: 'vor 45 Min.' },
  ],
  'seed-4': [
    { author: 'Nina S.', emoji: '\u{1F60D}', text: 'DAS probieren wir heute Abend! Genial!', ago: 'vor 5 Std.' },
    { author: 'Kai M.', emoji: '\u{1F468}\u{200D}\u{1F467}', text: 'Bei uns klappt es auch mit einer Sanduhr \u{2013} 2 Minuten visuell sehen hilft enorm.', ago: 'vor 3 Std.' },
    { author: 'Sarah M.', emoji: '\u{1F469}\u{200D}\u{1F373}', text: 'Haha wir haben die LED-B\u{00FC}rste auch, die ist gold wert!', ago: 'vor 2 Std.' },
  ],
  'seed-5': [
    { author: 'Tina R.', emoji: '\u{1F4A1}', text: 'Gem\u{00FC}se in die Sauce pürieren! Karotten + Zucchini in der Tomatensauce merkt kein Kind \u{1F609}', ago: 'vor 1 Tag' },
    { author: 'Julia K.', emoji: '\u{1F31F}', text: 'Nudeln aus Linsen probiert? Die roten sehen fast gleich aus, haben aber viel mehr N\u{00E4}hrstoffe!', ago: 'vor 20 Std.' },
  ],
}

/* ── main component ── */
export default function CommunityPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [showCompose, setShowCompose] = useState(false)
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [newContent, setNewContent] = useState('')
  const [newTag, setNewTag] = useState('Tipp')
  const [activeReaction, setActiveReaction] = useState<Record<string, string>>({})

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    setLoading(true)
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 4000)
      const { data } = await supabase
        .from('community_posts')
        .select('*, profiles(display_name, avatar_emoji)')
        .order('created_at', { ascending: false })
        .abortSignal(controller.signal)
      clearTimeout(timer)
      if (data && data.length > 0) {
        setPosts(data)
      } else {
        setPosts(seedPosts)
      }
    } catch {
      setPosts(seedPosts)
    }
    setLoading(false)
  }

  function toggleComments(postId: string) {
    setExpandedComments(prev => {
      const next = new Set(prev)
      if (next.has(postId)) next.delete(postId)
      else next.add(postId)
      return next
    })
  }

  function toggleReaction(postId: string, emoji: string) {
    setActiveReaction(prev => ({
      ...prev,
      [postId]: prev[postId] === emoji ? '' : emoji
    }))
  }

  const filtered = activeTag ? posts.filter(p => p.tag === activeTag) : posts

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

  return (
    <>
      <Header />
      <div className="pb-24">
        {/* Hero Section */}
        <div className="mx-4 mt-2 mb-4 rounded-2xl bg-gradient-to-br from-tuki-mint/40 via-white to-tuki-mint-light/30 border border-tuki-mint/30 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Tuki Community</h2>
              <p className="text-xs text-gray-500 mt-0.5">{posts.length} Beitr\u{00E4}ge \u{00B7} {posts.reduce((s, p) => s + (p.comment_count || 0), 0)} Kommentare</p>
            </div>
            <button
              onClick={() => setShowCompose(!showCompose)}
              className="flex items-center gap-1.5 bg-tuki-rot text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              <span className="text-base">\u{270F}\u{FE0F}</span> Beitrag
            </button>
          </div>

          {/* Stats row */}
          <div className="flex gap-2 mt-3">
            <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2 text-center border border-white/50">
              <div className="text-lg font-bold text-tuki-rot">{posts.reduce((s, p) => s + (p.like_count || 0), 0)}</div>
              <div className="text-[10px] text-gray-500">Reactions</div>
            </div>
            <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2 text-center border border-white/50">
              <div className="text-lg font-bold text-tuki-rot">{posts.length}</div>
              <div className="text-[10px] text-gray-500">Familien</div>
            </div>
            <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2 text-center border border-white/50">
              <div className="text-lg font-bold text-tuki-rot">\u{1F525}</div>
              <div className="text-[10px] text-gray-500">Aktiv heute</div>
            </div>
          </div>
        </div>

        {/* Compose overlay */}
        <AnimatePresence>
          {showCompose && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mx-4 mb-4 overflow-hidden"
            >
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-tuki-mint to-emerald-200 flex items-center justify-center text-lg">\u{1F468}\u{200D}\u{1F4BB}</div>
                  <span className="text-sm font-semibold text-gray-700">Dein Beitrag</span>
                </div>
                <textarea
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="Was m\u{00F6}chtest du teilen? Rezept-Tipp, Aktivit\u{00E4}ts-Idee, Frage..."
                  className="w-full h-24 text-sm bg-gray-50 rounded-xl border border-gray-200 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-tuki-mint/40 focus:border-tuki-mint"
                />
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-1.5 flex-wrap">
                    {Object.entries(tagConfig).map(([tag, conf]) => (
                      <button
                        key={tag}
                        onClick={() => setNewTag(tag)}
                        className={"text-xs px-2.5 py-1 rounded-full border transition-all " + (newTag === tag ? conf.bg + ' ' + conf.color + ' border-current font-semibold' : 'bg-gray-50 text-gray-500 border-gray-200')}
                      >
                        {conf.emoji} {tag}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => { setShowCompose(false); setNewContent('') }}
                    className="bg-tuki-rot text-white text-sm font-semibold px-4 py-2 rounded-xl active:scale-95 transition-all"
                  >
                    Posten
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tag filter */}
        <div className="flex gap-1.5 px-4 mb-4 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveTag(null)}
            className={"text-xs px-3 py-1.5 rounded-full border transition-all whitespace-nowrap " + (!activeTag ? 'bg-gray-800 text-white border-gray-800 font-semibold' : 'bg-white text-gray-600 border-gray-200')}
          >
            Alle
          </button>
          {Object.entries(tagConfig).map(([tag, conf]) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={"text-xs px-3 py-1.5 rounded-full border transition-all whitespace-nowrap " + (activeTag === tag ? conf.bg + ' ' + conf.color + ' border-current font-semibold' : 'bg-white text-gray-600 border-gray-200')}
            >
              {conf.emoji} {tag}
            </button>
          ))}
        </div>

        {/* Posts Feed */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-3xl animate-bounce">\u{1F331}</div>
            <p className="text-gray-400 text-sm mt-2">Community laden...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="text-4xl block mb-3">\u{1F50D}</div>
            <p className="text-gray-500 text-sm">Keine Beitr\u{00E4}ge in dieser Kategorie.</p>
          </div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-3 px-4 md:columns-2 md:gap-3 md:space-y-0">
            {filtered.map((post, idx) => {
              const tag = tagConfig[post.tag] || tagConfig['Tipp']
              const grad = avatarGradients[idx % avatarGradients.length]
              const postReactions = post.reactions || {}
              const comments = seedComments[post.id] || []
              const isExpanded = expandedComments.has(post.id)

              return (
                <motion.div key={post.id} variants={item} className="card-lift bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden md:mb-3 md:break-inside-avoid">
                  {/* Post header */}
                  <div className="flex items-center gap-3 px-4 pt-4 pb-2">
                    <div className={"w-10 h-10 rounded-full bg-gradient-to-br " + grad + " flex items-center justify-center text-lg shadow-sm"}>
                      {post.avatar_emoji || post.profiles?.avatar_emoji || '\u{1F468}\u{200D}\u{1F469}\u{200D}\u{1F467}'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800 truncate">{post.profile_name || post.profiles?.display_name || 'Tuki Familie'}</p>
                      <p className="text-[11px] text-gray-400">{timeAgo(post.created_at)}</p>
                    </div>
                    <span className={"text-[11px] px-2.5 py-1 rounded-full border font-medium " + tag.bg + " " + tag.color}>
                      {tag.emoji} {post.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="px-4 pb-3">
                    <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
                  </div>

                  {/* Image if exists */}
                  {post.image_url && (
                    <img src={post.image_url} alt="" className="w-full h-52 object-cover" />
                  )}

                  {/* Reactions display */}
                  {Object.keys(postReactions).length > 0 && (
                    <div className="flex items-center gap-1 px-4 py-2">
                      <div className="flex -space-x-1">
                        {Object.entries(postReactions).slice(0, 3).map(([emoji]) => (
                          <span key={emoji} className="text-sm bg-white rounded-full border border-gray-100 w-6 h-6 flex items-center justify-center shadow-sm">{emoji}</span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">{post.like_count}</span>
                      {(post.comment_count || 0) > 0 && (
                        <span className="text-xs text-gray-400 ml-auto">{post.comment_count} Kommentare</span>
                      )}
                    </div>
                  )}

                  {/* Action bar */}
                  <div className="flex items-center border-t border-gray-100">
                    {/* Reaction picker */}
                    <div className="flex-1 flex items-center gap-0.5 px-2 py-2">
                      {reactions.map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => toggleReaction(post.id, emoji)}
                          className={"text-base w-8 h-8 rounded-full flex items-center justify-center transition-all " + (activeReaction[post.id] === emoji ? 'bg-tuki-mint-bg scale-125 shadow-sm' : 'hover:bg-gray-50 active:scale-110')}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                    {/* Comment toggle */}
                    <button
                      onClick={() => toggleComments(post.id)}
                      className={"flex items-center gap-1.5 px-4 py-2 text-xs font-medium border-l border-gray-100 transition-all " + (isExpanded ? 'text-tuki-rot bg-red-50/50' : 'text-gray-500 hover:text-gray-700')}
                    >
                      <span>\u{1F4AC}</span> {post.comment_count || 0}
                    </button>
                  </div>

                  {/* Comments section */}
                  <AnimatePresence>
                    {isExpanded && comments.length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-gray-100 bg-gray-50/50"
                      >
                        <div className="p-3 space-y-2.5">
                          {comments.map((c, ci) => (
                            <div key={ci} className="flex gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm shrink-0">{c.emoji}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xs font-semibold text-gray-700">{c.author}</span>
                                  <span className="text-[10px] text-gray-400">{c.ago}</span>
                                </div>
                                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{c.text}</p>
                              </div>
                            </div>
                          ))}
                          {/* Comment input */}
                          <div className="flex gap-2 pt-1">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-tuki-mint to-emerald-200 flex items-center justify-center text-sm shrink-0">\u{1F468}\u{200D}\u{1F4BB}</div>
                            <input
                              type="text"
                              placeholder="Kommentar schreiben..."
                              className="flex-1 text-xs bg-white rounded-full border border-gray-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-tuki-mint/30 focus:border-tuki-mint"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </>
  )
}
