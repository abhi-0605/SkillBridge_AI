import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

const AuthShell = ({ title, sub, children, footer }) => {
    return (
        <div className='grid min-h-dvh md:grid-cols-2'>
            <div className='relative hidden overflow-hidden border-r border-border md:block'>
                <div className='pointer-events-none absolute inset-0' >
                    <div className='animate-float absolute -left-10 top-10 h-72 w-72 rounded-full bg-primary/40 blur-3xl' />
                    <div className='animate-float absolute bottom-10 right-0 h-80 w-80 rounded-full bg-accent/30 blur-3xl' style={{ animationDelay: '-3s' }} />

                </div>

                <div className='relative flex h-full flex-col justify-between p-10' >
                    <Link to='/' className='flex items-center gap-2'>
                        <span className='grid h-9 w-9 place-items-center rounded-xl gradient-primary'>
                            <Sparkles className='h-4 w-4 text-white' />
                        </span>
                        <span className='text-lg font-semibold' >
                            SkillBridge
                            <span className='gradient-text' > AI</span>
                        </span>
                    </Link>


                    <div className='max-w-md' >
                        <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground' >
                            Career intelligence
                        </p>
                        <h2 className='mt-3 text-4xl font-bold leading-tight' >
                            Every application, <span className='gradient-text' >optimized.</span>
                        </h2>
                        <p className='mt-3 text-muted-foreground' >
                            Resume Parsing, ATS scoring , and skill-gap analysis-in one focused workflow.
                        </p>

                        <div className='mt-8 space-y-3' >
                            {['ATS score in seconds', 'AI-powered skill matching', 'Private by default'].map((t) => (
                                <div key={t} className="glass flex items-center gap-3 rounded-xl px-4 py-3 text-sm">
                                    <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary text-white">
                                        <Sparkles className="h-4 w-4" />
                                    </span>
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <p className='text-xs text-muted-foreground' > © {new Date().getFullYear()} SkillBridge AI</p>
                    

                </div>

            </div>

            <div classname='flex items-center justify-center p-6 md:p-10' >
                <div className='glass-strong w-full max-w-md rounded-3xl p-8' >
                    <div className='mb-6 md:hidden' >
                        <Link to='/' className='flex items-center gap-2'>
                            <span className='grid h-8 w-8 place-items-center rounded-lg gradient-primary'>
                                <Sparkles className='h-3.5 w-3.5 text-white' />
                            </span>
                            <span className='font-semibold' >
                                SkillBridge
                                <span className='gradient-text' > AI</span>
                            </span>
                        </Link>
                    </div>

                    <h1 className='text-2xl font-bold' >{title}</h1>
                    <p className='mt-1 text-sm text-muted-foreground' >{sub}</p>
                    <div className='mt-6' >
                            {children}
                    </div>
                    {footer && <p className='mt-6 text-center text-sm text-muted-foreground' >{footer}</p>}
                </div>
            </div>

        </div>
    )
}

export default AuthShell