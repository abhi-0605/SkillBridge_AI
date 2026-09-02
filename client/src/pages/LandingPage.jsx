import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, FileSearch, Gauge, Sparkles, Target } from 'lucide-react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'


const FEATURES = [
  {
    icon: FileSearch,
    title: 'Smart resume parsing',
    desc: 'Upload a PDF or DOCX and we extract your skills, experience, and keywords instantly.',
  },
  {
    icon: Target,
    title: 'Skill-gap matching',
    desc: 'See exactly which skills from the job description you already have — and which are missing.',
  },
  {
    icon: Gauge,
    title: 'ATS compatibility score',
    desc: 'Know how your resume performs against real applicant tracking systems before you apply.',
  },
]


const LandingPage = () => {
  return (
    <div className='relative min-h-dvh overflow-hidden bg-background' >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -left-20 top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="animate-float absolute right-0 top-96 h-80 w-80 rounded-full bg-accent/10 blur-3xl" style={{ animationDelay: '-3s' }} />

        {/* Decorative shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-to-br from-primary/5 via-white to-white">
          {/* Large soft blur circles */}
          <div className="animate-float absolute -left-40 -top-10 h-[420px] w-[420px] rounded-full bg-primary/15 blur-2xl" />
          <div className="animate-float absolute -left-32 top-[58%] h-[360px] w-[360px] rounded-full bg-primary/10 blur-2xl" style={{ animationDelay: '-3s' }} />
          <div className="animate-drift absolute -right-32 top-[25%] h-[400px] w-[400px] rounded-full bg-accent/10 blur-2xl" style={{ animationDelay: '-4s' }} />
          <div className="animate-float absolute right-[5%] bottom-[-10%] h-[300px] w-[300px] rounded-full bg-primary/10 blur-2xl" style={{ animationDelay: '-2s' }} />

          {/* Medium outline circles */}
          <div className="animate-float-slow absolute left-[12%] top-[45%] h-16 w-16 rounded-full border-2 border-primary/20" style={{ animationDelay: '-1s' }} />
          <div className="animate-drift absolute right-[22%] top-[50%] h-12 w-12 rounded-full border-2 border-accent/25" style={{ animationDelay: '-3.5s' }} />
          <div className="animate-float absolute left-[30%] top-[8%] h-8 w-8 rounded-full border-2 border-primary/20" style={{ animationDelay: '-5s' }} />

          {/* Filled small circles */}
          <div className="animate-drift absolute left-[15%] top-[33%] h-3 w-3 rounded-full bg-primary/30" style={{ animationDelay: '-2s' }} />
          <div className="animate-float absolute left-[4%] top-[41%] h-2 w-2 rounded-full bg-primary/50" />
          <div className="animate-float-slow absolute right-[3%] top-[58%] h-4 w-4 rounded-full bg-primary/25" style={{ animationDelay: '-5s' }} />
          <div className="animate-drift absolute right-[35%] top-[18%] h-2.5 w-2.5 rounded-full bg-accent/40" style={{ animationDelay: '-1.5s' }} />
          <div className="animate-float absolute left-[45%] top-[6%] h-2 w-2 rounded-full bg-primary/30" style={{ animationDelay: '-4s' }} />

          {/* Squares — outline and filled, rotated */}
          <div className="animate-float-slow absolute left-[19%] top-[14%] h-5 w-5 rotate-45 border-2 border-primary/30" />
          <div className="animate-float-slow absolute left-[6%] top-[62%] h-4 w-4 rotate-12 border-2 border-primary/25" style={{ animationDelay: '-1s' }} />
          <div className="animate-float-slow absolute right-[15%] top-[9%] h-9 w-9 rotate-45 border-2 border-primary/20" style={{ animationDelay: '-2.5s' }} />
          <div className="animate-drift absolute right-[28%] top-[68%] h-6 w-6 rotate-12 rounded-md border-2 border-accent/25" style={{ animationDelay: '-3s' }} />
          <div className="animate-float absolute left-[25%] top-[70%] h-5 w-5 -rotate-12 rounded-sm bg-primary/15" style={{ animationDelay: '-4.5s' }} />

          {/* Rounded gradient squares (bigger, filled) */}
          <div className="animate-float-slow absolute bottom-[10%] right-[7%] h-16 w-16 rotate-12 rounded-2xl bg-gradient-to-br from-primary/40 to-accent/40" style={{ animationDelay: '-4s' }} />
          <div className="animate-drift absolute bottom-[16%] right-[11%] h-16 w-16 -rotate-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20" style={{ animationDelay: '-6s' }} />
          <div className="animate-float absolute left-[3%] top-[20%] h-12 w-12 rotate-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10" style={{ animationDelay: '-2s' }} />
          <div className="animate-drift absolute right-[38%] top-[75%] h-10 w-10 -rotate-12 rounded-xl bg-primary/15" style={{ animationDelay: '-5.5s' }} />

          {/* Dot grids scattered */}
          <div className="grid grid-cols-3 gap-2.5 absolute left-[13%] top-[48%] opacity-25">
            {Array.from({ length: 9 }).map((_, i) => (<div key={i} className="h-1 w-1 rounded-full bg-primary" />))}
          </div>
          <div className="grid grid-cols-4 gap-2 absolute right-[8%] top-[30%] opacity-30">
            {Array.from({ length: 16 }).map((_, i) => (<div key={i} className="h-1 w-1 rounded-full bg-primary" />))}
          </div>
          <div className="grid grid-cols-4 gap-2 absolute bottom-[3%] right-[3%] opacity-25">
            {Array.from({ length: 20 }).map((_, i) => (<div key={i} className="h-1 w-1 rounded-full bg-primary" />))}
          </div>
          <div className="grid grid-cols-3 gap-2 absolute left-[35%] top-[85%] opacity-20">
            {Array.from({ length: 9 }).map((_, i) => (<div key={i} className="h-1 w-1 rounded-full bg-accent" />))}
          </div>

          {/* Thin diagonal accent lines */}
          <div className="absolute left-[22%] top-[4%] h-px w-14 rotate-45 bg-primary/20" />
          <div className="absolute right-[32%] top-[88%] h-px w-16 -rotate-12 bg-accent/20" />
        </div>
        {/* Fill empty middle/top area */}
        <div className="animate-float absolute left-[55%] top-[4%] h-3 w-3 rounded-full bg-primary/25" style={{ animationDelay: '-2s' }} />
        <div className="animate-float-slow absolute left-[62%] top-[10%] h-6 w-6 rotate-12 border-2 border-accent/20" style={{ animationDelay: '-3s' }} />
        <div className="animate-drift absolute left-[40%] top-[15%] h-2 w-2 rounded-full bg-primary/40" style={{ animationDelay: '-1s' }} />
        <div className="animate-float absolute left-[70%] top-[6%] h-4 w-4 rounded-full border-2 border-primary/15" style={{ animationDelay: '-4s' }} />

        {/* Fill empty area around/below the CTA buttons */}
        <div className="animate-float-slow absolute left-[42%] top-[38%] h-3.5 w-3.5 rotate-45 border-2 border-primary/20" style={{ animationDelay: '-2.5s' }} />
        <div className="animate-drift absolute left-[58%] top-[40%] h-2 w-2 rounded-full bg-accent/30" style={{ animationDelay: '-5s' }} />
        <div className="animate-float absolute left-[48%] top-[35%] h-2.5 w-2.5 rounded-full bg-primary/25" style={{ animationDelay: '-1.5s' }} />

        {/* Fill empty lower-middle area */}
        <div className="animate-float-slow absolute left-[35%] top-[55%] h-5 w-5 rotate-12 rounded-md bg-primary/10" style={{ animationDelay: '-3.5s' }} />
        <div className="animate-drift absolute left-[60%] top-[58%] h-3 w-3 rounded-full bg-primary/20" style={{ animationDelay: '-4.5s' }} />
        <div className="animate-float absolute left-[68%] top-[52%] h-6 w-6 rotate-45 border-2 border-accent/15" style={{ animationDelay: '-2s' }} />
        <div className="grid grid-cols-3 gap-2 absolute left-[52%] top-[62%] opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (<div key={i} className="h-1 w-1 rounded-full bg-primary" />))}
        </div>

        {/* Fill empty far-left and far-right mid areas */}
        <div className="animate-float absolute left-[1%] top-[30%] h-3 w-3 rounded-full bg-accent/25" style={{ animationDelay: '-3s' }} />
        <div className="animate-drift absolute right-[45%] top-[45%] h-2.5 w-2.5 rounded-full bg-primary/20" style={{ animationDelay: '-1s' }} />
        {/* Large soft circles - top corners, cut off by edges */}
<div className="animate-float absolute -left-24 -top-16 h-72 w-72 rounded-full bg-indigo-100" />
<div className="animate-float absolute -right-20 -top-10 h-64 w-64 rounded-full bg-indigo-100/70" style={{ animationDelay: '-3s' }} />

{/* Small dot near headline, left */}
<div className="animate-drift absolute left-[16%] top-[26%] h-2.5 w-2.5 rounded-full bg-indigo-200" style={{ animationDelay: '-1s' }} />

{/* Small hollow square, top right near headline */}
<div className="animate-float-slow absolute right-[13%] top-[20%] h-6 w-6 rotate-12 border-2 border-indigo-200 rounded-sm" style={{ animationDelay: '-2s' }} />

{/* Dot grid, right side */}
<div className="grid grid-cols-3 gap-1.5 absolute right-[10%] top-[38%] opacity-40">
  {Array.from({ length: 9 }).map((_, i) => (<div key={i} className="h-1 w-1 rounded-full bg-indigo-300" />))}
</div>

{/* Small filled circle, far right middle */}
<div className="animate-float absolute right-[3%] top-[52%] h-2.5 w-2.5 rounded-full bg-indigo-200" style={{ animationDelay: '-4s' }} />

{/* Dot grid, left side lower */}
<div className="grid grid-cols-3 gap-1.5 absolute left-[3%] top-[62%] opacity-30">
  {Array.from({ length: 9 }).map((_, i) => (<div key={i} className="h-1 w-1 rounded-full bg-indigo-300" />))}
</div>

{/* Small filled square, bottom left near sign-in row */}
<div className="animate-float-slow absolute left-[16%] top-[72%] h-4 w-4 -rotate-6 rounded-sm bg-indigo-100" style={{ animationDelay: '-2.5s' }} />

{/* Stacked gradient squares, bottom right */}
<div className="animate-float-slow absolute bottom-[8%] right-[8%] h-20 w-20 rotate-12 rounded-2xl bg-gradient-to-br from-indigo-200 to-indigo-100" style={{ animationDelay: '-4s' }} />
<div className="animate-drift absolute bottom-[14%] right-[13%] h-16 w-16 -rotate-6 rounded-2xl bg-indigo-100/80" style={{ animationDelay: '-6s' }} />
      </div>

      <Navbar />

      <main className='relative'>


        {/* hero section */}

        <section className='mx-auto mt-5 max-w-xl text-center text-muted-foreground' >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className='glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground'
          >
            <Sparkles className='h-3.5 w-3.5 text-accent' /> AI-powered career intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='mt-6 text-4xl font-bold leading-tight text-foreground md:text-6xl'
          >
            Know your fit <span className='gradient-text' >before you apply.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='mx-auto mt-5 max-w-xl text-base text-muted-foreground'
          >
            Upload your resume and a job description. SkillBridge AI scores your match, finds missing skills, and tells you exactly what to fix.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to='/register'
                className='group flex cursor-pointer items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-medium text-white shadow-lg shadow-primary/30 hover:shadow-primary/60'

              >Analyze your resume free
                <ArrowRight className='h-4 w-4 transition group-hover:translate-x-0.5' />

              </Link>
            </motion.div>


            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/login"
                className="cursor-pointer rounded-full border border-border bg-white px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary hover:bg-primary/5"
              >Sign in</Link>
            </motion.div>
          </motion.div>



        </section>

        {/* features section */}

        <section id='features' className='mx-auto max-w-[1200px] px-6 py-20' >
          <div className='mx-auto max-w-xl text-center' >
            <p className='text-xs uppercase tracking-[0.3em] text-primary font-medium' >Core loop</p>
            <h2 className='mt-3 text-3xl font-bold text-foreground md:text-4xl ' >Everything you need to close the gap</h2>
          </div>


          <div className='mt-12 grid gap-6 md:grid-cols-3' >
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ delay: i * 0.1 }}
                className='group cursor-pointer rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-xl'
              >
                <span className='grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white'>
                  <Icon className='h-5 w-5 ' />
                </span>
                <h3 className='mt-4 font-semibold text-foreground' >{title}</h3>
                <p className='mt-2 text-sm text-muted-foreground' >{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id='how' className='mx-auto max-w-[900px] px-6 py-20 text-center' >
          <p className='text-xs uppercase tracking-[0.3em] text-primary font-medium' >
            How it works
          </p >
          <h2 className='mt-3 text-3xl font-bold text-foreground md:text-4xl' >
            Three steps to a better application
          </h2>

          <div className='mt-12 grid gap-6 text-left md:grid-cols-3' >
            {['Upload your resume & the job description', 'We extract, match, and score against ATS criteria', 'Get a clear report of gaps and next steps'].map((step, i) => (
              <motion.div
                key={step}
                whileHover={{ y: -6 }}
                className='group cursor-pointer rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow-xl'
              >
                <div className='grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm font-semibold text-white transition-transform group-hover:scale-110' >{i + 1}</div>
                <p className='mt-4 text-sm text-muted-foreground' >{step}</p>
              </motion.div>
            ))}
          </div>
        </section>


      </main>

      <Footer />
    </div>
  )
}

export default LandingPage