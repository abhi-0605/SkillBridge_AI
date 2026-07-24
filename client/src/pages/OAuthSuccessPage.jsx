import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../store/AuthContext.jsx'
import { getCurrentUser } from '../features/auth/authApi.js'

const OAuthSuccessPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const token = searchParams.get('token')

    const finishLogin = async () => {
      if (!token) {
        navigate('/login')
        return
      }
      localStorage.setItem('token', token)
      try {
        const res = await getCurrentUser()
        login(res.data, token)
        navigate('/dashboard')
      } catch (err) {
        navigate('/login')
      }
    }

    finishLogin()
  }, [searchParams, navigate, login])

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background text-muted-foreground">
      Signing you in...
    </div>
  )
}

export default OAuthSuccessPage