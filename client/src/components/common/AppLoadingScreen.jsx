import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const AppLoadingScreen = ({ wakingUp }) => {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-background text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -left-20 top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="animate-float absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl" style={{ animationDelay: '-3s' }} />
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="relative grid h-14 w-14 place-items-center rounded-2xl gradient-primary shadow-lg shadow-primary/30"
      >
        <Sparkles className="h-6 w-6 text-white" />
      </motion.div>

      <p className="relative mt-6 text-sm font-medium">
        {wakingUp ? 'Waking up the server...' : 'Loading SkillBridge AI...'}
      </p>

      {wakingUp && (
        <p className="relative mt-2 max-w-xs text-xs text-muted-foreground">
          Our free-tier backend sleeps after inactivity. This can take up to a minute on the first request — thanks for your patience.
        </p>
      )}
    </div>
  )
}

export default AppLoadingScreen