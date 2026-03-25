import { useState, useEffect } from 'react'
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

const tagColors: Record<string, string> = {
  'Rezept': 'bg-orange-100 text-orange-700',
  'Tipp': 'bg-blue-100 text-blue-700',
  'Frage': 'bg-purple-100 text-purple-700',
  'Aktivität': 'bg-green-100 text-green-700',
}

const tagOptions = ['Rezept', 'Tipp', 'Frage', 'Aktivität']

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `vor ${mins} Min.`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `vor ${hours} Std.`
  const days = Math.floor(hours / 24)
  return `vor ${days} Tag${days > 1 ? 'en' : ''}`
}

export default function CommunityPage() {
  const { user, profile } = useAuth()
  const [activeTab, setActiveTab] = useState<'feed' | 'write'>('feed')
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [likedPosts, setLikedPosts] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  // New post form
  const [newContent, setNewContent] = useState('')
  const [newTag, setNewTag] = useState('Tipp')
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    loadPosts()
    if (user) loadLikes()
  }, [user])

  async function loadPosts() {
    setLoading(true)
    const { data } = await supabase
      .from('community_posts')
      .select('*, profiles(display_name, avatar_emoji)')
      .order('created_at', { ascending: false })
      .limit(20)

    if (data) {
      const postsWithCounts = await Promise.all(
        data.map(async (post) => {
          const { count: likeCount } = await supabase
            .from('post_likes')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id)
          const { count: commentCount } = await supabase
            .from('post_comments')
            .select('*', { count: 'exact', head: true })
            .eq('post_id', post.id)
          return { ...post, like_count: likeCount || 0, comment_count: commentCount || 0 }
        })
      )
      setPosts(postsWithCounts as CommunityPost[])
    }
    setLoading(false)
  }

  async function loadLikes() {
    if (!user) return
    const { data } = await supabase
      .from('post_likes')
      .select('post_id')
      .eq('profile_id', user.id)
    if (data) setLikedPosts(data.map(l => l.post_id))
  }

  async function toggleLike(postId: string) {
    if (!user) return
    const isLiked = likedPosts.includes(postId)
    setLikedPosts(l => isLiked ? l.filter(id => id !== postId) : [...l, postId])
    setPosts(ps => ps.map(p => p.id === postId
      ? { ...p, like_count: p.like_count + (isLiked? -1 : 1) } : p
    ))
    if (isLiked) {
      await supabase.from('post_likes').delete().eq('post_id', postId).eq('profile_id', user.id)
    } else {
      await supabase.from('post_likes').insert({ post_id: postId, profile_id: user.id })
    }
  }

  async function submitPost() {
    if (!user || !newContent.trim()) return
    setPosting(true)
    const { error } = await supabase.from('community_posts').insert({
      profile_id: user.id,
      content: newContent.trim(),
      tag: newTag,
    })
    if (!error) {
      setNewContent('')
      setActiveTab('feed')
      await loadPosts()
    }
    setPosting(false)
  }

  return (
    <div className="pb-24">
      <Header title="Community" />

      {/* Tabs */}
      <div className="flex gap-1 mx-4 mt-1 mb-4 bg-gray-100 rounded-xl p-1">
        {(['feed', 'write'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeTab === tab ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
            }`}
          >
            {tab === 'feed' ? '📱 Feed' : '✏️ Neuer Beitrag'}
          </button>
        ))}
      </div>

      {activeTab === 'feed' ? (
        <div>
          {loading ? (
            <div className="text-center py-12">
              <span className="text-2xl block mb-2">⏳</span>
              <p className="text-gray-400 text-sm">Lade Beiträge...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 px-4">
              <span className="text-4xl block mb-3">🌱</span>
              <p className="text-gray-500 text-sm">Noch keine Beiträge.</p>
              <p className="text-gray-400 text-xs mt-1">Sei der Erste und teile etwas!</p>
            </div>
          ) : (
            <div
              className="space-y-4 px-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0"
            >
              {posts.map(post => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-4 pb-2">
                    <div className="w-10 h-10 rounded-full bg-tuki-mint-bg flex items-center justify-center text-lg">
                      {post.profiles?.avatar_emoji || '👤'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-800">
                          {post.profiles?.display_name || 'Anonym'}
                        </span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tagColors[post.tag] || 'bg-gray-100 text-gray-500'}`}>
                          {post.tag}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400">{timeAgo(post.created_at)}</span>
                    </div>
                  </div>
                  <div className="px-4 pb-3">
                    <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
                  </div>
                  {post.image_url && (
                    <img src={post.image_url} alt="" className="w-full h-48 object-cover" loading="lazy" />
                  )}
                  <div className="flex items-center gap-4 px-4 py-3 border-t border-gray-50">
                    <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1.5 text-xs">
                      <span>{likedPosts.includes(post.id) ? '❤️' : '👍'}</span>
                      <span className="text-gray-500">{post.like_count}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-xs">
                      <span>💬</span>
                      <span className="text-gray-500">{post.comment_count}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="px-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-tuki-mint-bg flex items-center justify-center text-lg">
                {profile?.avatar_emoji || '👤'}
              </div>
              <span className="font-semibold text-sm text-gray-800">{profile?.display_name || 'Du'}</span>
            </div>
            <textarea
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              placeholder="Was möchtest du teilen? Rezept-Tipp, Aktivitäts-Idee, Frage..."
              rows={4}
              className="w-full px-3 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-tuki-mint focus:ring-2 focus:ring-tuki-mint/30 resize-none"
            />
            <div className="flex gap-2 mt-3 mb-4">
              {tagOptions.map(tag => (
                <button
                  key={tag}
                  onClick={() => setNewTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    newTag === tag ? tagColors[tag] : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            <button
              onClick={submitPost}
              disabled={posting || !newContent.trim()}
              className="w-full py-3 gradient-rot text-white font-semibold rounded-xl text-sm disabled:opacity-50"
            >
              {posting ? 'Wird gepostet...' : 'Beitrag teilen'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
