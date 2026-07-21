import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react'
import AuthShell from '../components/common/AuthShell.jsx'
import Field from '../components/common/Field.jsx'
import GoogleButton from '../components/common/GoogleButton.jsx'
import { loginUser } from '../features/auth/authApi.js'
import { useAuth } from '../store/AuthContext.jsx'


const LoginPage = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await loginUser({ email, password })
      login(res.data, res.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }

  }



  return (
    <AuthShell
      title='Welcome back!'
      sub='Sign in to continue your career journey.'
      footer={<>Don't have an account? <Link to='/register' className='text-primary hover:underline' >Create one</Link></>}
    >
      <form className='space-y-4' onSubmit={handleSubmit} >
        <GoogleButton />
        <div className='flex items-center gap-3 text-xs text-muted-foreground' >
          <span className='h-px flex-1 bg-border' /> <span /> Or <span className='h-px flex-1 bg-border' />
        </div>

        <Field label='Email' icon={<Mail className='h-4 w-4' />} >
          <input
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            className='w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground'

          />
        </Field>

        <Field label='Password' icon={<Lock className='h-4 w-4' />}
          action={
            <button type='button' onClick={() => setShowPassword(!showPassword)} className='text-muted-foreground hover:text-foreground' >
              {showPassword ? <EyeOff className='h-4w-4' /> : <Eye className='h-4 w-4' />}
            </button>
          }
        >
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            className='w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground'

          />
        </Field>

        {error && (<p className='rounded-lg bg-danger/10 px-3 py-2 text-xs text-danger' >{error}</p>)}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.015 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl gradient-primary py-3 text-sm font-medium text-white shadow-lg shadow-primary/30 transition-shadow hover:shadow-primary/60 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign in'}
          {!loading && <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />}
        </motion.button>
      </form>
    </AuthShell>


  )


}

export default LoginPage