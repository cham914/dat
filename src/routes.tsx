import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Congrats from './pages/congrats'



export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to={"/apply"} />} />
            <Route path='/apply' element={<Login/>}/>
            <Route path='/success' element={<Congrats/>}/>
            
        </Routes>
    </BrowserRouter>
  )
}