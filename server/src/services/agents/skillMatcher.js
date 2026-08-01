// Common aliases/synonyms — canonical forms are ALREADY in cleaned form (no punctuation)
const ALIAS_MAP = {
  html5: 'html',
  css3: 'css',
  express: 'express js',
  expressjs: 'express js',
  'express js': 'express js',
  node: 'node js',
  nodejs: 'node js',
  'node js': 'node js',
  react: 'react js',
  reactjs: 'react js',
  'react js': 'react js',
  'restful api': 'rest api',
  'restful apis': 'rest api',
  'rest apis': 'rest api',
  'rest api development': 'rest api',
  jwt: 'jwt authentication',
  'jwt auth': 'jwt authentication',
  'authentication jwt': 'jwt authentication',
  'amazon web services': 'aws',
  ec2: 'aws',
  mongo: 'mongodb',
  ts: 'typescript',
  js: 'javascript',
  'full stack developer': 'full stack development',
  'full stack': 'full stack development',
  'agile methodologies': 'agile development',
  'agile development methodologies': 'agile development',
  agile: 'agile development',
}


const normalize = (str) => {
  const cleaned = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

  return ALIAS_MAP[cleaned] || cleaned
}


const isMatch = (a, b) => {
  if (a === b) return true

  const tokensA = a.split(' ')
  const tokensB = b.split(' ')

 
  if (tokensA.length >= 2 && tokensB.length >= 2) {
    const setB = new Set(tokensB)
    const setA = new Set(tokensA)
    const aSubsetOfB = tokensA.every((t) => setB.has(t))
    const bSubsetOfA = tokensB.every((t) => setA.has(t))
    if (aSubsetOfB || bSubsetOfA) return true
  }

  // Fallback: simple containment for cases like "react js" appearing inside a longer resume phrase
  if (a.length > 3 && b.includes(a)) return true
  if (b.length > 3 && a.includes(b)) return true

  return false
}

export const matchSkills = (resumeKeywords, jdKeywords) => {
  const normalizedResume = resumeKeywords.map((k) => ({ original: k, norm: normalize(k) }))
  const normalizedJD = jdKeywords.map((k) => ({ original: k, norm: normalize(k) }))

  const matchedSkills = []
  const missingSkills = []
  const matchedResumeIndexes = new Set()

  normalizedJD.forEach((jd) => {
    const matchIndex = normalizedResume.findIndex(
      (res, idx) => !matchedResumeIndexes.has(idx) && isMatch(jd.norm, res.norm)
    )

    if (matchIndex !== -1) {
      matchedSkills.push(jd.original)
      matchedResumeIndexes.add(matchIndex)
    } else {
      missingSkills.push(jd.original)
    }
  })

  const extraSkills = normalizedResume
    .filter((_, idx) => !matchedResumeIndexes.has(idx))
    .map((res) => res.original)

  const matchPercentage = jdKeywords.length > 0
    ? Math.round((matchedSkills.length / jdKeywords.length) * 100)
    : 0

  return {
    matchedSkills,
    missingSkills,
    extraSkills,
    matchPercentage,
  }
}