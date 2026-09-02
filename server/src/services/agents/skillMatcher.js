// Common aliases/synonyms — canonical forms are ALREADY in cleaned form (no punctuation)
const ALIAS_MAP = {
  // Frontend frameworks/libraries
  react: 'react js',
  reactjs: 'react js',
  'react js': 'react js',
  'react.js': 'react js',
  vue: 'vue js',
  vuejs: 'vue js',
  angular: 'angular js',
  angularjs: 'angular js',
  next: 'next js',
  nextjs: 'next js',
  nuxt: 'nuxt js',
  nuxtjs: 'nuxt js',

  // Backend
  node: 'node js',
  nodejs: 'node js',
  'node.js': 'node js',
  express: 'express js',
  expressjs: 'express js',
  'express.js': 'express js',
  nestjs: 'nest js',
  django: 'django',
  flask: 'flask',
  fastapi: 'fast api',
  spring: 'spring boot',
  springboot: 'spring boot',

  // Markup / styling
  html5: 'html',
  html: 'html',
  css3: 'css',
  css: 'css',
  scss: 'sass',
  sass: 'sass',
  tailwind: 'tailwind css',
  tailwindcss: 'tailwind css',
  bootstrap: 'bootstrap',
  'responsive design': 'responsive web design',
  'responsive ui': 'responsive web design',
  'mobile first design': 'responsive web design',
  'mobile responsive': 'responsive web design',

  // APIs
  'restful api': 'rest api',
  'restful apis': 'rest api',
  'rest apis': 'rest api',
  'rest api development': 'rest api',
  'api development': 'rest api',
  graphql: 'graphql',
  grpc: 'grpc',

  // Auth
  jwt: 'jwt authentication',
  'jwt auth': 'jwt authentication',
  'authentication jwt': 'jwt authentication',
  oauth: 'oauth',
  oauth2: 'oauth',
  'oauth 2 0': 'oauth',
  sso: 'single sign on',

  // Cloud / DevOps
  'amazon web services': 'aws',
  ec2: 'aws',
  s3: 'aws',
  lambda: 'aws',
  gcp: 'google cloud platform',
  'google cloud': 'google cloud platform',
  azure: 'azure',
  ci: 'ci cd',
  cd: 'ci cd',
  'continuous integration': 'ci cd',
  'continuous deployment': 'ci cd',
  'continuous delivery': 'ci cd',
  docker: 'docker',
  containerization: 'docker',
  kubernetes: 'kubernetes',
  k8s: 'kubernetes',

  // Databases
  mongo: 'mongodb',
  mongodb: 'mongodb',
  postgres: 'postgresql',
  postgresql: 'postgresql',
  mysql: 'mysql',
  redis: 'redis',
  sql: 'sql',

  // Languages
  ts: 'typescript',
  typescript: 'typescript',
  js: 'javascript',
  javascript: 'javascript',
  'es6': 'javascript es6',
  'es6+': 'javascript es6',
  'ecmascript 6': 'javascript es6',

  // Testing
  jest: 'jest',
  mocha: 'mocha',
  chai: 'chai',
  cypress: 'cypress',
  'react testing library': 'react testing library',
  rtl: 'react testing library',
  'unit testing': 'testing',
  'unit tests': 'testing',

  // State management
  redux: 'redux',
  'context api': 'context api',
  zustand: 'zustand',
  recoil: 'recoil',

  // Version control / tools
  git: 'git',
  github: 'github',
  gitlab: 'gitlab',
  bitbucket: 'bitbucket',
  postman: 'postman',
  npm: 'npm',
  yarn: 'yarn',
  vite: 'vite',
  webpack: 'webpack',

  // Methodology
  agile: 'agile development',
  'agile methodologies': 'agile development',
  'agile development methodologies': 'agile development',
  scrum: 'agile development',
  kanban: 'agile development',

  // Role phrasing
  'full stack developer': 'full stack development',
  'full stack': 'full stack development',
  'fullstack developer': 'full stack development',
  'fullstack': 'full stack development',
  'frontend developer': 'frontend development',
  'front end developer': 'frontend development',
  'front-end developer': 'frontend development',
  'backend developer': 'backend development',
  'back end developer': 'backend development',
  'back-end developer': 'backend development',

  dsa: 'data structures and algorithms',
  'data structures & algorithms': 'data structures and algorithms',
  'data structures and algorithms': 'data structures and algorithms',

  api: 'api',
  apis: 'api',
  database: 'database',
  databases: 'database',


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


// Match resume keywords against JD keywords, returning matched, missing, and extra skills
export const matchSkills = (resumeKeywords, jdKeywords) => {
  const normalizedResume = resumeKeywords.map((k) => ({ original: k, norm: normalize(k) }))

  // Deduplicate JD keywords that normalize to the same skill (e.g. "HTML" and "HTML5"
  // both meaning the same thing) — keep only the first original label for each unique meaning
  const seenNorms = new Set()
  const normalizedJD = jdKeywords
    .map((k) => ({ original: k, norm: normalize(k) }))
    .filter((jd) => {
      if (seenNorms.has(jd.norm)) return false
      seenNorms.add(jd.norm)
      return true
    })

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