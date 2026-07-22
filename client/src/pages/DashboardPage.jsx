import React from 'react'
import { useAuth } from '../store/AuthContext.jsx'

const DashboardPage = () => {
    const {user} =useAuth()

    

    return(
        <div>
            <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground' >Welcome back</p>
            <h1 className='mt-2 text-3xl font-bold md:text-4xl' >
                Hi {user?.name?.split(' ')[0]}, ready to <span className='gradient-text' >get started?</span>
            </h1>
            <p className='mt-2 text-sm text-muted-foreground' >
                Upload a resume and a job description to run your first analysis.
            </p>
        </div>
    )


}


export default DashboardPage