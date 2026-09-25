import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  Settings,
  FileText,
  School,
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import type { UserRole } from '@/types'

interface NavItem {
  to: string
  label: string
  icon: React.ReactNode
  roles: UserRole[]
}

const navItems: NavItem[] = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ['student', 'teacher', 'parent', 'admin'],
  },
  {
    to: '/courses',
    label: 'Courses',
    icon: <BookOpen className="h-5 w-5" />,
    roles: ['student', 'teacher', 'admin'],
  },
  {
    to: '/my-learning',
    label: 'My Learning',
    icon: <GraduationCap className="h-5 w-5" />,
    roles: ['student'],
  },
  {
    to: '/classes',
    label: 'Classes',
    icon: <Users className="h-5 w-5" />,
    roles: ['teacher', 'admin'],
  },
  {
    to: '/curriculum',
    label: 'Curriculum',
    icon: <FileText className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    to: '/schools',
    label: 'Schools',
    icon: <School className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    to: '/settings',
    label: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    roles: ['student', 'teacher', 'parent', 'admin'],
  },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { profile } = useAuth()
  const role = profile?.role ?? 'student'

  const visibleItems = navItems.filter((item) => item.roles.includes(role))

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-16 items-center border-b border-slate-200 px-6 lg:hidden">
          <span className="text-lg font-semibold text-slate-900">Menu</span>
        </div>

        <nav className="space-y-1 p-4">
          {visibleItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
