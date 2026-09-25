// Expanded for Phase 2 – Education structure

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type ContentStatus =
  | 'draft'
  | 'processing'
  | 'ai_generated'
  | 'under_review'
  | 'approved'
  | 'published'
  | 'archived'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'student' | 'teacher' | 'parent' | 'admin'
          avatar_url: string | null
          language: 'en' | 'st'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'student' | 'teacher' | 'parent' | 'admin'
          avatar_url?: string | null
          language?: 'en' | 'st'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'student' | 'teacher' | 'parent' | 'admin'
          avatar_url?: string | null
          language?: 'en' | 'st'
          created_at?: string
          updated_at?: string
        }
      }
      grades: {
        Row: {
          id: string
          name: string
          level: 'primary' | 'secondary'
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          level: 'primary' | 'secondary'
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          level?: 'primary' | 'secondary'
          sort_order?: number
          created_at?: string
        }
      }
      subjects: {
        Row: {
          id: string
          name: string
          name_st: string | null
          code: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          name_st?: string | null
          code?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_st?: string | null
          code?: string | null
          created_at?: string
        }
      }
      curricula: {
        Row: {
          id: string
          country: string
          name: string
          year: number | null
          version: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          country?: string
          name: string
          year?: number | null
          version?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          country?: string
          name?: string
          year?: number | null
          version?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
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
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          subject_id?: string | null
          grade_id?: string | null
          curriculum_id?: string | null
          created_by?: string | null
          status?: ContentStatus
          is_ai_generated?: boolean
          language?: 'en' | 'st'
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          subject_id?: string | null
          grade_id?: string | null
          curriculum_id?: string | null
          created_by?: string | null
          status?: ContentStatus
          is_ai_generated?: boolean
          language?: 'en' | 'st'
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      course_modules: {
        Row: {
          id: string
          course_id: string
          title: string
          description: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          description?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          description?: string | null
          sort_order?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
