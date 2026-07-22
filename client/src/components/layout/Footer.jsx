import React from 'react'
// import { Link } from 'react-router-dom'
// import { Github, Linkedin, Sparkles, Twitter } from "lucide-react";
import { Link } from 'react-router-dom'
import { Sparkles, Mail, Globe, MessageCircle } from "lucide-react";

const Footer = () => {
    return (
        <footer className='relative mt-32 border-t border-border/60' >
            <div className='mx-auto max-w-[1400px] px-6 py-16' >
                <div className='grid gap-12 md:grid-cols-4' >
                    <div className='md:col-span-2' >
                        <Link to='/' className='flex items-center gap-2' >
                            <span className='grid h-9 w-9 place-items-center rounded-xl gradient-primary' >
                                <Sparkles className='h-4 w-4 text-white' />
                            </span>

                            <span className='text-lg font-semibold' >SkillBridge <span className='gradient-text' >AI</span></span>
                        </Link>
                        <p className='mt-4 max-w-sm text-sm text-muted-foreground' >
                            AI-powered resume analysis. Match your skills to any job, close the gap, and apply with confidence.
                        </p>
                        <div className='mt-6 flex gap-3' >
                            {[Mail, Globe, MessageCircle].map((Icon, i) => (
                                <a key={i} href='#' className='grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-border bg-white/5 text-muted-foreground transition hover:bg-white/10 hover:text-foreground' >
                                    <Icon className='h-4 w-4' />
                                </a>
                            ))} 
                        </div>
                    </div>

                    <div>
                        <h4 className='mb-4 text-sm font-semibold' >Product</h4>
                        <ul className='space-y-3 text-sm text-muted-foreground'>
                            <li><a href='#features' className='hover:text-foreground' ></a></li>
                            <li><a href='#how' className='hover:text-foreground' > How it works</a></li>
                            <li><Link to='/register' className='hover:text-foreground' >Get started</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className='mb-4 text-sm font-semibold' >Company</h4>
                        <ul className='space-y-3 text-sm text-muted-foreground' >
                            <li><a href='#' className='hover:text-foreground' >About</a></li>
                            <li><a href='#' className='hover:text-foreground' >Privacy</a></li>
                            <li><a href='#' className='hover:text-foreground' >Terms</a></li>
                        </ul>
                    </div>

                </div>

                <div className='mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground md:flex-row' >
                    <p>© {new Date().getFullYear()} SkillBridge AI. All rights reserved.</p>
                    <p> Built for job seekers who move fast.</p>
                </div>


            </div>
        </footer>
    )
}

export default Footer
