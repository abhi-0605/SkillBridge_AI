import React, { useEffect, useState } from 'react'
import { Mail, User, Shield, Calendar, FileText, Gauge } from 'lucide-react'
import { useAuth } from '../store/AuthContext.jsx'
import { getAnalyses } from '../features/analysis/analysisApi.js'

const ProfilePage = () => {
    const { user } = useAuth()
    const [analyses, setAnalyses] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAnalyses = async () => {
            try {
                const res = await getAnalyses()
                setAnalyses(res.data)
            } catch (err) {
                // silent fail on profile
            } finally {
                setLoading(false)
            }
        }
        fetchAnalyses()
    }, [])

    const totalAnalyses = analyses.length
    const scores = analyses.map((a) => a.atsScore?.overall).filter((s) => typeof s === 'number')
    const bestScore = scores.length > 0 ? Math.max(...scores) : null

    return (
        <div className='space-y-8' >
            <div>
                <p className='text-xs uppercase tracking-[0.3em] text-muted-foreground' >Profile</p>
                <h1 className='mt-2 text-3xl font-bold md:text-4xl' >Account</h1>
            </div>

            <div className='grid gap-6 lg:grid-cols-3' >
                <div className='glass rounded-2xl p-6 text-center' >
                    <div className='mx-auto grid h-24 w-24 place-items-center rounded-full gradient-primary text-3xl font-bold text-white shadow-lg shadow-primary/40' >
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>

                    <h2 className='mt-4 text-xl font-semibold' >{user?.name}</h2>
                    <p className='text-sm text-muted-foreground' >{user?.email}</p>

                    <div className='mt-5 grid grid-cols-2 gap-3 text-center text-xs' >
                        <div className='rounded-xl border border-border bg-white/5 p-3' >
                            <div className='text-lg font-semibold' >{loading ? '-' : totalAnalyses}</div>
                            <div className='mt-1 text-[10px] uppercase tracking-wider text-muted-foreground' >Analyses</div>
                        </div>

                        <div className='rounded-xl border border-border bg-white/5 p-3' >
                            <div className='text-lg font-semibold' >{loading ? '-' : bestScore ?? '—'}</div>
                            <div className='mt-1 text-[10px] uppercase tracking-wider text-muted-foreground' >Best Score</div>
                        </div>
                    </div>
                </div>


                <div className='glass rounded-2xl p-6 lg:col-span-2' >
                    <h2 className='mb-4 font-semibold' >Account details</h2>
                    <div className='space-y-4' >
                        <DetailRow icon={<User className="h-4 w-4" />} label="Full name" value={user?.name} />
                        <DetailRow icon={<Mail className="h-4 w-4" />} label="Email" value={user?.email} />
                        <DetailRow icon={<Shield className="h-4 w-4" />} label="Role" value={user?.role} />
                        <DetailRow
                            icon={<Calendar className="h-4 w-4" />}
                            label="Sign-in method"
                            value={user?.email ? 'Email & password' : 'Google'}
                        />
                    </div>
                </div>


            </div>


            <div className="glass rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <h2 className="font-semibold">Activity</h2>
                </div>
                {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
                {!loading && totalAnalyses === 0 && (
                    <p className="text-sm text-muted-foreground">No analyses yet.</p>
                )}
                {!loading && totalAnalyses > 0 && (
                    <p className="text-sm text-muted-foreground">
                        You've run <span className="font-medium text-foreground">{totalAnalyses}</span> analysis{totalAnalyses !== 1 ? 'es' : ''} so far,
                        with a best ATS score of <span className="font-medium text-foreground">{bestScore}</span>.
                    </p>
                )}
            </div>
        </div>
    )
}



const DetailRow = ({ icon, label, value }) => {
    return (
        <div className='flex items-center gap-3 rounded-xl border border-border bg-white/5 px-4 py-3' >
            <span className='text-muted-foreground' >{icon}</span>
            <div className='min-w-0 flex-1' >
                <div className='text-xs text-muted-foreground' >{label}</div>
                <div className='truncate text-sm font-medium capitalize' >{value || '-'}</div>
            </div>
        </div>
    )
}

export default ProfilePage
