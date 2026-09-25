export type UserRole = 'student' | 'teacher' | 'parent' | 'admin'

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

export interface AuthUser {
  id: string
  email?: string
  profile?: Profile | null
}
