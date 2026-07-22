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
      <div className='pointer-events-none absolute inset-0' >
        <div className='animate-float absolute -left-20 top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl' />
        <div className="animate-float absolute right-0 top-96 h-80 w-80 rounded-full bg-accent/20 blur-3xl" style={{ animationDelay: '-3s' }} />
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
            className='mt-6 text-4xl font-bold leading-tight md:text-6xl'
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

            <Link
              to='/login'
              className='cursor-pointer rounded-xl border border-border bg-white/5 px-6 py-3 text-sm font-medium hover:bg-white/10 transition'
            >Sign in</Link>
          </motion.div>



        </section>

        {/* features section */}

        <section id='features' className='mx-auto max-w-[1200px] px-6 py-20' >
          <div className='mx-auto max-w-xl text-center' >
            <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground' >Core loop</p>
            <h2 className='mt-3 text-3xl font-bold md:text-4xl ' >Everything you need to close the gap</h2>
          </div>
        

        <div className='mt-12 grid gap-6 md:grid-cols-3' >
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className='glass rounded-2xl p-6'
            >
              <span className='grid h-11 w-11 place-items-center rounded-xl gradient-primary text-white'>
                <Icon className='h-5 w-5 ' />
              </span>
              <h3 className='mt-4 font-semibold ' >{title}</h3>
              <p className='mt-2 text-sm text-muted-foreground' >{desc}</p>
            </motion.div>
          ))}
        </div>
        </section>

        <section id='how' className='mx-auto max-w-[900px] px-6 py-20 text-center' >
          <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground' >
            How it works
          </p >
          <h2 className='mt-3 text-3xl font-bold md:text-4xl' >
            Three steps to a better application
          </h2>

          <div className='mt-12 grid gap-6 text-left md:grid-cols-3' >
            {['Upload your resume & the job description', 'We extract, match, and score against ATS criteria', 'Get a clear report of gaps and next steps'].map((step,i) => (
              <div key={step} className='glass rounded-2xl p-6' >
                <div className='grid h-8 w-8 place-items-center rounded-lg gradient-primary text-sm font-semibold text-white ' >{i+1}</div>
                <p className='mt-4 text-sm text-muted-foreground' >{step}</p>
              </div>  
            ))}
          </div>
        </section>


      </main>

      <Footer />   
    </div>
  )
}

export default LandingPage