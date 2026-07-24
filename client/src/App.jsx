import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ProtectedRoute from './components/common/ProtectedRoute.jsx'
import DashboardLayout from './components/layout/DashboardLayout.jsx'
import UploadPage from './pages/UploadPage.jsx'

import ReportsPage from './pages/ReportsPage.jsx'
import AnalysisDetailPage from './pages/AnalysisDetailPage.jsx'

import ProfilePage from './pages/ProfilePage.jsx'

import OAuthSuccessPage from './pages/OAuthSuccessPage.jsx'


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/oauth-success" element={<OAuthSuccessPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>

        }

      >
        <Route index element={<DashboardPage />} />

        <Route path="upload" element={<UploadPage />} />

        <Route path="reports" element={<ReportsPage />} />
        <Route path="analysis/:id" element={<AnalysisDetailPage />} />

        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}

export default App