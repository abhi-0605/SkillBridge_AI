import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Zap, ShieldCheck, Target } from 'lucide-react'

const AuthShell = ({ title, sub, children, footer }) => {
    return(

    
    <div className="relative min-h-dvh overflow-hidden bg-background">
      
      
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -left-20 top-20 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="animate-float absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="relative grid min-h-dvh md:grid-cols-2">
       
       
        <div className="hidden flex-col justify-between p-10 md:flex">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl gradient-primary">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            <span className="text-lg font-semibold">SkillBridge <span className="gradient-text">AI</span></span>
          </Link>

          <div className="max-w-md">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Career intelligence</p>
            <h2 className="mt-3 text-4xl font-bold leading-tight">
              Every application, <span className="gradient-text">optimized.</span>
            </h2>
            <p className="mt-3 text-muted-foreground">
              Resume parsing, ATS scoring, and skill-gap analysis — in one focused workspace.
            </p>
            <div className="mt-8 space-y-3">
              {[
                { icon: Zap, text: 'ATS score in seconds' },
                { icon: Target, text: 'AI-powered skill matching' },
                { icon: ShieldCheck, text: 'Your data stays yours' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm">
                  <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} SkillBridge AI</p>
        </div>

        
        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="glass-strong w-full max-w-md rounded-3xl p-8">
            <div className="mb-6 md:hidden">
              <Link to="/" className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </span>
                <span className="font-semibold">SkillBridge <span className="gradient-text">AI</span></span>
              </Link>
            </div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
            <div className="mt-6">{children}</div>
            {footer && <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthShell