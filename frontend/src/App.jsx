import React, { useEffect } from 'react'
import "./App.css"
import Navbar from './Components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Settings from './pages/Settings'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore();
  const {theme}=useThemeStore();
  console.log(onlineUsers)
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  console.log(authUser)

  if(isCheckingAuth && !authUser){
    return(
      <div className='flex items-center justify-center h-screen'>
          <Loader className="size-10 animate-spin"/>
      </div>
    )
  }
  return (
    <div data-theme={theme}>
      <Navbar/>

      <Routes>
        <Route path='/' element={authUser?<Homepage/>:<Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>
        <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
