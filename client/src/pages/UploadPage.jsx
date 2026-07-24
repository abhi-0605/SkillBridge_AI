import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, FileText, Upload, X, ClipboardList } from 'lucide-react'
import { extractResumeText } from '../lib/extractResumeText.js'
import api from '../lib/axios.js'
import { runAnalysis } from '../features/analysis/analysisApi.js'

const UploadPage = () => {
  const [resumeMode, setResumeMode] = useState('file') // 'file' | 'paste'
  const [file, setFile] = useState(null)
  const [parsing, setParsing] = useState(false)
  const [parsedText, setParsedText] = useState('')
  const [parseError, setParseError] = useState('')
  const [pastedResume, setPastedResume] = useState('')
  const [jd, setJd] = useState('')
  const [jdTitle, setJdTitle] = useState('')
  const [jdCompany, setJdCompany] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const navigate = useNavigate()

  const handleFile = async (selectedFile) => {
    setFile(selectedFile)
    setParsedText('')
    setParseError('')
    setParsing(true)

    try {
      const { text } = await extractResumeText(selectedFile)
      if (text.length < 50) {
        throw new Error('Very little text found. This file may be image-based — try "Paste text" instead.')
      }
      setParsedText(text)
    } catch (err) {
      setParseError(err.message || 'Failed to parse file.')
    } finally {
      setParsing(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) handleFile(dropped)
  }

  const removeFile = () => {
    setFile(null)
    setParsedText('')
    setParseError('')
  }

  const finalResumeText = resumeMode === 'file' ? parsedText : pastedResume
  const canSubmit = finalResumeText.trim().length > 50 && jd.trim().length > 40

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitError('')

    try {
      const resumeRes = await api.post('/resume', {
        fileName: resumeMode === 'file' ? file?.name : 'Pasted resume',
        fileType: resumeMode === 'file' ? file?.name.split('.').pop() : 'pdf',
        rawText: finalResumeText,
      })

      const jdRes = await api.post('/jd', {
        title: jdTitle.trim() || null,
        company: jdCompany.trim() || null,
        rawText: jd,
      })

      const resumeId = resumeRes.data.data._id
      const jdId = jdRes.data.data._id

      const analysisRes = await runAnalysis({ resumeId, jdId })
      const analysisId = analysisRes.data.analysis._id

      navigate(`/dashboard/analysis/${analysisId}`)
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">New analysis</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">Upload resume & job description</h1>
        <p className="mt-2 text-sm text-muted-foreground">Parsing happens right in your browser — nothing is uploaded until you run the analysis.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Resume section */}
        <div className="glass rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary">
                <Upload className="h-4 w-4 text-white" />
              </span>
              <h2 className="font-semibold">Your resume</h2>
            </div>
            <div className="flex rounded-lg border border-border p-0.5 text-xs">
              <button
                onClick={() => setResumeMode('file')}
                className={`cursor-pointer rounded-md px-3 py-1.5 transition ${resumeMode === 'file' ? 'bg-white/10 text-foreground' : 'text-muted-foreground'}`}
              >
                Upload file
              </button>
              <button
                onClick={() => setResumeMode('paste')}
                className={`cursor-pointer rounded-md px-3 py-1.5 transition ${resumeMode === 'paste' ? 'bg-white/10 text-foreground' : 'text-muted-foreground'}`}
              >
                Paste text
              </button>
            </div>
          </div>

          {resumeMode === 'paste' ? (
            <textarea
              value={pastedResume}
              onChange={(e) => setPastedResume(e.target.value)}
              placeholder="Paste your resume text here..."
              className="h-64 w-full resize-none rounded-2xl border border-border bg-white/[0.03] p-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60"
            />
          ) : !file ? (
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-white/[0.02] p-12 text-center transition hover:border-primary/50 hover:bg-white/5"
            >
              <div className="animate-float grid h-16 w-16 place-items-center rounded-2xl gradient-primary shadow-lg shadow-primary/30">
                <Upload className="h-7 w-7 text-white" />
              </div>
              <div className="mt-4 text-base font-medium">Drop your resume here</div>
              <div className="text-xs text-muted-foreground">or click to browse · PDF, DOCX · max 10 MB</div>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                {['PDF', 'DOCX'].map((x) => (
                  <span key={x} className="rounded-full border border-border bg-white/5 px-2.5 py-1">{x}</span>
                ))}
              </div>
            </label>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-white/5 p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-white">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</div>
                </div>
                <button onClick={removeFile} className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg hover:bg-white/10">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {parsing && <div className="mt-4 text-xs text-muted-foreground">Parsing file...</div>}

              {parseError && (
                <div className="mt-4 rounded-xl bg-danger/10 px-3 py-2 text-xs text-danger">{parseError}</div>
              )}

              {!parsing && parsedText && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-success/10 px-3 py-2 text-xs text-success">
                  <CheckCircle2 className="h-4 w-4" /> Parsed successfully — {parsedText.length.toLocaleString()} characters extracted
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* JD */}
        <div className="glass rounded-2xl p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg gradient-primary">
              <ClipboardList className="h-4 w-4 text-white" />
            </span>
            <h2 className="font-semibold">Job description</h2>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-3">
            <input
              type="text"
              value={jdTitle}
              onChange={(e) => setJdTitle(e.target.value)}
              placeholder="Job title (optional)"
              className="rounded-xl border border-border bg-white/[0.03] px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60"
            />
            <input
              type="text"
              value={jdCompany}
              onChange={(e) => setJdCompany(e.target.value)}
              placeholder="Company (optional)"
              className="rounded-xl border border-border bg-white/[0.03] px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60"
            />
          </div>

          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the job description here..."
            className="h-56 w-full resize-none rounded-2xl border border-border bg-white/[0.03] p-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60"
          />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{jd.length.toLocaleString()} / 20,000 characters</span>
          </div>

          {submitError && (
            <p className="mt-3 rounded-lg bg-danger/10 px-3 py-2 text-xs text-danger">{submitError}</p>
          )}

          <motion.button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            whileHover={{ scale: canSubmit && !submitting ? 1.01 : 1 }}
            whileTap={{ scale: canSubmit && !submitting ? 0.98 : 1 }}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition ${
              canSubmit && !submitting
                ? 'cursor-pointer gradient-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/60'
                : 'cursor-not-allowed bg-white/5 text-muted-foreground'
            }`}
          >
            {submitting ? 'Analyzing... this takes 20-40 seconds' : 'Run AI analysis'}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default UploadPage