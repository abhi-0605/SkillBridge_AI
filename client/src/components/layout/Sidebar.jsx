import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Upload, FileText, User, LogOut, Sparkles, X } from 'lucide-react'
import { useAuth } from '../../store/AuthContext.jsx'


const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { to: '/dashboard/upload', label: 'New Analysis', icon: Upload },
  { to: '/dashboard/reports', label: 'Reports', icon: FileText },
  { to: '/dashboard/profile', label: 'Profile', icon: User },
]



const Sidebar = ({ open, setOpen }) => {

  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    logout();
    navigate('/login');
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white transition-transform transform ${open ? 'translate-x-0' : '-translate-x-full'} z-50`} className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-sidebar/90 backdrop-blur-xl transition-transform md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className='flex h-16 items-center justify-between px-5' >
        <Link to='/' className='flex items-center gap-2' >
          <span className='grid h-8 w-8 place-items-center rounded-lg gradient-primary' >
            <Sparkles className='h-4 w-4 text-white' />
          </span>
          <span className='font-semibold' >SkillBridge</span>
        </Link>
        <button className='cursor-pointer md:hidden' onClick={ () => setOpen(false) } >
          <X className='h-5 w-5' />
        </button>
      </div>

      <nav className='px-3 py-2' >
        <div className='mb-2 px-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground' >
          Workspace
        </div>
        <ul className='space-y-1' >
          {NAV_ITEMS.map((item) => {
            const active = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
            return (
              <li key={item.to} >
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    active ? 'bg-white/5 text-foreground' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                  }`}

                >
                  <span className={`grid h-8 w-8 place-items-center rounded-lg ${active ? 'gradient-primary text-white' : 'bg-white/5 text-muted-foreground'}`} >
                    <item.icon className='h-4 w-4' />
                  </span>
                  <span className='truncate' >{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className='absolute inset-x-3 bottom-3 space-y-2' >
        <Link to='/dashboard/profile' className='glass flex cursor-pointer items-center gap-3 rounded-xl p-3 text-sm' >
          <div className='grid h-9 w-9 place-items-center rounded-full gradient-primary font-semibold text-white' >
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className='min-w-0 flex-1' >
            <div className='truncate font-medium' >{user?.name}</div>
            <div className='truncate text-xs text-muted-foreground' >{user?.email}</div>

          </div>
        </Link>

        <button
          onClick={handleLogout}
          className='flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-xs text-muted-foreground hover:text-foreground'
        >
          <LogOut className='h-4 w-4' />Sign out
        </button>

      </div>

    </aside>
  )
}

export default Sidebar
