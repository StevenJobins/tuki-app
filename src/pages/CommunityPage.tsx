import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { recipes } from '../data/recipes'
import { activities } from '../data/activities'

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

interface TagInfo { emoji: string; color: string; bg: string }
const tagConfig: Record<string, TagInfo> = {
  Rezept:      { emoji: '🍳', color: 'text-orange-700',  bg: 'bg-orange-50 border-orange-200' },
  Tipp:        { emoji: '💡', color: 'text-yellow-700',  bg: 'bg-yellow-50 border-yellow-200' },
  Frage:       { emoji: '❓',  color: 'text-blue-700',    bg: 'bg-blue-50 border-blue-200' },
  'Aktivität': { emoji: '🎯', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  Erfahrung:   { emoji: '💜', color: 'text-purple-700',  bg: 'bg-purple-50 border-purple-200' },
  Meilenstein: { emoji: '🌟', color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200' },
}

const reactionEmojis = ['❤️', '👏', '😍', '💪', '🤩', '🤗']

const gradients = [
  'from-tuki-mint to-emerald-200', 'from-orange-200 to-rose-200',
  'from-blue-200 to-indigo-200', 'from-purple-200 to-pink-200',
  'from-yellow-200 to-orange-200', 'from-teal-200 to-cyan-200',
]

/* ---- Embed Card Component ---- */
function EmbedCard({ type, id }: { type: 'recipe' | 'activity'; id: string }) {
  const item = type === 'recipe'
    ? recipes.find(r => r.id === id)
    : activities.find(a => a.id === id)
  if (!item) return null
  const isRecipe = type === 'recipe'
  return (
    <div className="mx-4 mb-3 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-200 overflow-hidden flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow" onClick={() => window.location.hash = isRecipe ? '/rezepte/' + id : '/aktivitaeten/' + id}>
      <div className={'w-16 h-16 flex items-center justify-center text-2xl shrink-0 ' + (isRecipe ? 'bg-gradient-to-br from-orange-100 to-orange-50' : 'bg-gradient-to-br from-green-100 to-green-50')}>
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0 py-2 pr-3">
        <p className="text-xs font-medium text-gray-400">{isRecipe ? '🍳 Rezept' : '🎯 Aktivität'}</p>
        <p className="text-sm font-semibold text-gray-800 truncate">{item.title}</p>
        <p className="text-xs text-gray-500">{item.duration} Min. · {isRecipe ? (item as any).difficulty : (item as any).category}</p>
      </div>
      <div className="pr-3 text-gray-300">{'→'}</div>
    </div>
  )
}

/* ---- Seed Data ---- */
const seedPosts = [
  {
    id: 'seed-1', profile_name: 'Sarah M.', avatar_emoji: '👩‍🍳', tag: 'Rezept',
    content: 'Die Dattel-Energy-Balls kommen bei uns mega an! Mein Tipp: etwas Kokosraspeln dazu, dann kleben sie nicht so. Perfekt für unterwegs 😋',
    embed_type: 'recipe' as const, embed_id: 'dattel-energy-balls',
    image_url: '', created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
    like_count: 12, comment_count: 4,
    reactions: { '❤️': 8, '😍': 3, '👏': 1 },
  },
  {
    id: 'seed-2', profile_name: 'Marco & Lisa', avatar_emoji: '👪', tag: 'Aktivität',
    content: 'Heute den Barfusspfad im Wald ausprobiert – die Kinder waren begeistert! Unbedingt Wechselkleider mitnehmen, es wird matschig 😂🌿',
    embed_type: 'activity' as const, embed_id: 'barfusspfad',
    image_url: '', created_at: new Date(Date.now() - 8 * 3600000).toISOString(),
    like_count: 23, comment_count: 7,
    reactions: { '❤️': 12, '👏': 8, '🤩': 3 },
  },
  {
    id: 'seed-3', profile_name: 'Julia K.', avatar_emoji: '🌟', tag: 'Meilenstein',
    content: 'Unser Kleiner hat heute zum ersten Mal «Mama» gesagt! Ich heule immer noch 😭❤️ Hat bei euch auch so lange gedauert (14 Monate)?',
    image_url: '', created_at: new Date(Date.now() - 18 * 3600000).toISOString(),
    like_count: 45, comment_count: 18,
    reactions: { '❤️': 30, '🤗': 10, '🤩': 5 },
  },
  {
    id: 'seed-4', profile_name: 'Tina R.', avatar_emoji: '💡', tag: 'Tipp',
    content: 'Game-Changer für abendliches Zähneputzen: Wir haben eine «Zahnputz-Disco» eingeführt – Licht aus, bunte LED-Zahnbürste an, Lieblingslied läuft. Kein Geschrei mehr seit 3 Wochen!',
    image_url: '', created_at: new Date(Date.now() - 26 * 3600000).toISOString(),
    like_count: 67, comment_count: 22,
    reactions: { '👏': 35, '😍': 20, '💪': 12 },
  },
  {
    id: 'seed-5', profile_name: 'Anna & Tom', avatar_emoji: '👩‍👧‍👦', tag: 'Frage',
    content: 'Unsere Tochter (3) will plötzlich nur noch Nudeln essen – kennt ihr das? Habt ihr Tricks, wie man Gemüse «reinschmuggeln» kann? 🍝🥦',
    embed_type: 'recipe' as const, embed_id: 'bunte-gemuese-muffins',
    image_url: '', created_at: new Date(Date.now() - 48 * 3600000).toISOString(),
    like_count: 34, comment_count: 29,
    reactions: { '❤️': 15, '🤗': 12, '💪': 7 },
  },
  {
    id: 'seed-6', profile_name: 'Dominic', avatar_emoji: '👨‍💻', tag: 'Erfahrung',
    content: 'Seit wir Tuki nutzen planen wir unsere Mahlzeiten viel besser. Der Kühlschrank-Check spart uns ca. CHF 50 pro Woche an Food Waste. Kann ich nur empfehlen! 💪♻️',
    image_url: '', created_at: new Date(Date.now() - 72 * 3600000).toISOString(),
    like_count: 56, comment_count: 14,
    reactions: { '👏': 28, '🤩': 18, '❤️': 10 },
  },
]

const seedComments: Record<string, Array<{author: string; emoji: string; text: string; ago: string}>> = {
  'seed-1': [
    { author: 'Lisa W.', emoji: '🙋‍♀️', text: 'Oh ja, Kokosraspeln sind der Trick! Wir machen auch noch Chiasamen rein.', ago: 'vor 1 Std.' },
    { author: 'Marco P.', emoji: '👨‍🍳', text: 'Wie lange halten die sich im Kühlschrank?', ago: 'vor 45 Min.' },
  ],
  'seed-4': [
    { author: 'Nina S.', emoji: '😍', text: 'DAS probieren wir heute Abend! Genial!', ago: 'vor 5 Std.' },
    { author: 'Kai M.', emoji: '👨‍👧', text: 'Bei uns klappt es auch mit einer Sanduhr – 2 Minuten visuell sehen hilft enorm.', ago: 'vor 3 Std.' },
    { author: 'Sarah M.', emoji: '👩‍🍳', text: 'Haha wir haben die LED-Bürste auch, die ist gold wert!', ago: 'vor 2 Std.' },
  ],
  'seed-5': [
    { author: 'Tina R.', emoji: '💡', text: 'Gemüse in die Sauce pürieren! Karotten + Zucchini in der Tomatensauce merkt kein Kind 😉', ago: 'vor 1 Tag' },
    { author: 'Julia K.', emoji: '🌟', text: 'Nudeln aus Linsen probiert? Die roten sehen fast gleich aus, haben aber viel mehr Nährstoffe!', ago: 'vor 20 Std.' },
  ],
}

/* ---- Main Component ---- */
export default function CommunityPage() {
  const { user } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [posts, setPosts] = useState<any[]>(seedPosts)
  const [loading, setLoading] = useState(false)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [showCompose, setShowCompose] = useState(false)
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [newContent, setNewContent] = useState('')
  const [newTag, setNewTag] = useState('Tipp')
  const [activeReaction, setActiveReaction] = useState<Record<string, string>>({})
  const [embedType, setEmbedType] = useState<'recipe' | 'activity' | null>(null)
  const [embedId, setEmbedId] = useState<string | null>(null)
  const [showEmbedPicker, setShowEmbedPicker] = useState(false)
  const [embedSearch, setEmbedSearch] = useState('')

  // Auto-open compose when arriving from ShareButton
  useEffect(() => {
    const recipeParam = searchParams.get('recipe')
    const activityParam = searchParams.get('activity')
    const titleParam = searchParams.get('title')
    if (recipeParam) {
      setEmbedType('recipe')
      setEmbedId(recipeParam)
      setNewTag('Rezept')
      setNewContent(titleParam ? titleParam + ' ausprobiert! ' : '')
      setShowCompose(true)
      setSearchParams({})
    } else if (activityParam) {
      setEmbedType('activity')
      setEmbedId(activityParam)
      setNewTag('Aktivität')
      setNewContent(titleParam ? titleParam + ' gemacht! ' : '')
      setShowCompose(true)
      setSearchParams({})
    }
  }, [])

  useEffect(() => { loadPosts() }, [])

  async function loadPosts() {
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 2000)
      const { data } = await supabase.from('community_posts').select('*, profiles(display_name, avatar_emoji)').order('created_at', { ascending: false }).abortSignal(controller.signal)
      clearTimeout(timer)
      if (data && data.length >= 3) setPosts(data)
    } catch {}
  }

  function toggleComments(id: string) {
    setExpandedComments(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  function toggleReaction(id: string, emoji: string) {
    setActiveReaction(prev => ({ ...prev, [id]: prev[id] === emoji ? '' : emoji }))
  }

  function selectEmbed(type: 'recipe' | 'activity', id: string) {
    setEmbedType(type)
    setEmbedId(id)
    setShowEmbedPicker(false)
    setEmbedSearch('')
  }

  function clearEmbed() { setEmbedType(null); setEmbedId(null) }

  const filtered = activeTag ? posts.filter(p => p.tag === activeTag) : posts
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }
  const totalReactions = posts.reduce((s, p) => s + (p.like_count || 0), 0)
  const totalComments = posts.reduce((s, p) => s + (p.comment_count || 0), 0)

  // Filter recipes/activities for embed picker
  const searchLower = embedSearch.toLowerCase()
  const filteredRecipes = recipes.filter(r => r.title.toLowerCase().includes(searchLower)).slice(0, 5)
  const filteredActivities = activities.filter(a => a.title.toLowerCase().includes(searchLower)).slice(0, 5)

  return (
    <>
      <Header />
      <div className="pb-24">
        {/* Hero */}
        <div className="mx-4 mt-2 mb-4 rounded-2xl bg-gradient-to-br from-tuki-mint/40 via-white to-tuki-mint-light/30 border border-tuki-mint/30 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Tuki Community</h2>
              <p className="text-xs text-gray-500 mt-0.5">{posts.length} Beiträge · {totalComments} Kommentare</p>
            </div>
            <button onClick={() => setShowCompose(!showCompose)} className="flex items-center gap-1.5 bg-tuki-rot text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all">
              <span className="text-base">{'✏️'}</span> Beitrag
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            {[{ val: totalReactions, label: 'Reactions' }, { val: posts.length, label: 'Familien' }, { val: '🔥', label: 'Aktiv heute' }].map((s, i) => (
              <div key={i} className="flex-1 bg-white/70 backdrop-blur-sm rounded-xl px-3 py-2 text-center border border-white/50">
                <div className="text-lg font-bold text-tuki-rot">{s.val}</div>
                <div className="text-[10px] text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Compose */}
        <AnimatePresence>
          {showCompose && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mx-4 mb-4 overflow-hidden">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-tuki-mint to-emerald-200 flex items-center justify-center text-lg">{'👨‍💻'}</div>
                  <span className="text-sm font-semibold text-gray-700">Dein Beitrag</span>
                </div>
                <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Was möchtest du teilen? Rezept-Tipp, Frage..." className="w-full h-24 text-sm bg-gray-50 rounded-xl border border-gray-200 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-tuki-mint/40 focus:border-tuki-mint" />

                {/* Embed preview */}
                {embedType && embedId && (
                  <div className="mt-2 relative">
                    <EmbedCard type={embedType} id={embedId} />
                    <button onClick={clearEmbed} className="absolute top-1 right-5 w-6 h-6 rounded-full bg-gray-200 text-gray-600 text-xs flex items-center justify-center hover:bg-gray-300">{'✕'}</button>
                  </div>
                )}

                {/* Embed picker */}
                <AnimatePresence>
                  {showEmbedPicker && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="mt-2 bg-gray-50 rounded-xl border border-gray-200 p-3">
                        <input value={embedSearch} onChange={e => setEmbedSearch(e.target.value)} placeholder="Rezept oder Aktivität suchen..." className="w-full text-xs bg-white rounded-lg border border-gray-200 px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-tuki-mint/30" />
                        {filteredRecipes.length > 0 && (
                          <div className="mb-2">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">{'🍳'} Rezepte</p>
                            {filteredRecipes.map(r => (
                              <button key={r.id} onClick={() => selectEmbed('recipe', r.id)} className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-white flex items-center gap-2 transition-colors">
                                <span>{r.emoji}</span> <span className="truncate">{r.title}</span>
                                <span className="text-gray-400 ml-auto shrink-0">{r.duration} Min.</span>
                              </button>
                            ))}
                          </div>
                        )}
                        {filteredActivities.length > 0 && (
                          <div>
                            <p className="text-[10px] font-semibold text-gray-400 uppercase mb-1">{'🎯'} Aktivitäten</p>
                            {filteredActivities.map(a => (
                              <button key={a.id} onClick={() => selectEmbed('activity', a.id)} className="w-full text-left text-xs py-1.5 px-2 rounded-lg hover:bg-white flex items-center gap-2 transition-colors">
                                <span>{a.emoji}</span> <span className="truncate">{a.title}</span>
                                <span className="text-gray-400 ml-auto shrink-0">{a.duration} Min.</span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 flex-wrap">
                      {Object.entries(tagConfig).map(([tag, conf]) => (
                        <button key={tag} onClick={() => setNewTag(tag)} className={'text-xs px-2.5 py-1 rounded-full border transition-all ' + (newTag === tag ? conf.bg + ' ' + conf.color + ' border-current font-semibold' : 'bg-gray-50 text-gray-500 border-gray-200')}>
                          {conf.emoji} {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <button onClick={() => setShowEmbedPicker(!showEmbedPicker)} className={'text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ' + (showEmbedPicker ? 'bg-tuki-mint-bg text-tuki-rot border-tuki-mint' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300')}>
                    {'🔗'} Rezept / Aktivität anhängen
                  </button>
                  <button onClick={() => { setShowCompose(false); setNewContent(''); clearEmbed() }} className="bg-tuki-rot text-white text-sm font-semibold px-5 py-2 rounded-xl active:scale-95 transition-all shadow-sm">Posten</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tag filter */}
        <div className="flex gap-1.5 px-4 mb-4 overflow-x-auto no-scrollbar py-1">
          <button onClick={() => setActiveTag(null)} className={'text-xs px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ' + (!activeTag ? 'bg-gray-800 text-white border-gray-800 font-semibold' : 'bg-white text-gray-600 border-gray-200')}>Alle</button>
          {Object.entries(tagConfig).map(([tag, conf]) => (
            <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} className={'text-xs px-3 py-1.5 rounded-full border transition-all whitespace-nowrap ' + (activeTag === tag ? conf.bg + ' ' + conf.color + ' border-current font-semibold' : 'bg-white text-gray-600 border-gray-200')}>
              {conf.emoji} {tag}
            </button>
          ))}
        </div>

        {/* Posts */}
        {loading ? (
          <div className="text-center py-16"><div className="text-3xl animate-bounce">{'🌱'}</div><p className="text-gray-400 text-sm mt-2">Community laden...</p></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 px-4"><div className="text-4xl mb-3">{'🔍'}</div><p className="text-gray-500 text-sm">Keine Beiträge in dieser Kategorie.</p></div>
        ) : (
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-3 px-4 md:columns-2 md:gap-3 md:space-y-0">
            {filtered.map((post, idx) => {
              const tag = tagConfig[post.tag] || tagConfig['Tipp']
              const grad = gradients[idx % gradients.length]
              const pr = post.reactions || {}
              const comments = seedComments[post.id] || []
              const isExpanded = expandedComments.has(post.id)
              return (
                <motion.div key={post.id} variants={item} className="card-lift bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden md:mb-3 md:break-inside-avoid">
                  <div className="flex items-center gap-3 px-4 pt-4 pb-2">
                    <div className={'w-10 h-10 rounded-full bg-gradient-to-br ' + grad + ' flex items-center justify-center text-lg shadow-sm'}>{post.avatar_emoji || '👪'}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-800 truncate">{post.profile_name || 'Tuki Familie'}</p>
                      <p className="text-[11px] text-gray-400">{timeAgo(post.created_at)}</p>
                    </div>
                    <span className={'text-[11px] px-2.5 py-1 rounded-full border font-medium ' + tag.bg + ' ' + tag.color}>{tag.emoji} {post.tag}</span>
                  </div>
                  <div className="px-4 pb-2"><p className="text-sm text-gray-700 leading-relaxed">{post.content}</p></div>
                  {post.embed_type && post.embed_id && <EmbedCard type={post.embed_type} id={post.embed_id} />}
                  {post.image_url && <img src={post.image_url} alt="" className="w-full h-52 object-cover" />}
                  {Object.keys(pr).length > 0 && (
                    <div className="flex items-center gap-1 px-4 py-2">
                      <div className="flex -space-x-1">{Object.entries(pr).slice(0, 3).map(([em]) => (
                        <span key={em} className="text-sm bg-white rounded-full border border-gray-100 w-6 h-6 flex items-center justify-center shadow-sm">{em}</span>
                      ))}</div>
                      <span className="text-xs text-gray-500 ml-1">{post.like_count}</span>
                      {(post.comment_count || 0) > 0 && <span className="text-xs text-gray-400 ml-auto">{post.comment_count} Kommentare</span>}
                    </div>
                  )}
                  <div className="flex items-center border-t border-gray-100">
                    <div className="flex-1 flex items-center gap-0.5 px-2 py-2">
                      {reactionEmojis.map(em => (
                        <button key={em} onClick={() => toggleReaction(post.id, em)} className={'text-base w-8 h-8 rounded-full flex items-center justify-center transition-all ' + (activeReaction[post.id] === em ? 'bg-tuki-mint-bg scale-125 shadow-sm' : 'hover:bg-gray-50 active:scale-110')}>{em}</button>
                      ))}
                    </div>
                    <button onClick={() => toggleComments(post.id)} className={'flex items-center gap-1.5 px-4 py-2 text-xs font-medium border-l border-gray-100 transition-all ' + (isExpanded ? 'text-tuki-rot bg-red-50/50' : 'text-gray-500 hover:text-gray-700')}>{'💬'} {post.comment_count || 0}</button>
                  </div>
                  <AnimatePresence>
                    {isExpanded && comments.length > 0 && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-gray-100 bg-gray-50/50">
                        <div className="p-3 space-y-2.5">
                          {comments.map((c, ci) => (
                            <div key={ci} className="flex gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm shrink-0">{c.emoji}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-2"><span className="text-xs font-semibold text-gray-700">{c.author}</span><span className="text-[10px] text-gray-400">{c.ago}</span></div>
                                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{c.text}</p>
                              </div>
                            </div>
                          ))}
                          <div className="flex gap-2 pt-1">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-tuki-mint to-emerald-200 flex items-center justify-center text-sm shrink-0">{'👨‍💻'}</div>
                            <input type="text" placeholder="Kommentar schreiben..." className="flex-1 text-xs bg-white rounded-full border border-gray-200 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-tuki-mint/30 focus:border-tuki-mint" />
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
