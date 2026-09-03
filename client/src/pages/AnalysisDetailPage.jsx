import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CheckCircle2, XCircle, Zap } from 'lucide-react'
import { getAnalysisById } from '../features/analysis/analysisApi.js'

const AnalysisDetailPage = () => {
    const { id } = useParams()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAnalysisById(id)
                setData(res.data)
            } catch (err) {
                setError('Failed to fetch analysis. Please try again later.')
            } finally {
                setLoading(false)
            }
        }
        fetchData()

    }, [id])

    if (loading) return <p className='text-sm text-muted-foreground' >Loading...</p>
    if (error) return <p className='text-sm text-danger' >{error}</p>
    if (!data) return null

    const { analysis, report } = data
    const score = analysis.atsScore?.overall ?? 0

    return (
        <div className='space-y-8' >
            <div>
                <p className='text-xs uppercase tracking-[0.3em] text-primary font-medium'>Analysis report</p>
                <h1 className='mt-2 text-3xl font-bold text-foreground md:text-4xl'>
                    {analysis.jobDescription?.title || 'Job Description'}
                    {analysis.jobDescription?.company && <span className='text-muted-foreground'> · {analysis.jobDescription.company}</span>}
                </h1>
            </div>

            <div className='grid gap-4 lg:grid-cols-3'>
                <div className='rounded-2xl border border-border bg-white p-6 text-center shadow-sm'>
                    <div className='mx-auto grid h-32 w-32 place-items-center rounded-full bg-primary/10'>
                        <div>
                            <div className='text-4xl font-bold text-primary'>{score}</div>
                            <div className='text-xs uppercase tracking-[0.2em] text-muted-foreground'>ATS Score</div>
                        </div>
                    </div>
                </div>

                <div className='rounded-2xl border border-border bg-white p-6 shadow-sm lg:col-span-2'>
                    <h2 className='mb-4 font-semibold text-foreground'>Score breakdown</h2>
                    <div className='grid grid-cols-3 gap-4'>
                        {[
                            { label: 'Keyword match', value: analysis.atsScore?.breakdown?.keywordMatch },
                            { label: 'Skill match', value: analysis.atsScore?.breakdown?.skillMatch },
                            { label: 'Formatting', value: analysis.atsScore?.breakdown?.formatting },
                        ].map((b) => (
                            <div key={b.label} className='rounded-xl bg-gray-50 p-4'>
                                <div className='text-2xl font-semibold text-foreground'>{b.value ?? '-'}</div>
                                <div className='text-xs text-muted-foreground'>{b.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



            <div className='grid gap-4 lg:grid-cols-2'>
                <div className='rounded-2xl border border-border bg-white p-6 shadow-sm'>
                    <div className='mb-4 flex items-center gap-2'>
                        <CheckCircle2 className='h-4 w-4 text-success' />
                        <h2 className='font-semibold text-foreground'>Matched skills ({analysis.skillMatch?.matchedSkills?.length || 0})</h2>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {analysis.skillMatch?.matchedSkills?.map((s) => (
                            <span key={s} className='rounded-full bg-success/10 px-3 py-1.5 text-xs text-success'>{s}</span>
                        ))}
                    </div>
                </div>

                <div className='rounded-2xl border border-border bg-white p-6 shadow-sm'>
                    <div className='mb-4 flex items-center gap-2'>
                        <XCircle className='h-4 w-4 text-danger' />
                        <h2 className='font-semibold text-foreground'>Missing skills ({analysis.skillMatch?.missingSkills?.length || 0})</h2>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                        {analysis.skillMatch?.missingSkills?.map((s) => (
                            <span key={s} className='rounded-full bg-danger/10 px-3 py-1.5 text-xs text-danger'>{s}</span>
                        ))}
                    </div>
                </div>
            </div>


            {report && (
                <div className='glass rounded-2xl p-6' >
                    <div className='mb-4 flex items-center gap-2' >
                        <Zap className='h-4 w-4 text-warning' />
                        <h2 className=' font-semibold' >AI report</h2>
                    </div>
                    <p className='text-sm text-muted-foreground' >{report.summary}</p>

                    <div className='mt-5 grid gap-4 md:grid-cols-2' >
                        <div>
                            <h3 className='mb-2 text-sm font-medium' >Strengths</h3>
                            <ul className='space-y-2 text-sm text-muted-foreground' >
                                {report.strengths?.map((s, i) => <li key={i}>• {s}</li>)}
                            </ul>
                        </div>

                        <div  >
                            <h3 className='mb-2 text-sm font-medium' >Weaknesses</h3>
                            <ul className='space-y-2 text-sm text-muted-foreground' >
                                {report.weaknesses?.map((s, i) => <li key={i}>• {s}</li>)}
                            </ul>
                        </div>
                    </div>

                    <div className='mt-5' >
                        <h3 className='mb-2 text-sm font-medium' >Recommendations</h3>
                        <ul className='space-y-2 text-sm text-muted-foreground' >
                            {report.recommendations?.map((s, i) => <li key={i}>{i + 1}. {s}</li>)}
                        </ul>
                    </div>
                </div>
            )}



        </div>
    )
}

export default AnalysisDetailPage
