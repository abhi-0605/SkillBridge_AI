import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Gauge, TrendingUp, Upload, Sparkles, Target, Zap } from 'lucide-react'
import { useAuth } from '../store/AuthContext.jsx'
import { getAnalyses } from '../features/analysis/analysisApi.js'

const DashboardPage = () => {
  const { user } = useAuth()
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const res = await getAnalyses()
        setAnalyses(res.data)
      } catch (err) {
        // silent fail on overview
      } finally {
        setLoading(false)
      }
    }
    fetchAnalyses()
  }, [])

  const totalAnalyses = analyses.length
  const scores = analyses.map((a) => a.atsScore?.overall).filter((s) => typeof s === 'number')
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null
  const bestScore = scores.length > 0 ? Math.max(...scores) : null
  const recent = analyses.slice(0, 5)

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading...</p>
  }

  // First-time / empty state — no analyses yet
  if (totalAnalyses === 0) {
    return (
      <div className="space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Welcome back</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Hi {user?.name?.split(' ')[0]}, let's find your <span className="gradient-text">first match.</span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-accent/15 blur-3xl" />

          <div className="relative">
            <div className="animate-float mx-auto grid h-16 w-16 place-items-center rounded-2xl gradient-primary shadow-lg shadow-primary/30">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <h2 className="mt-5 text-xl font-semibold">Run your first analysis</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Upload your resume and paste a job description. We'll score your ATS match and show you exactly what to fix — in under a minute.
            </p>
            <Link
              to="/dashboard/upload"
              className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-medium text-white shadow-lg shadow-primary/30 hover:shadow-primary/60"
            >
              <Upload className="h-4 w-4" /> Start your first analysis
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Gauge, title: 'ATS scoring', desc: 'See exactly how applicant tracking systems will read your resume.' },
            { icon: Target, title: 'Skill matching', desc: "Find out which skills you're missing for a specific role." },
            { icon: Zap, title: 'AI recommendations', desc: 'Get specific, actionable suggestions — not generic tips.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass rounded-2xl p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-sm font-semibold">{title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Returning user with history — stats + recent list
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Welcome back</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Hi {user?.name?.split(' ')[0]}, ready to <span className="gradient-text">get started?</span>
        </h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="glass rounded-2xl p-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
            <FileText className="h-5 w-5" />
          </span>
          <div className="mt-4 text-3xl font-bold">{totalAnalyses}</div>
          <div className="mt-1 text-xs text-muted-foreground">Total analyses</div>
        </div>

        <div className="glass rounded-2xl p-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
            <Gauge className="h-5 w-5" />
          </span>
          <div className="mt-4 text-3xl font-bold">{avgScore ?? '—'}</div>
          <div className="mt-1 text-xs text-muted-foreground">Average ATS score</div>
        </div>

        <div className="glass rounded-2xl p-5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success">
            <TrendingUp className="h-5 w-5" />
          </span>
          <div className="mt-4 text-3xl font-bold">{bestScore ?? '—'}</div>
          <div className="mt-1 text-xs text-muted-foreground">Best ATS score</div>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Recent analyses</h2>
          <Link to="/dashboard/reports" className="cursor-pointer text-xs text-primary hover:underline">
            View all
          </Link>
        </div>

        <div className="divide-y divide-border/60">
          {recent.map((a) => (
            <Link
              key={a._id}
              to={`/dashboard/analysis/${a._id}`}
              className="flex cursor-pointer items-center gap-4 py-3 transition hover:bg-white/[0.03]"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium">
                  {a.jobDescription?.title || 'Job Description'}
                  {a.jobDescription?.company ? ` · ${a.jobDescription.company}` : ''}
                </div>
                <div className="text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleDateString()}</div>
              </div>
              <div className="text-lg font-semibold">{a.atsScore?.overall ?? '-'}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage