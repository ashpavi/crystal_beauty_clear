import './App.css'

import AdminPage from './pages/adminPage'
import LoginPage from './pages/loginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast' 
import Testing from './pages/testing'
import RegisterPage from './pages/client/registerpage'
import HomePage from './pages/homepage'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  return(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
    <Toaster position='top-right'/>
      <Routes path="/*">
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="/testing" element={<Testing/>} />


        
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
