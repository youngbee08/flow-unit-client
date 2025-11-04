import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Toaster } from 'sonner'

import Waitlist from './pages/Waitlist'
// import './index.css'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route path='/' element={<Waitlist/>}/>
        </Routes>
        <Toaster richColors position="top-right" expand closeButton visibleToasts={1}/>
      </BrowserRouter>
    </>
  )
}

export default App