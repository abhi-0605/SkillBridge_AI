import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser } from '../features/auth/authApi.js'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [wakingUp, setWakingUp] = useState(false)

  const fetchUser = async () => {
    const wakeTimer = setTimeout(() => setWakingUp(true), 2500)

    try {
      const res = await getCurrentUser()
      setUser(res.data)
    } catch (error) {
      setUser(null)
    } finally {
      clearTimeout(wakeTimer)
      setWakingUp(false)
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const login = (userData, token) => {
    localStorage.setItem('token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, wakingUp, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)





// import React, { createContext, useContext, useState, useEffect } from 'react'
// import { getCurrentUser } from '../features/auth/authApi.js'

// const AuthContext = createContext(null)

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(true)

//     const fetchUser = async () => {
//         try {
//             const res = await getCurrentUser();
//             setUser(res.data)
//         } catch (error) {
//             setUser(null)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => {
//         const token = localStorage.getItem('token')
//         if (token) {
//             fetchUser()
//         } else {
//             setLoading(false)
//         }
//     }, [])

//     const login = (userData, token) => {
//         localStorage.setItem('token', token)
//         setUser(userData)
//     }

//     const logout = () => {
//         localStorage.removeItem('token')
//         setUser(null)
//     }

//     return (
//         <AuthContext.Provider value={{ user, loading, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }


// export const useAuth = () => useContext(AuthContext)