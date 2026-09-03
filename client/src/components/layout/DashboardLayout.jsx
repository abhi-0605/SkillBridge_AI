import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar.jsx'

const DashboardLayout = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className='relative min-h-dvh overflow-hidden bg-white'>
      
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='animate-float absolute -right-32 -top-20 h-80 w-80 rounded-full bg-indigo-100/60' />
        <div className='animate-float absolute -bottom-20 right-[10%] h-64 w-64 rounded-full bg-indigo-100/50' style={{ animationDelay: '-3s' }} />
        <div className='grid grid-cols-3 gap-2 absolute right-[5%] top-[30%] opacity-20'>
          {Array.from({ length: 9 }).map((_, i) => (<div key={i} className='h-1 w-1 rounded-full bg-indigo-300' />))}
        </div>
        <div className='animate-float-slow absolute right-[20%] top-[15%] h-5 w-5 rotate-12 border-2 border-indigo-200 rounded-sm' />
      </div>

      <Sidebar open={open} setOpen={setOpen} />

      <header className='relative sticky top-0 z-30 border-b border-border bg-white/80 backdrop-blur-xl md:pl-64'>
        <div className='flex h-16 items-center gap-3 px-4 md:px-8'>
          <button
            className='grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-border text-foreground md:hidden'
            onClick={() => setOpen(true)}
          >
            <Menu className='h-4 w-4' />
          </button>
        </div>
      </header>

      <main className='relative min-h-[calc(100dvh-4rem)] md:pl-64'>
        <div className='mx-auto max-w-[1400px] px-4 py-8 md:px-8'>
          <Outlet />
        </div>
      </main>

      {open && <div className='fixed inset-0 z-30 bg-black/50 md:hidden' onClick={() => setOpen(false)} />}
    </div>
  )
}

export default DashboardLayout
