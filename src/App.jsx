import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './pages/Signup'
import { Toaster } from 'sonner'
import Main from './pages/Dashboard/Main'
import Overview from './components/section/Overview'
import Tasks from './components/section/Tasks'
import Delegators from './components/section/Delegators'
import Profile from './components/section/Profile'
// import './index.css'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/overview' element={<Main children={<Overview/>}/>}/>
          <Route path='/tasks' element={<Main children={<Tasks/>}/>}/>
          <Route path='/delegators' element={<Main children={<Delegators/>}/>}/>
          <Route path='/profile' element={<Main children={<Profile/>}/>}/>
        </Routes>
        <Toaster richColors position="top-right" expand closeButton visibleToasts={1}/>
      </BrowserRouter>
    </>
  )
}

export default App