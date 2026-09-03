import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { getAnalyses } from '../features/analysis/analysisApi.js'

const ReportsPage = () => {
    const [analyses, setAnalyses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchAnalyses = async () => {
            try {
                const res = await getAnalyses()
                setAnalyses(res.data)
            } catch (err) {
                setError('Failed to fetch analyses. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchAnalyses()
    }, [])

    return (
        <div className='space-y-8' >
            <div>
                <p className='text-xs uppercase tracking-[0.3em] text-primary font-medium'>Reports</p>
                <h1 className='mt-2 text-3xl font-bold text-foreground md:text-4xl'>Your analysis history</h1>
            </div>

            {loading && <p className='text-sm text-muted-foreground' >Loading... </p>}
            {error && <p className='text-sm text-danger' > {error} </p>}


            {!loading && analyses.length === 0 && (
                <div className='rounded-2xl border border-border bg-white p-10 text-center text-muted-foreground shadow-sm'>
                    <FileText className='mx-auto h-8 w-8' />
                    <p className='mt-3 text-sm'>No analyses yet. Upload a resume to get started.</p>
                    <Link to='/dashboard/upload' className='mt-4 inline-block cursor-pointer rounded-xl gradient-primary px-5 py-2.5 text-sm font-medium text-white'>
                        New analysis
                    </Link>
                </div>
            )}

            <div className='overflow-hidden rounded-2xl border border-border bg-white shadow-sm'>
                {analyses.map((a) => (
                    <Link
                        key={a._id}
                        to={`/dashboard/analysis/${a._id}`}
                        className='flex cursor-pointer items-center gap-4 border-b border-border px-5 py-4 transition hover:bg-gray-50 last:border-b-0'
                    >
                        <div className='grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10'>
                            <FileText className='h-4 w-4 text-primary' />
                        </div>
                        <div className='min-w-0 flex-1'>
                            <div className='truncate text-sm font-medium text-foreground'>
                                {a.jobDescription?.title || 'Job Description'} {a.jobDescription?.company ? `· ${a.jobDescription.company}` : ''}
                            </div>
                            <div className='text-xs text-muted-foreground'>{new Date(a.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div className='text-lg font-semibold text-foreground'>{a.atsScore?.overall ?? '-'}</div>
                    </Link>
                ))}
            </div>



        </div>
    )



}


export default ReportsPage