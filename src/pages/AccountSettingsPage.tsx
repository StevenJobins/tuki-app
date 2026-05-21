import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../i18n/useTranslation'

const AVATARS = ['🧒', '👧', '👦', '🧒🏽', '👧🏽', '👦🏽', '🧒🏿', '👧🏿', '👦🏿', '🐻', '🦊', '🐰']

export default function AccountSettingsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { getActiveChild, updateChild } = useApp()
  const activeChild = getActiveChild()

  const [profileName, setProfileName] = useState(activeChild?.name || '')
  const [selectedAvatar, setSelectedAvatar] = useState(activeChild?.avatarEmoji || '🧒')
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [emailSuccess, setEmailSuccess] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteText, setDeleteText] = useState('')

  const acc = t.accountSettings

  const handleSaveProfile = () => {
    if (!activeChild || !profileName.trim()) return
    updateChild({ ...activeChild, name: profileName.trim(), avatarEmoji: selectedAvatar })
    setShowAvatarPicker(false)
  }

  const handleChangeEmail = () => {
    if (!newEmail.trim() || !newEmail.includes('@')) return
    // TODO: Supabase auth.updateUser({ email: newEmail })
    setEmailSuccess(true)
    setTimeout(() => setEmailSuccess(false), 3000)
    setNewEmail('')
  }

  const handleChangePassword = () => {
    setPasswordError('')
    if (newPassword.length < 6) {
      setPasswordError(acc.passwordTooShort)
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError(acc.passwordMismatch)
      return
    }
    // TODO: Supabase auth.updateUser({ password: newPassword })
    setPasswordSuccess(true)
    setTimeout(() => setPasswordSuccess(false), 3000)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleDeleteAccount = () => {
    if (deleteText !== acc.deleteConfirmWord) return
    // TODO: Supabase auth.admin.deleteUser() or RPC
    navigate('/profil')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-24"
    >
      <Header title={acc.title} showBack />

      <div className="space-y-6 mt-4">

        {/* Profile Section */}
        <section className="mx-4">
          <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-3">{acc.profileSection}</h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="w-16 h-16 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-3xl border-2 border-purple-200 dark:border-purple-700 hover:border-purple-400 transition-colors"
              >
                {selectedAvatar}
              </button>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{acc.changeAvatar}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{acc.tapToChange}</p>
              </div>
            </div>

            {showAvatarPicker && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="grid grid-cols-6 gap-2"
              >
                {AVATARS.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedAvatar(emoji)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-all ${
                      selectedAvatar === emoji
                        ? 'bg-purple-100 dark:bg-purple-800 ring-2 ring-purple-400 scale-110'
                        : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </motion.div>
            )}

            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">{acc.displayName}</label>
              <input
                type="text"
                value={profileName}
                onChange={e => setProfileName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 outline-none"
                placeholder={acc.namePlaceholder}
              />
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full py-2.5 rounded-xl bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-colors"
            >
              {acc.saveProfile}
            </button>
          </div>
        </section>

        {/* Email Section */}
        <section className="mx-4">
          <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-3">{acc.emailSection}</h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">{acc.currentEmail}</label>
              <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 rounded-xl">
                beta@tuki.ch
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">{acc.newEmail}</label>
              <input
                type="email"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 outline-none"
                placeholder={acc.newEmailPlaceholder}
              />
            </div>
            {emailSuccess && (
              <p className="text-xs text-green-500 font-medium">{acc.emailSuccess}</p>
            )}
            <button
              onClick={handleChangeEmail}
              disabled={!newEmail.trim()}
              className="w-full py-2.5 rounded-xl bg-tuki-rot text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {acc.changeEmail}
            </button>
          </div>
        </section>

        {/* Password Section */}
        <section className="mx-4">
          <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mb-3">{acc.passwordSection}</h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">{acc.currentPassword}</label>
              <input
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 outline-none"
                placeholder="********"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">{acc.newPassword}</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 outline-none"
                placeholder={acc.newPasswordPlaceholder}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">{acc.confirmPassword}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-sm text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-600 outline-none"
                placeholder={acc.confirmPasswordPlaceholder}
              />
            </div>
            {passwordError && (
              <p className="text-xs text-red-500 font-medium">{passwordError}</p>
            )}
            {passwordSuccess && (
              <p className="text-xs text-green-500 font-medium">{acc.passwordSuccess}</p>
            )}
            <button
              onClick={handleChangePassword}
              disabled={!newPassword || !confirmPassword}
              className="w-full py-2.5 rounded-xl bg-tuki-rot text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              {acc.changePassword}
            </button>
          </div>
        </section>

        {/* Logout */}
        <section className="mx-4">
          <button
            onClick={() => {
              // TODO: Supabase auth.signOut()
              navigate('/')
            }}
            className="w-full py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {acc.logout}
          </button>
        </section>

        {/* Delete Account Section */}
        <section className="mx-4">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-800 p-4 space-y-3">
            <h3 className="font-semibold text-sm text-red-700 dark:text-red-400">{acc.dangerZone}</h3>
            <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed">{acc.deleteWarning}</p>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
              >
                {acc.deleteAccount}
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                  {acc.deleteConfirmPrompt.replace('{word}', acc.deleteConfirmWord)}
                </p>
                <input
                  type="text"
                  value={deleteText}
                  onChange={e => setDeleteText(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-red-300 dark:border-red-700 text-sm text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-red-300 outline-none"
                  placeholder={acc.deleteConfirmWord}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowDeleteConfirm(false); setDeleteText('') }}
                    className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {t.common.cancel}
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteText !== acc.deleteConfirmWord}
                    className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium disabled:opacity-40"
                  >
                    {acc.deleteForever}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </motion.div>
  )
}
