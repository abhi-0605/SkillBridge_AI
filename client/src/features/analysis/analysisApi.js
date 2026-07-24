import api from '../../lib/axios.js'

export const runAnalysis = async ({ resumeId, jdId }) => {
  const res = await api.post('/analysis', { resumeId, jdId })
  return res.data
}

export const getAnalyses = async () => {
  const res = await api.get('/analysis')
  return res.data
}

export const getAnalysisById = async (id) => {
  const res = await api.get(`/analysis/${id}`)
  return res.data
}