import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import AgeFilter from '../components/AgeFilter'
import ActivityCard from '../components/ActivityCard'
import { activities, categoryInfo, getActivityById } from '../data/activities'

export default function ActivitiesPage() {
  const navigate = useNavigate()
  const [ageFilter, setAgeFilter] = useState('all')
  const [catFilter, setCatFilter] = useState('all')
  const [search, setSearch] = useState('')