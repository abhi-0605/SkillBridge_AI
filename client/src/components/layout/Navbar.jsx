import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Sparkles, X } from 'lucide-react'

const NAV_LINKS = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how' },
]


const Navbar = () => {

    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll ', onScroll)
    }, [])

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors ${scrolled ? 'border-border bg-white/90' : 'border-transparent bg-white/60'
                }`}

        >
            <div className='mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6' >
                <Link to='/' className='flex items-center gap-2' >
                    <span className='grid h-9 w-9 place-items-center rounded-xl gradient-primary' >
                        <Sparkles className='h-4 w-4 text-white' />
                    </span>
                    <span className='text-lg font-semibold tracking-tight' >
                        SkillBridge <span className="gradient-text">AI</span>
                    </span>
                </Link>

                <nav className='hidden items-center gap-8 md:flex' >
                    {NAV_LINKS.map((n) => (
                        <a key={n.href} href={n.href} className='text-sm text-muted-foreground transition hover:text-foreground' >
                            {n.label}
                        </a>
                    ))}
                </nav>


                <div className='hidden items-center gap-3 md:flex' >
                    <Link to='/login' className='cursor-pointer text-sm text-foreground hover:text-primary' >
                        Sign in
                    </Link>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Link
                            to="/register"
                            className="cursor-pointer rounded-xl gradient-primary px-4 py-2 text-sm font-medium text-white shadow-lg shadow-primary/30 transition-shadow hover:shadow-primary/50"
                        >
                            Get started
                        </Link>
                    </motion.div>
                </div>

                <button
                    aria-label='Toggle Menu'
                    onClick={() => setOpen((v) => !v)}
                    className='grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-border bg-white/5 md:hidden'

                >
                    {open ? <X className='h-4 w-4' /> : <Menu className='h-4 w-4' />}
                </button>

                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mx-6 mb-4 rounded-2xl border border-border bg-white p-4 shadow-lg md:hidden'
                    >
                        <div className='flex flex-col gap-3'>
                            {NAV_LINKS.map((n) => (
                                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className='rounded-lg px-3 py-2 text-sm text-foreground hover:bg-gray-50'>
                                    {n.label}
                                </a>
                            ))}
                            <div className='mt-2 grid grid-cols-2 gap-2'>
                                <Link to='/login' className='rounded-xl border border-border px-4 py-2 text-center text-sm text-foreground'>Sign in</Link>
                                <Link to='/register' className='rounded-xl gradient-primary px-4 py-2 text-center text-sm font-medium text-white'>Get started</Link>
                            </div>
                        </div>
                    </motion.div>
                )}

            </div>
        </header>
    )
}

export default Navbar
