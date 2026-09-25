import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { BookOpen, GraduationCap, Users, Sparkles } from 'lucide-react'

export function Home() {
  const { user } = useAuth()

  return (
    <div className="space-y-16 py-8">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Learn. Grow.{' '}
          <span className="text-primary-600">Succeed.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          Sekolong is a digital learning platform built for Lesotho and Africa.
          Interactive courses, AI-assisted learning, quizzes, and progress tracking
          — all grounded in the official curriculum.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {user ? (
            <Link to="/dashboard" className="btn-primary px-6 py-3 text-base">
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-primary px-6 py-3 text-base">
                Get started free
              </Link>
              <Link to="/login" className="btn-secondary px-6 py-3 text-base">
                Sign in
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          icon={<BookOpen className="h-6 w-6 text-primary-600" />}
          title="Curriculum-aligned"
          description="Courses generated from official syllabuses and reviewed by educators."
        />
        <FeatureCard
          icon={<Sparkles className="h-6 w-6 text-primary-600" />}
          title="AI-assisted learning"
          description="Mosuoe, your digital teacher, explains concepts and guides your practice."
        />
        <FeatureCard
          icon={<GraduationCap className="h-6 w-6 text-primary-600" />}
          title="Track progress"
          description="See your strengths, weak areas, and receive personalised recommendations."
        />
        <FeatureCard
          icon={<Users className="h-6 w-6 text-primary-600" />}
          title="For everyone"
          description="Students, teachers, parents and schools — all in one platform."
        />
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="card p-6">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  )
}
