export type UserRole = 'student' | 'teacher' | 'parent' | 'admin'
export type ContentStatus =
  | 'draft'
  | 'processing'
  | 'ai_generated'
  | 'under_review'
  | 'approved'
  | 'published'
  | 'archived'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  avatar_url: string | null
  language: 'en' | 'st'
  created_at: string
  updated_at: string
}

export interface Grade {
  id: string
  name: string
  level: 'primary' | 'secondary'
  sort_order: number
  created_at: string
}

export interface Subject {
  id: string
  name: string
  name_st: string | null
  code: string | null
  created_at: string
}

export interface Curriculum {
  id: string
  country: string
  name: string
  year: number | null
  version: string | null
  description: string | null
  created_at: string
  updated_at: string
}

export interface Course {
  id: string
  title: string
  description: string | null
  subject_id: string | null
  grade_id: string | null
  curriculum_id: string | null
  created_by: string | null
  status: ContentStatus
  is_ai_generated: boolean
  language: 'en' | 'st'
  thumbnail_url: string | null
  created_at: string
  updated_at: string
  // Joined fields (optional)
  subject?: Subject | null
  grade?: Grade | null
}

export interface AuthUser {
  id: string
  email?: string
  profile?: Profile | null
}
