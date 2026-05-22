import { useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { useNotifications } from '../context/NotificationContext'

/**
 * Automatically generates notifications when the user completes recipes/activities
 * or reaches star milestones. This hook bridges AppContext events to NotificationContext.
 *
 * When Supabase is connected, these notifications will be created server-side
 * via triggers/edge functions instead.
 */
export function useAutoNotifications() {
  const { completedRecipes, completedActivities, tukiStars } = useApp()
  const { addNotification } = useNotifications()

  // Track previous counts to detect new completions
  const prevRecipeCount = useRef(completedRecipes.length)
  const prevActivityCount = useRef(completedActivities.length)
  const prevLevel = useRef(tukiStars.level)

  // Recipe completion notification
  useEffect(() => {
    if (completedRecipes.length > prevRecipeCount.current) {
      const count = completedRecipes.length
      if (count % 5 === 0) {
        addNotification({
          type: 'milestone',
          icon: '🎉',
          message: `Toll! Ihr habt schon ${count} Rezepte gemeinsam gekocht!`,
          read: false,
        })
      }
    }
    prevRecipeCount.current = completedRecipes.length
  }, [completedRecipes.length, addNotification])

  // Activity completion notification
  useEffect(() => {
    if (completedActivities.length > prevActivityCount.current) {
      const count = completedActivities.length
      if (count % 5 === 0) {
        addNotification({
          type: 'milestone',
          icon: '⭐',
          message: `Super! ${count} Aktivitäten geschafft. Weiter so!`,
          read: false,
        })
      }
    }
    prevActivityCount.current = completedActivities.length
  }, [completedActivities.length, addNotification])

  // Level-up notification
  useEffect(() => {
    if (tukiStars.level > prevLevel.current) {
      addNotification({
        type: 'milestone',
        icon: '🏆',
        message: `Level Up! Ihr seid jetzt "${tukiStars.levelName}"!`,
        read: false,
      })
    }
    prevLevel.current = tukiStars.level
  }, [tukiStars.level, tukiStars.levelName, addNotification])
}
