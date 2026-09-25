import { useAuth } from '@/contexts/AuthContext'
import { BookOpen, GraduationCap, Trophy, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Dashboard() {
  const { profile, user } = useAuth()

  const name = profile?.full_name || user?.email || 'Learner'
  const role = profile?.role || 'student'

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Welcome back, {name.split(' ')[0]}
        </h1>
        <p className="mt-1 text-slate-600">
          {role === 'student' && 'Continue your learning journey.'}
          {role === 'teacher' && 'Manage your classes and courses.'}
          {role === 'parent' && 'See how your children are progressing.'}
          {role === 'admin' && 'Manage the Sekolong platform.'}
        </p>
      </div>

      {/* Quick stats – placeholders for now */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<BookOpen className="h-5 w-5 text-primary-600" />}
          label="Courses"
          value="—"
          hint="Coming soon"
        />
        <StatCard
          icon={<GraduationCap className="h-5 w-5 text-primary-600" />}
          label="Lessons completed"
          value="—"
          hint="Coming soon"
        />
        <StatCard
          icon={<Trophy className="h-5 w-5 text-primary-600" />}
          label="Average score"
          value="—"
          hint="Coming soon"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-primary-600" />}
          label="Streak"
          value="—"
          hint="Coming soon"
        />
      </div>

      {/* Role-specific content */}
      {role === 'student' && (
        <section className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Continue Learning</h2>
          <p className="mt-2 text-sm text-slate-600">
            You don’t have any active courses yet. Browse the catalogue to get started.
          </p>
          <Link to="/courses" className="btn-primary mt-4 inline-flex">
            Browse courses
          </Link>
        </section>
      )}

      {role === 'teacher' && (
        <section className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Teacher tools</h2>
          <p className="mt-2 text-sm text-slate-600">
            Create courses, manage classes, and use AI assistance. These features are coming in the next phases.
          </p>
        </section>
      )}

      {role === 'admin' && (
        <section className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Administration</h2>
          <p className="mt-2 text-sm text-slate-600">
            Curriculum management, user administration, and AI content review will appear here.
          </p>
          <Link to="/curriculum" className="btn-primary mt-4 inline-flex">
            Curriculum management
          </Link>
        </section>
      )}
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode
  label: string
  value: string
  hint: string
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50">
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-xl font-semibold text-slate-900">{value}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-400">{hint}</p>
    </div>
  )
}
