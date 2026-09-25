import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { LogOut, Menu, BookOpen } from 'lucide-react'

interface NavbarProps {
  onMenuClick?: () => void
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, profile, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          {user && (
            <button
              onClick={onMenuClick}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Sekolong
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden sm:block text-sm text-slate-600">
                <span className="font-medium text-slate-900">
                  {profile?.full_name || user.email}
                </span>
                {profile?.role && (
                  <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs capitalize text-slate-600">
                    {profile.role}
                  </span>
                )}
              </div>
              <button
                onClick={() => signOut()}
                className="btn-ghost gap-2"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">
                Sign in
              </Link>
              <Link to="/register" className="btn-primary">
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
