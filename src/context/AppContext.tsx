import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface ChildProfile {
  id: string
  name: string
  birthDate: string
  avatarEmoji: string
}

interface TukiStars {
  total: number
  spent: number
  level: number
  levelName: string
}

interface PerChildData {
  favorites: string[]
  completedActivities: string[]
  completedRecipes: string[]
  weekPlan: Record<string, string[]>
  tukiStars: TukiStars
  redeemedRewards: string[]
  photoUploads: string[]
}