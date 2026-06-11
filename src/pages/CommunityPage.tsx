import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import { useTranslation } from '../i18n/useTranslation'
import { supabase } from '../lib/supabaseClient'

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
  profileId?: string
}

// ─── Helpers ────────────────────────────────────────────────
function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffHr = Math.floor(diffMs / 3600000)
  const diffDay = Math.floor(diffMs / 86400000)

  if (diffMin < 1) return 'gerade eben'
  if (diffMin < 60) return `vor ${diffMin} Min.`
  if (diffHr === 1) return 'vor 1 Std.'
  if (diffHr < 24) return `vor ${diffHr} Std.`
  if (diffDay === 1) return 'vor 1 Tag'
  if (diffDay < 7) return `vor ${diffDay} Tagen`
  if (diffDay < 30) {
    const weeks = Math.floor(diffDay / 7)
    return weeks === 1 ? 'vor 1 Woche' : `vor ${weeks} Wochen`
  }
  return date.toLocaleDateString('de-CH')
}

function isDbPost(id: string): boolean {
  // DB posts have UUID format (contains multiple dashes, length ~36)
  return id.length > 10 && id.split('-').length >= 4
}

// ─── Seed Posts (Demo Content) ──────────────────────────────
const seedPosts: CommunityPost[] = [
  {
    id: 'seed-1',
    author: 'Alena Z.',
    avatar: '\u{1F469}‍\u{1F9B0}',
    timeAgo: formatTimeAgo('2026-06-09T09:30:00Z'),
    content: 'Unser kleiner Chefkoch hat heute seine ersten Pancakes im Tuki gemacht! Er ist so stolz auf sich. Das Rezept aus der App war perfekt — nur 3 Zutaten und er konnte fast alles selbst machen.',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=300&fit=crop',
    likes: 24,
    comments: [
      { id: 'c1a', author: 'Marco B.', avatar: '\u{1F468}', timeAgo: formatTimeAgo('2026-06-09T11:00:00Z'), text: 'Super! Welches Rezept war das genau? Wir suchen noch einfache Sachen für unseren Kleinen.' },
      { id: 'c1b', author: 'Sarah K.', avatar: '\u{1F469}', timeAgo: formatTimeAgo('2026-06-09T12:15:00Z'), text: 'Das sieht so lecker aus! Die Pancakes aus der App sind bei uns auch der Hit.' },
      { id: 'c1c', author: 'Julia H.', avatar: '\u{1F469}‍\u{1F9B1}', timeAgo: formatTimeAgo('2026-06-09T13:40:00Z'), text: 'Toll! Ab welchem Alter klappt das gut?' },
    ],
    tag: 'Rezept',
  },
  {
    id: 'seed-2',
    author: 'Marco B.',
    avatar: '\u{1F468}',
    timeAgo: formatTimeAgo('2026-06-07T16:00:00Z'),
    content: 'Tipp für alle Tuki-Eltern: Wir haben den Tuki ans Waschbecken gestellt und unsere Tochter (2) wäscht jetzt jeden Abend selbst ihre Hände. Die Selbstständigkeit die das fördert ist unglaublich!',
    likes: 41,
    comments: [
      { id: 'c2a', author: 'Thomas M.', avatar: '\u{1F468}‍\u{1F9B2}', timeAgo: formatTimeAgo('2026-06-07T17:10:00Z'), text: 'Genau das gleiche bei uns! Der Tuki am Waschbecken ist ein Game-Changer.' },
      { id: 'c2b', author: 'Alena Z.', avatar: '\u{1F469}‍\u{1F9B0}', timeAgo: formatTimeAgo('2026-06-07T18:05:00Z'), text: 'Welche Höhenstufe nutzt ihr dafür?' },
      { id: 'c2c', author: 'Marco B.', avatar: '\u{1F468}', timeAgo: formatTimeAgo('2026-06-07T18:25:00Z'), text: '@Alena Stufe 2 bei uns, sie ist 87cm gross.' },
      { id: 'c2d', author: 'Sarah K.', avatar: '\u{1F469}', timeAgo: formatTimeAgo('2026-06-07T19:30:00Z'), text: 'Das probieren wir heute Abend direkt aus!' },
    ],
    tag: 'Tipp',
  },
  {
    id: 'seed-3',
    author: 'Sarah K.',
    avatar: '\u{1F469}',
    timeAgo: formatTimeAgo('2026-06-05T10:00:00Z'),
    content: 'Wir haben gestern die Dattel-Energy-Balls aus der App gemacht. Mein Sohn (3) hat die Kugeln geformt und war so fokussiert dabei — 20 Minuten ruhiges, konzentriertes Arbeiten. Besser als jedes Spielzeug!',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=300&fit=crop',
    likes: 35,
    comments: [
      { id: 'c3a', author: 'Julia H.', avatar: '\u{1F469}‍\u{1F9B1}', timeAgo: formatTimeAgo('2026-06-05T14:30:00Z'), text: 'Die Energy Balls sind bei uns auch der Favorit! Wir machen sie jede Woche.' },
      { id: 'c3b', author: 'Thomas M.', avatar: '\u{1F468}‍\u{1F9B2}', timeAgo: formatTimeAgo('2026-06-05T16:45:00Z'), text: '20 Minuten Ruhe? Das ist beeindruckend!' },
    ],
    tag: 'Rezept',
  },
  {
    id: 'seed-4',
    author: 'Julia H.',
    avatar: '\u{1F469}‍\u{1F9B1}',
    timeAgo: formatTimeAgo('2026-06-02T08:30:00Z'),
    content: 'Frage an die Community: Welche Höhenstufe nutzt ihr bei einem 18 Monate alten Kind? Unsere Kleine will unbedingt an die Arbeitsfläche aber ich bin unsicher welche Einstellung am besten passt.',
    likes: 12,
    comments: [
      { id: 'c4a', author: 'Marco B.', avatar: '\u{1F468}', timeAgo: formatTimeAgo('2026-06-02T09:10:00Z'), text: 'Bei 18 Monaten haben wir Stufe 3 genutzt. Kommt aber auf die Grösse an!' },
      { id: 'c4b', author: 'Alena Z.', avatar: '\u{1F469}‍\u{1F9B0}', timeAgo: formatTimeAgo('2026-06-02T10:05:00Z'), text: 'Wir auch Stufe 3. Am besten einmal ausprobieren, ob sie bequem an die Kante kommt.' },
      { id: 'c4c', author: 'Thomas M.', avatar: '\u{1F468}‍\u{1F9B2}', timeAgo: formatTimeAgo('2026-06-02T13:20:00Z'), text: 'Schau mal in der App unter dem Tuki-Guide, da gibt es eine Tabelle mit Empfehlungen nach Grösse.' },
      { id: 'c4d', author: 'Sarah K.', avatar: '\u{1F469}', timeAgo: formatTimeAgo('2026-06-02T15:00:00Z'), text: 'Stufe 3 ist ein guter Start. Unsere war mit 18 Monaten auch auf Stufe 3.' },
      { id: 'c4e', author: 'Julia H.', avatar: '\u{1F469}‍\u{1F9B1}', timeAgo: formatTimeAgo('2026-06-02T18:30:00Z'), text: 'Danke euch allen! Wir probieren Stufe 3 aus.' },
    ],
    tag: 'Frage',
  },
  {
    id: 'seed-5',
    author: 'Thomas M.',
    avatar: '\u{1F468}‍\u{1F9B2}',
    timeAgo: formatTimeAgo('2026-05-29T15:00:00Z'),
    content: 'Herbstblätter-Kunstwerk mit unserer 4-Jährigen gemacht. Sie hat im Tuki am Küchentisch die schönsten Blätter-Tiere geklebt. Dieses Kind hat mehr Kreativität als ich jemals haben werde \u{1F604}',
    likes: 52,
    comments: [
      { id: 'c5a', author: 'Alena Z.', avatar: '\u{1F469}‍\u{1F9B0}', timeAgo: formatTimeAgo('2026-05-29T16:20:00Z'), text: 'Wie schön! Hast du ein Foto?' },
      { id: 'c5b', author: 'Sarah K.', avatar: '\u{1F469}', timeAgo: formatTimeAgo('2026-05-30T08:45:00Z'), text: 'Das müssen wir auch unbedingt ausprobieren! Perfekt für den Herbst.' },
      { id: 'c5c', author: 'Marco B.', avatar: '\u{1F468}', timeAgo: formatTimeAgo('2026-05-30T11:10:00Z'), text: 'Tolle Idee! Blätter-Tiere klingt super kreativ.' },
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

const postTagOptions = ['Rezept', 'Tipp', 'Frage', 'Aktivität']

function loadClubMembership(): boolean {
  try {
    const state = localStorage.getItem('tuki-family-state')
    if (state) {
      const parsed = JSON.parse(state)
      return parsed.isClubMember === true
    }
  } catch {}
  return false
}

function saveClubMembership(value: boolean) {
  try {
    const state = localStorage.getItem('tuki-family-state')
    if (state) {
      const parsed = JSON.parse(state)
      parsed.isClubMember = value
      localStorage.setItem('tuki-family-state', JSON.stringify(parsed))
    }
  } catch {}
}

export default function CommunityPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'feed' | 'join'>('feed')
  const [liked, setLiked] = useState<string[]>([])
  const [expandedComments, setExpandedComments] = useState<string[]>([])
  const [newComments, setNewComments] = useState<Record<string, Comment[]>>({})
  const [commentText, setCommentText] = useState<Record<string, string>>({})
  const commentInputRefs = useRef<Record<string, HTMLInputElement | null>>({})
  const [isClubMember, setIsClubMember] = useState(loadClubMembership)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostText, setNewPostText] = useState('')
  const [newPostTag, setNewPostTag] = useState('Tipp')

  // ─── Supabase State ─────────────────────────────────────
  const [dbPosts, setDbPosts] = useState<CommunityPost[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [userDisplayName, setUserDisplayName] = useState('Meine Familie')
  const [userAvatar, setUserAvatar] = useState('\u{1F9D1}')
  const [dbLikedPostIds, setDbLikedPostIds] = useState<string[]>([])

  // ─── Fetch from Supabase on mount ───────────────────────
  useEffect(() => {
    let cancelled = false

    async function init() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user || cancelled) return
      setUserId(user.id)

      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name, avatar_emoji')
        .eq('id', user.id)
        .single()

      if (profile && !cancelled) {
        setUserDisplayName(profile.display_name || 'Meine Familie')
        setUserAvatar(profile.avatar_emoji || '\u{1F9D1}')
      }

      // Fetch all community posts
      const { data: posts, error: postsError } = await supabase
        .from('community_posts')
        .select('id, profile_id, content, image_url, tag, created_at')
        .order('created_at', { ascending: false })

      if (postsError || !posts || cancelled) return

      // Fetch author profiles for all posts
      const profileIds = [...new Set(posts.map(p => p.profile_id))]
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, display_name, avatar_emoji')
        .in('id', profileIds)

      const profileMap = new Map(
        (profiles || []).map(p => [p.id, p])
      )

      // Fetch all comments for these posts
      const postIds = posts.map(p => p.id)
      const { data: comments } = postIds.length > 0
        ? await supabase
            .from('post_comments')
            .select('id, post_id, profile_id, content, created_at')
            .in('post_id', postIds)
            .order('created_at', { ascending: true })
        : { data: [] }

      // Fetch comment author profiles
      const commentProfileIds = [...new Set((comments || []).map(c => c.profile_id))]
      const newProfileIds = commentProfileIds.filter(id => !profileMap.has(id))
      if (newProfileIds.length > 0) {
        const { data: commentProfiles } = await supabase
          .from('profiles')
          .select('id, display_name, avatar_emoji')
          .in('id', newProfileIds)
        ;(commentProfiles || []).forEach(p => profileMap.set(p.id, p))
      }

      // Fetch like counts per post
      const { data: allLikes } = postIds.length > 0
        ? await supabase.from('post_likes').select('post_id').in('post_id', postIds)
        : { data: [] }

      const likeCounts = new Map<string, number>()
      ;(allLikes || []).forEach(l => {
        likeCounts.set(l.post_id, (likeCounts.get(l.post_id) || 0) + 1)
      })

      // Fetch user's own likes
      const { data: myLikes } = await supabase
        .from('post_likes')
        .select('post_id')
        .eq('profile_id', user.id)

      if (!cancelled) {
        setDbLikedPostIds((myLikes || []).map(l => l.post_id))

        // Map posts to CommunityPost format
        const mapped: CommunityPost[] = posts.map(p => {
          const authorProfile = profileMap.get(p.profile_id)
          const isOwnPost = p.profile_id === user.id
          const postComments = (comments || [])
            .filter(c => c.post_id === p.id)
            .map(c => {
              const commentProfile = profileMap.get(c.profile_id)
              const isOwnComment = c.profile_id === user.id
              return {
                id: c.id,
                author: isOwnComment ? 'Du' : (commentProfile?.display_name || 'Tuki Familie'),
                avatar: commentProfile?.avatar_emoji || '\u{1F9D1}',
                timeAgo: formatTimeAgo(c.created_at),
                text: c.content,
              }
            })

          return {
            id: p.id,
            author: isOwnPost ? 'Du' : (authorProfile?.display_name || 'Tuki Familie'),
            avatar: authorProfile?.avatar_emoji || '\u{1F9D1}',
            timeAgo: formatTimeAgo(p.created_at),
            content: p.content,
            image: p.image_url || undefined,
            likes: likeCounts.get(p.id) || 0,
            comments: postComments,
            tag: p.tag,
            profileId: p.profile_id,
          }
        })

        setDbPosts(mapped)
      }
    }

    init()
    return () => { cancelled = true }
  }, [])

  // ─── Club ───────────────────────────────────────────────
  const handleJoinClub = () => {
    setIsClubMember(true)
    saveClubMembership(true)
    setShowConfetti(true)
    setShowWelcome(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const handleWelcomeDone = () => {
    setShowWelcome(false)
    setActiveTab('feed')
  }

  // ─── Like ───────────────────────────────────────────────
  const toggleLike = useCallback(async (id: string) => {
    const isCurrentlyLiked = liked.includes(id) || dbLikedPostIds.includes(id)

    if (isDbPost(id) && userId) {
      // Optimistic update
      if (isCurrentlyLiked) {
        setDbLikedPostIds(prev => prev.filter(x => x !== id))
        setDbPosts(prev => prev.map(p =>
          p.id === id ? { ...p, likes: Math.max(0, p.likes - 1) } : p
        ))
        // Delete from Supabase
        await supabase.from('post_likes').delete()
          .eq('post_id', id).eq('profile_id', userId)
      } else {
        setDbLikedPostIds(prev => [...prev, id])
        setDbPosts(prev => prev.map(p =>
          p.id === id ? { ...p, likes: p.likes + 1 } : p
        ))
        // Insert into Supabase
        await supabase.from('post_likes').insert({
          post_id: id, profile_id: userId,
        })
      }
    } else {
      // Seed post: local only
      setLiked(l => l.includes(id) ? l.filter(x => x !== id) : [...l, id])
    }
  }, [liked, dbLikedPostIds, userId])

  // ─── Comments ───────────────────────────────────────────
  const toggleComments = (id: string) => {
    setExpandedComments(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
    setTimeout(() => {
      commentInputRefs.current[id]?.focus()
    }, 300)
  }

  const handleAddComment = useCallback(async (postId: string) => {
    const text = (commentText[postId] || '').trim()
    if (!text) return

    const comment: Comment = {
      id: `new-${Date.now()}`,
      author: 'Du',
      avatar: userAvatar,
      timeAgo: 'gerade eben',
      text,
    }

    if (isDbPost(postId) && userId) {
      // Optimistic local update
      setDbPosts(prev => prev.map(p =>
        p.id === postId
          ? { ...p, comments: [...p.comments, comment] }
          : p
      ))
      setCommentText(prev => ({ ...prev, [postId]: '' }))

      // Save to Supabase
      const { data, error } = await supabase.from('post_comments').insert({
        post_id: postId,
        profile_id: userId,
        content: text,
      }).select('id').single()

      // Update local comment with real ID
      if (data && !error) {
        setDbPosts(prev => prev.map(p =>
          p.id === postId
            ? {
                ...p,
                comments: p.comments.map(c =>
                  c.id === comment.id ? { ...c, id: data.id } : c
                ),
              }
            : p
        ))
      }
    } else {
      // Seed post: local only
      setNewComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), comment],
      }))
      setCommentText(prev => ({ ...prev, [postId]: '' }))
    }
  }, [commentText, userId, userAvatar])

  // ─── New Post ───────────────────────────────────────────
  const handleNewPost = useCallback(async () => {
    if (!newPostText.trim()) return

    if (userId) {
      // Optimistic local add
      const tempId = `temp-${Date.now()}`
      const post: CommunityPost = {
        id: tempId,
        author: 'Du',
        avatar: userAvatar,
        timeAgo: 'gerade eben',
        content: newPostText.trim(),
        likes: 0,
        comments: [],
        tag: newPostTag,
        profileId: userId,
      }
      setDbPosts(prev => [post, ...prev])
      setNewPostText('')
      setShowNewPost(false)

      // Save to Supabase
      const { data, error } = await supabase.from('community_posts').insert({
        profile_id: userId,
        content: newPostText.trim(),
        tag: newPostTag,
      }).select('id, created_at').single()

      // Update local post with real ID
      if (data && !error) {
        setDbPosts(prev => prev.map(p =>
          p.id === tempId ? { ...p, id: data.id, timeAgo: formatTimeAgo(data.created_at) } : p
        ))
      } else if (error) {
        console.warn('Failed to save post to Supabase:', error.message)
      }
    } else {
      // No auth: local only (shouldn't happen in normal flow)
      const post: CommunityPost = {
        id: `local-${Date.now()}`,
        author: 'Du',
        avatar: '\u{1F9D1}',
        timeAgo: 'gerade eben',
        content: newPostText.trim(),
        likes: 0,
        comments: [],
        tag: newPostTag,
      }
      setDbPosts(prev => [post, ...prev])
      setNewPostText('')
      setShowNewPost(false)
    }
  }, [newPostText, newPostTag, userId, userAvatar])

  // ─── Computed ───────────────────────────────────────────
  const getAllComments = (post: CommunityPost): Comment[] => {
    // For DB posts, comments are already in the post object
    if (isDbPost(post.id) || post.id.startsWith('temp-') || post.id.startsWith('local-')) {
      return post.comments
    }
    // For seed posts, merge hardcoded + local comments
    return [...post.comments, ...(newComments[post.id] || [])]
  }

  const isPostLiked = (id: string): boolean => {
    return liked.includes(id) || dbLikedPostIds.includes(id)
  }

  const getPostLikeCount = (post: CommunityPost): number => {
    if (isDbPost(post.id) || post.id.startsWith('temp-') || post.id.startsWith('local-')) {
      // DB post: likes count is already adjusted by toggleLike
      return post.likes + (dbLikedPostIds.includes(post.id) ? 0 : 0)
    }
    // Seed post: base count + local like
    return post.likes + (liked.includes(post.id) ? 1 : 0)
  }

  const allPosts = [...dbPosts, ...seedPosts]

  // Confetti particles
  const confettiColors = ['#8F5652', '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']

  return (
    <div className="pb-24">
      <Header title={t.community.title} />

      {/* Confetti overlay */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                  scale: Math.random() * 0.5 + 0.5,
                }}
                animate={{
                  y: window.innerHeight + 20,
                  rotate: Math.random() * 720 - 360,
                  x: Math.random() * window.innerWidth,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  delay: Math.random() * 0.5,
                  ease: 'linear',
                }}
                className="absolute w-3 h-3 rounded-sm"
                style={{ backgroundColor: confettiColors[i % confettiColors.length] }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Welcome overlay */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-6"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                className="text-6xl mb-4"
              >
                {'\u{1F389}'}
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
              >
                Willkommen im Club!
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed"
              >
                Du bist jetzt Teil der Tuki Family Community. Teile deine Erfahrungen, entdecke exklusive Inhalte und verbinde dich mit anderen Tuki-Familien!
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-2 mb-6"
              >
                {['✅ Community-Feed freigeschaltet', '✅ Eigene Beiträge schreiben', '✅ Exklusive Inhalte'].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="text-sm text-gray-600 dark:text-gray-300 text-left px-4"
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                onClick={handleWelcomeDone}
                className="w-full py-3.5 bg-tuki-rot text-white font-semibold rounded-xl text-sm active:scale-95 transition-transform"
              >
                Los geht's!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex gap-1 mx-4 mt-1 mb-4 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        <button
          onClick={() => setActiveTab('feed')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'feed'
              ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {t.community.feedTab}
        </button>
        <button
          onClick={() => setActiveTab('join')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
            activeTab === 'join'
              ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {isClubMember ? '\u{1F3C6} Tuki Club' : t.community.clubTab}
        </button>
      </div>

      {activeTab === 'feed' ? (
        <motion.div
          className="space-y-4 px-4"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Join hint for non-members */}
          {!isClubMember && (
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            >
              <button
                onClick={() => setActiveTab('join')}
                className="w-full flex items-center gap-3 bg-gradient-to-r from-tuki-rot/5 to-tuki-rot/10 dark:from-tuki-rot/10 dark:to-tuki-rot/20 rounded-2xl border border-tuki-rot/20 p-4 text-left hover:border-tuki-rot/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-tuki-rot/15 flex items-center justify-center text-lg shrink-0">
                  {'\u{1F3C6}'}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 block">Tritt dem Tuki Club bei</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">Schreibe eigene Beiträge und werde Teil der Community</span>
                </div>
                <span className="text-tuki-rot text-xs font-semibold shrink-0">Beitreten →</span>
              </button>
            </motion.div>
          )}

          {/* New Post button for members */}
          {isClubMember && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {!showNewPost ? (
                <button
                  onClick={() => setShowNewPost(true)}
                  className="w-full flex items-center gap-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 text-left hover:border-tuki-rot/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-tuki-rot/10 flex items-center justify-center text-lg shrink-0">
                    {userAvatar}
                  </div>
                  <span className="text-sm text-gray-400 dark:text-gray-500">Was möchtest du teilen?</span>
                  <span className="ml-auto text-tuki-rot text-xl">+</span>
                </button>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-tuki-rot/30 p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-tuki-rot/10 flex items-center justify-center text-lg shrink-0">
                      {userAvatar}
                    </div>
                    <span className="font-semibold text-sm text-gray-800 dark:text-white">{userDisplayName}</span>
                    <div className="ml-auto flex gap-1.5">
                      {postTagOptions.map(tag => (
                        <button
                          key={tag}
                          onClick={() => setNewPostTag(tag)}
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full transition-colors ${
                            newPostTag === tag
                              ? tagColors[tag] || 'bg-gray-200 text-gray-700'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                          }`}
                        >
                          {t.community.postTags[tag.toLowerCase()] || tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    value={newPostText}
                    onChange={e => setNewPostText(e.target.value)}
                    placeholder="Erzähl der Community von deinem Erlebnis..."
                    className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none resize-none min-h-[80px] border border-gray-100 dark:border-gray-600 focus:border-tuki-rot/30"
                    autoFocus
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => { setShowNewPost(false); setNewPostText('') }}
                      className="px-4 py-2 text-xs text-gray-500 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={handleNewPost}
                      disabled={!newPostText.trim()}
                      className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all ${
                        newPostText.trim()
                          ? 'bg-tuki-rot text-white active:scale-95'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-300 dark:text-gray-500'
                      }`}
                    >
                      Posten
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {allPosts.map(post => {
            const allComments = getAllComments(post)
            const isExpanded = expandedComments.includes(post.id)
            const postLiked = isPostLiked(post.id)
            const likeCount = getPostLikeCount(post)

            return (
              <motion.div
                key={post.id}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                {/* Post Header */}
                <div className="flex items-center gap-3 p-4 pb-2">
                  <div className="w-10 h-10 rounded-full bg-tuki-mint-bg flex items-center justify-center text-lg">
                    {post.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-800 dark:text-white">{post.author}</span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tagColors[post.tag] || 'bg-gray-100 text-gray-500'}`}>
                        {t.community.postTags[post.tag.toLowerCase()] || post.tag}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400">{post.timeAgo}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{post.content}</p>
                </div>

                {/* Image */}
                {post.image && (
                  <img src={post.image} alt="" className="w-full h-48 object-cover" loading="lazy" />
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 px-4 py-3 border-t border-gray-50 dark:border-gray-700">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className="flex items-center gap-1.5 text-xs"
                  >
                    <span>{postLiked ? '❤️' : '\u{1F90D}'}</span>
                    <span className="text-gray-500 dark:text-gray-400">{likeCount}</span>
                  </button>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className={`flex items-center gap-1.5 text-xs ${isExpanded ? 'text-tuki-rot' : ''}`}
                  >
                    <span>{'\u{1F4AC}'}</span>
                    <span className={isExpanded ? 'text-tuki-rot font-medium' : 'text-gray-500 dark:text-gray-400'}>{allComments.length}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-xs ml-auto">
                    <span>{'\u{1F517}'}</span>
                    <span className="text-gray-500 dark:text-gray-400">{t.community.share}</span>
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
                      <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
                        {/* Comment list */}
                        <div className="px-4 pt-3 space-y-3">
                          {allComments.map(comment => (
                            <div key={comment.id} className="flex gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-tuki-mint-bg flex items-center justify-center text-sm shrink-0 mt-0.5">
                                {comment.avatar}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-xs font-semibold text-gray-800 dark:text-white">{comment.author}</span>
                                  <span className="text-[10px] text-gray-400">{comment.timeAgo}</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-0.5">{comment.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Comment input */}
                        <div className="flex items-center gap-2 px-4 py-3 mt-1">
                          <div className="w-7 h-7 rounded-full bg-tuki-rot/10 flex items-center justify-center text-sm shrink-0">
                            {userAvatar}
                          </div>
                          <div className="flex-1 flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-600 pl-3 pr-1 py-1">
                            <input
                              ref={el => { commentInputRefs.current[post.id] = el }}
                              type="text"
                              value={commentText[post.id] || ''}
                              onChange={e => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                              onKeyDown={e => { if (e.key === 'Enter') handleAddComment(post.id) }}
                              placeholder={t.community.commentPlaceholder}
                              className="flex-1 text-xs bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              disabled={!(commentText[post.id] || '').trim()}
                              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                                (commentText[post.id] || '').trim()
                                  ? 'bg-tuki-rot text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-300 dark:text-gray-500'
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
          {isClubMember ? (
            /* Member view */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Member card */}
              <div className="bg-gradient-to-br from-tuki-rot to-tuki-rot-dark rounded-3xl p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-4xl">{'\u{1F3C6}'}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">Tuki Family Club</h2>
                <div className="inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 mb-3">
                  <span className="text-xs">{'✅'}</span>
                  <span className="text-white text-xs font-medium">Aktives Mitglied</span>
                </div>
                <p className="text-white/70 text-xs">Mitglied seit heute</p>
              </div>

              {/* Member benefits */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
                <h3 className="font-semibold text-sm text-gray-800 dark:text-white mb-3">Deine Vorteile</h3>
                <div className="space-y-2.5">
                  {[
                    { icon: '\u{1F4AC}', text: 'Eigene Beiträge schreiben', active: true },
                    { icon: '\u{1F468}‍\u{1F469}‍\u{1F467}‍\u{1F466}', text: 'Private Eltern-Community', active: true },
                    { icon: '\u{1F4F8}', text: 'Monatliche Foto-Challenges', active: true },
                    { icon: '\u{1F370}', text: 'Exklusive Premium-Rezepte', active: false },
                    { icon: '\u{1F381}', text: 'Frühzeitiger Zugang zu neuen Produkten', active: false },
                    { icon: '\u{1F4E9}', text: 'Direkte Linie zum Tuki-Team', active: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-lg w-7 text-center">{item.icon}</span>
                      <span className={`text-sm flex-1 ${item.active ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}`}>{item.text}</span>
                      {item.active ? (
                        <span className="text-xs text-green-600 font-medium bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">Aktiv</span>
                      ) : (
                        <span className="text-xs text-gray-400 font-medium bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded-full">Bald</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick action */}
              <button
                onClick={() => { setActiveTab('feed'); setShowNewPost(true) }}
                className="w-full py-3.5 bg-tuki-rot text-white font-semibold rounded-xl text-sm active:scale-95 transition-transform flex items-center justify-center gap-2"
              >
                <span>{'✏️'}</span> Beitrag schreiben
              </button>
            </motion.div>
          ) : (
            /* Non-member join view */
            <div className="bg-gradient-to-br from-tuki-rot to-tuki-rot-dark rounded-3xl p-6 text-center">
              <span className="text-5xl block mb-4">{'\u{1F3C6}'}</span>
              <h2 className="text-xl font-bold text-white mb-2">{t.community.clubTitle}</h2>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                {t.community.clubDescription}
              </p>

              <div className="space-y-3 text-left mb-6">
                {(t.community.clubFeatures as string[]).map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                    <span className="text-lg">{'✨'}</span>
                    <span className="text-white text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleJoinClub}
                className="w-full py-3.5 bg-white text-tuki-rot font-semibold rounded-xl text-sm shadow-lg active:scale-95 transition-transform"
              >
                {t.community.joinFree}
              </button>
              <p className="text-white/50 text-[10px] mt-3">
                {t.community.joinNote}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
