import './App.css'

import AdminPage from './pages/adminPage'
import LoginPage from './pages/loginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Testing from './pages/testing'

function App() {
  return(
    <BrowserRouter>
    <Toaster position='top-right'/>
      <Routes path="/*">
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/testing" element={<Testing/>} />


        <Route path="/*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
