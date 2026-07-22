import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar.jsx'

const DashboardLayout = () => {
    const [open, setOpen] = useState(false)

  return (
    <div className='min-h-dvh bg-background'>
      <Sidebar open={open} setOpen={setOpen} />

      <header className='sticky top-0 z-30 border-b border-border/60 bg-background/60 backdrop-blur-xl md:pl-64' >
        <div className='flex h-16 items-center gap-3 px-4 md:px-8' > 
            <button
                className='grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-border md:hidden'
                onClick={ () => setOpen(true)}
            >
                <Menu className='h-4 w-4' />
            </button>
        </div>
      </header>

      <main className='min-h-[calc(100dvh-4rem)] md:pl-64' >
        <div className="mx-auto max-w-[1400px] px-4 py-8 md:px-8">
          <Outlet />
        </div>
      </main>

      {open && <div className='fixed inset-0 z-30 bg-black/50 md:hidden' onClick={ () => setOpen(false)} /> }
      
    </div>
  )
}

export default DashboardLayout
