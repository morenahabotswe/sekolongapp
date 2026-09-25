import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Course, Grade, Subject } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

export function Courses() {
  const { profile } = useAuth()
  const [courses, setCourses] = useState<Course[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedGrade, setSelectedGrade] = useState<string>('')
  const [selectedSubject, setSelectedSubject] = useState<string>('')

  useEffect(() => {
    async function load() {
      setLoading(true)

      const [coursesRes, gradesRes, subjectsRes] = await Promise.all([
        supabase
          .from('courses')
          .select(`
            *,
            subject:subjects(*),
            grade:grades(*)
          `)
          .eq('status', 'published')
          .order('created_at', { ascending: false }),
        supabase.from('grades').select('*').order('sort_order'),
        supabase.from('subjects').select('*').order('name'),
      ])

      if (coursesRes.data) setCourses(coursesRes.data as Course[])
      if (gradesRes.data) setGrades(gradesRes.data as Grade[])
      if (subjectsRes.data) setSubjects(subjectsRes.data as Subject[])

      setLoading(false)
    }

    load()
  }, [])

  const filtered = courses.filter((c) => {
    const matchesSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      (c.description ?? '').toLowerCase().includes(search.toLowerCase())
    const matchesGrade = !selectedGrade || c.grade_
