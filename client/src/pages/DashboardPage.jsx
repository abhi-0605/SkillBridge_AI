import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext.jsx'

const DashboardPage = () => {
    const {user,logout} = useAuth()
    const navigate= useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return(
        <div className='min-h-dvh flex flex-col items-center justify-center gap-4 bg-background text-foreground' >
            <h1 className='text-3xl font-bold' >
                Welcome, <span className='gradient-text' >{user?.name || 'User'}</span>
            </h1>
            <p className='text-muted-foreground' >
                {user?.email}
            </p >
            <button
                onClick={logout} className='cursor-pointer rounded-xl boder border-border bg-white/5 px-5 py-2.5 text-sm hover:bg-white/10'
            >
                Logout
            </button>
        </div>
    )


}


export default DashboardPage