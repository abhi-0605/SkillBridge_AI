import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Zap, ShieldCheck, Target } from 'lucide-react'

const AuthShell = ({ title, sub, children, footer }) => {
  return (


    <main className="relative min-h-dvh overflow-hidden bg-white">


      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='animate-float absolute -left-24 -top-16 h-72 w-72 rounded-full bg-indigo-100' />
        <div className='animate-float absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-indigo-100/70' style={{ animationDelay: '-3s' }} />

        
        <div className='animate-float-slow absolute left-[8%] top-[15%] h-5 w-5 rotate-45 border-2 border-indigo-200' />

        
        <div className='animate-drift absolute left-[12%] top-[35%] h-2.5 w-2.5 rounded-full bg-indigo-200' style={{ animationDelay: '-2s' }} />

        
        <div className='grid grid-cols-3 gap-1.5 absolute left-[5%] top-[55%] opacity-30'>
          {Array.from({ length: 9 }).map((_, i) => (<div key={i} className='h-1 w-1 rounded-full bg-indigo-300' />))}
        </div>

        
        <div className='animate-float absolute left-[38%] top-[25%] h-3 w-3 rounded-full bg-indigo-200' style={{ animationDelay: '-2s' }} />
        <div className='animate-float-slow absolute left-[45%] top-[45%] h-5 w-5 rotate-12 border-2 border-indigo-200 rounded-sm' style={{ animationDelay: '-3.5s' }} />
        <div className='animate-drift absolute left-[35%] top-[65%] h-2.5 w-2.5 rounded-full bg-indigo-300' style={{ animationDelay: '-1s' }} />
        <div className='animate-float absolute left-[50%] top-[15%] h-4 w-4 rounded-full border-2 border-indigo-100' style={{ animationDelay: '-4.5s' }} />
        <div className='grid grid-cols-3 gap-2 absolute left-[42%] top-[75%] opacity-25'>
          {Array.from({ length: 9 }).map((_, i) => (<div key={i} className='h-1 w-1 rounded-full bg-indigo-300' />))}
        </div>

       
        <div className='animate-float-slow absolute right-[10%] top-[20%] h-6 w-6 rotate-12 border-2 border-indigo-200 rounded-sm' style={{ animationDelay: '-1.5s' }} />

        
        <div className='animate-float absolute right-[6%] top-[45%] h-3 w-3 rounded-full bg-indigo-200' style={{ animationDelay: '-4s' }} />

        
        <div className='animate-float-slow absolute bottom-[15%] right-[8%] h-14 w-14 rotate-12 rounded-2xl bg-gradient-to-br from-indigo-200 to-indigo-100' style={{ animationDelay: '-3s' }} />
      </div>

      <div className="relative grid min-h-dvh md:grid-cols-2">


        <div className='hidden flex-col justify-between p-10 md:flex'>
          <Link to='/' className='flex items-center gap-2'>
            <span className='grid h-9 w-9 place-items-center rounded-xl gradient-primary'>
              <Sparkles className='h-4 w-4 text-white' />
            </span>
            <span className='text-lg font-semibold text-foreground'>SkillBridge <span className='text-primary'>AI</span></span>
          </Link>

          <div className='max-w-md'>
            <p className='text-xs uppercase tracking-[0.3em] text-primary font-medium'>Career intelligence</p>
            <h2 className='mt-3 text-4xl font-bold leading-tight text-foreground'>
              Every application, <span className='text-primary'>optimized.</span>
            </h2>
            <p className='mt-3 text-muted-foreground'>
              Resume parsing, ATS scoring, and skill-gap analysis — in one focused workspace.
            </p>
            <div className='mt-8 space-y-3'>
              {[
                { icon: Zap, text: 'ATS score in seconds' },
                { icon: Target, text: 'AI-powered skill matching' },
                { icon: ShieldCheck, text: 'Your data stays yours' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className='flex items-center gap-3 rounded-xl border border-border bg-white p-3 text-sm text-foreground shadow-sm'>
                  <span className='grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary'>
                    <Icon className='h-4 w-4' />
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          <p className='text-xs text-muted-foreground'>© {new Date().getFullYear()} SkillBridge AI</p>
        </div>


        <div className='flex items-center justify-center p-6 md:p-10'>
          <div className='w-full max-w-md rounded-3xl border border-border bg-white p-8 shadow-lg'>
            <div className='mb-6 md:hidden'>
              <Link to='/' className='flex items-center gap-2'>
                <span className='grid h-8 w-8 place-items-center rounded-lg gradient-primary'>
                  <Sparkles className='h-3.5 w-3.5 text-white' />
                </span>
                <span className='font-semibold text-foreground'>SkillBridge <span className='text-primary'>AI</span></span>
              </Link>
            </div>
            <h1 className='text-2xl font-bold text-foreground'>{title}</h1>
            <p className='mt-1 text-sm text-muted-foreground'>{sub}</p>
            <div className='mt-6'>{children}</div>
            {footer && <p className='mt-6 text-center text-sm text-muted-foreground'>{footer}</p>}
          </div>
        </div>
      </div>
    </main>
  )
}

export default AuthShell