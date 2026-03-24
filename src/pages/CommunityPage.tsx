import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '../components/Header'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

interface CommunityPost {
  id: string
  profile_id: string
  content: string
  image_url?: string
  tag: string
  created_at: string
  profiles: { display_name: string; avatar_emoji: string }
  like_count: number
  comment_count: number
}

interface Comment {
  id: string
  post_id: string
  profile_id: string
  content: string
  created_at: string
  profiles: { display_name: string; avatar_emoji: string }
}

const tagColors: Record<string, string> = {
  'Rezept': 'bg-orange-100 text-orange-700',
  'Tipp': 'bg-blue-100 text-blue-700',
  'Frage': 'bg-purple-100 text-purple-700',
  'Aktivitaet': 'bg-green-100 text-green-700',
}

const tagOptions = ['Rezept', 'Tipp', 'Frage', 'Aktivitaet']

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'gerade eben'
  if (mins < 60) return `vor ${mins} Min.`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `vor ${hours} Std.`
  const days = Math.floor(hours / 24)
  return `vor ${days} Tag${days > 1 ? 'en' : ''}`
}

const MAX_CHARS = 500

export default function CommunityPage() {
  const { user, profile } = useAuth()
  const [activeTab, setActiveTab] = useState<'feed' | 'write'>('feed')
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // New post form
  const [newContent, setNewContent] = useState('')
  const [newTag, setNewTag] = useState('Tipp')
  const [posting, setPosting] = useState(false)
  const [postSuccess, setPostSuccess] = useState(false)

  // Comments state
  const [expandedComments, setExpandedComments] = useState<string | null>(null)
  const [comments, setComments] = useState<Record<string, Comment[]>>({})
  const [commentText, setCommentText] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)

  useEffect(() => {
    loadPosts()
    if (user) loadLikes()
  }, [user])

  async function loadPosts() {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchErr } = await supabase
        .from('community_posts')
        .select('*, profiles(display_name, avatar_emoji)')
        .order('created_at', { ascending: false })
        .limit(30)

      if (fetchErr) throw fetchErr

      if (data) {
        const postsWithCounts = await Promise.all(
          data.map(async (post) => {
            const [likeRes, commentRes] = await Promise.all([
              supabase.from('post_likes').select('*', { count: 'exact', head: true }).eq('post_id', post.id),
              supabase.from('post_comments').select('*', { count: 'exact', head: true }).eq('post_id', post.id),
            ])
            return { ...post, like_count: likeRes.count || 0, comment_count: commentRes.count || 0 }
          })
        )
        setPosts(postsWithCounts as CommunityPost[])
      }
    } catch (err) {
      console.warn('Failed to load posts:', err)
      setError('Beitraege konnten nicht geladen werden.')
    }
    setLoading(false)
  }

  async function loadLikes() {
    if (!user) return
    try {
      const { data } = await supabase.from('post_likes').select('post_id').eq('profile_id', user.id)
      if (data) setLikedPosts(data.map(l => l.post_id))
    } catch (err) {
      console.warn('Failed to load likes:', err)
    }
  }

  async function toggleLike(postId: string) {
    if (!user) return
    const isLiked = likedPosts.includes(postId)
    setLikedPosts(l => isLiked ? l.filter(id => id !== postId) : [...l, postId])
    setPosts(ps => ps.map(p => p.id === postId
      ? { ...p, like_count: p.like_count + (isLiked ? -1 : 1) } : p
    ))
    try {
      if (isLiked) {
        await supabase.from('post_likes').delete().eq('post_id', postId).eq('profile_id', user.id)
      } else {
        await supabase.from('post_likes').insert({ post_id: postId, profile_id: user.id })
      }
    } catch (err) {
      console.warn('Like toggle failed:', err)
      setLikedPosts(l => isLiked ? [...l, postId] : l.filter(id => id !== postId))
    }
  }

  async function submitPost() {
    if (!user || !newContent.trim()) return
    setPosting(true)
    try {
      const { error: insertErr } = await supabase.from('community_posts').insert({
        profile_id: user.id, content: newContent.trim(), tag: newTag,
      })
      if (insertErr) throw insertErr
      setNewContent('')
      setPostSuccess(true)
      setTimeout(() => { setPostSuccess(false); setActiveTab('feed') }, 1500)
      await loadPosts()
    } catch (err) {
      console.warn('Post failed:', err)
      setError('Beitrag konnte nicht gepostet werden.')
    }
    setPosting(false)
  }

  // --- Comments ---
  async function loadComments(postId: string) {
    setCommentLoading(true)
    try {
      const { data, error: fetchErr } = await supabase
        .from('post_comments')
        .select('*, profiles(display_name, avatar_emoji)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true })
        .limit(50)
      if (fetchErr) throw fetchErr
      setComments(c => ({ ...c, [postId]: (data || []) as Comment[] }))
    } catch (err) {
      console.warn('Failed to load comments:', err)
    }
    setCommentLoading(false)
  }

  async function submitComment(postId: string) {
    if (!user || !commentText.trim()) return
    try {
      const { error: insertErr } = await supabase.from('post_comments').insert({
        post_id: postId, profile_id: user.id, content: commentText.trim(),
      })
      if (insertErr) throw insertErr
      setCommentText('')
      await loadComments(postId)
      setPosts(ps => ps.map(p => p.id === postId ? { ...p, comment_count: p.comment_count + 1 } : p))
    } catch (err) {
      console.warn('Comment failed:', err)
    }
  }

  function toggleComments(postId: string) {
    if (expandedComments === postId) {
      setExpandedComments(null)
    } else {
      setExpandedComments(postId)
      if (!comments[postId]) loadComments(postId)
    }
    setCommentText('')
  }

  return (
    <div className="pb-24">
      <Header title="Community" />

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mx-4 mb-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2"
          >
            <span className="text-sm text-red-600 flex-1">{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 text-xs font-medium">OK</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex gap-1 mx-4 mt-1 mb-4 bg-gray-100 rounded-xl p-1">
        {(['feed', 'write'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400'
            }`}
          >
            {tab === 'feed' ? 'Feed' : 'Neuer Beitrag'}
          </button>
        ))}
      </div>

      {activeTab === 'feed' ? (
        <div>
          {loading ? (
            <div className="text-center py-16">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                className="w-8 h-8 border-2 border-gray-200 border-t-tuki-rot rounded-full mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Lade Beitraege...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 px-6">
              <span className="text-5xl block mb-4">&#x1F331;</span>
              <p className="text-gray-600 font-medium">Noch keine Beitraege</p>
              <p className="text-gray-400 text-sm mt-1">Sei der Erste und teile etwas mit der Community!</p>
              <button onClick={() => setActiveTab('write')}
                className="mt-4 px-6 py-2.5 gradient-rot text-white font-semibold rounded-xl text-sm">
                Ersten Beitrag schreiben
              </button>
            </div>
          ) : (
            <motion.div className="space-y-4 px-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0"
              initial="hidden" animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {posts.map(post => (
                <motion.div key={post.id}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
                >
                  {/* Post Header */}
                  <div className="flex items-center gap-3 p-4 pb-2">
                    <div className="w-10 h-10 rounded-full bg-tuki-mint-bg flex items-center justify-center text-lg">
                      {post.profiles?.avatar_emoji || '\uD83D\uDC64'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-800 truncate">
                          {post.profiles?.display_name || 'Anonym'}
                        </span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${tagColors[post.tag] || 'bg-gray-100 text-gray-500'}`}>
                          {post.tag}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400">{timeAgo(post.created_at)}</span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-3">
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                  </div>
                  {post.image_url && (
                    <img src={post.image_url} alt="" className="w-full h-48 object-cover" loading="lazy" />
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 px-4 py-3 border-t border-gray-50">
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-1.5 text-xs">
                      <span className="text-base">{likedPosts.includes(post.id) ? '\u2764\uFE0F' : '\uD83E\uDD0D'}</span>
                      <span className="text-gray-500">{post.like_count}</span>
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => toggleComments(post.id)}
                      className={`flex items-center gap-1.5 text-xs ${expandedComments === post.id ? 'text-tuki-rot' : ''}`}>
                      <span className="text-base">&#x1F4AC;</span>
                      <span className="text-gray-500">{post.comment_count}</span>
                    </motion.button>
                  </div>

                  {/* Comments Section */}
                  <AnimatePresence>
                    {expandedComments === post.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                        className="border-t border-gray-50 overflow-hidden"
                      >
                        <div className="p-4 pt-3 space-y-3">
                          {commentLoading && !comments[post.id] ? (
                            <p className="text-xs text-gray-400 text-center py-2">Lade Kommentare...</p>
                          ) : (comments[post.id] || []).length === 0 ? (
                            <p className="text-xs text-gray-400 text-center py-1">Noch keine Kommentare</p>
                          ) : (
                            <div className="space-y-2.5 max-h-48 overflow-y-auto">
                              {(comments[post.id] || []).map(c => (
                                <div key={c.id} className="flex gap-2">
                                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs shrink-0">
                                    {c.profiles?.avatar_emoji || '\uD83D\uDC64'}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-baseline gap-1.5">
                                      <span className="text-xs font-semibold text-gray-700">{c.profiles?.display_name || 'Anonym'}</span>
                                      <span className="text-[9px] text-gray-400">{timeAgo(c.created_at)}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-0.5">{c.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          {/* Comment Input */}
                          <div className="flex gap-2 items-end pt-1">
                            <div className="w-7 h-7 rounded-full bg-tuki-mint-bg flex items-center justify-center text-xs shrink-0">
                              {profile?.avatar_emoji || '\uD83D\uDC64'}
                            </div>
                            <input
                              type="text" value={commentText}
                              onChange={e => setCommentText(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && submitComment(post.id)}
                              placeholder="Kommentar schreiben..."
                              className="flex-1 text-xs bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 focus:outline-none focus:border-tuki-mint"
                            />
                            <motion.button whileTap={{ scale: 0.9 }}
                              onClick={() => submitComment(post.id)}
                              disabled={!commentText.trim()}
                              className="text-xs font-semibold text-tuki-rot disabled:text-gray-300 px-2 py-2"
                            >
                              Senden
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      ) : (
        /* Write Tab */
        <div className="px-4">
          <AnimatePresence>
            {postSuccess && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
                <span className="text-2xl block mb-1">&#x2705;</span>
                <p className="text-sm font-medium text-green-700">Beitrag gepostet!</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-tuki-mint-bg flex items-center justify-center text-lg">
                {profile?.avatar_emoji || '\uD83D\uDC64'}
              </div>
              <span className="font-semibold text-sm text-gray-800">{profile?.display_name || 'Du'}</span>
            </div>
            <textarea value={newContent}
              onChange={e => { if (e.target.value.length <= MAX_CHARS) setNewContent(e.target.value) }}
              placeholder="Was moechtest du teilen? Rezept-Tipp, Aktivitaets-Idee, Frage..."
              rows={4}
              className="w-full px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint focus:ring-2 focus:ring-tuki-mint/30 resize-none"
            />
            <div className="flex justify-between items-center mt-1 mb-3">
              <div className="flex gap-2">
                {tagOptions.map(tag => (
                  <button key={tag} onClick={() => setNewTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      newTag === tag ? tagColors[tag] : 'bg-gray-100 text-gray-400'
                    }`}>
                    {tag}
                  </button>
                ))}
              </div>
              <span className={`text-[10px] ${newContent.length > MAX_CHARS * 0.9 ? 'text-red-400' : 'text-gray-300'}`}>
                {newContent.length}/{MAX_CHARS}
              </span>
            </div>
            <motion.button whileTap={{ scale: 0.98 }}
              onClick={submitPost}
              disabled={posting || !newContent.trim()}
              className="w-full py-3 gradient-rot text-white font-semibold rounded-xl text-sm disabled:opacity-50">
              {posting ? 'Wird gepostet...' : 'Beitrag teilen'}
            </motion.button>
          </div>
        </div>
      )}
    </div>
  )
}
