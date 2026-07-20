import React from 'react'

const Field = ({ label, icon, action, children }) => {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>

      <div className="flex items-center gap-3 rounded-xl border border-border bg-white/5 px-4 py-3 transition focus-within:border-primary/60">
        {icon && <span className="text-muted-foreground">{icon}</span>}


        <div className="min-w-0 flex-1">{children}</div>
        {action}
      </div>

    </label>
  )
}

export default Field