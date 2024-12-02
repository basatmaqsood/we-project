import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ThankYou from '../pages/ThankYou'
import Home from './../pages/Home'
import Login from './../pages/Login'
import Register from './../pages/Register'
import SearchResultList from './../pages/SearchResultList'
import TourDetails from './../pages/TourDetails'
import Tours from './../pages/Tours'
import AdminPanel from '../pages/Admin'
import { AuthContext } from '../context/AuthContext'
import Error from '../components/Error/Error'
import About from '../pages/About'


const Routers = () => {
   const { user } = useContext(AuthContext);

   return (
      <Routes>
         <Route path='/' element={<Navigate to='/home'/>} />
         <Route path='/home' element={<Home/>} />
         <Route path='/admin' element={user?.role == "admin" ? <AdminPanel/> :<Error/>} />
         <Route path='/tours' element={<Tours/>} />
         <Route path='/tours/:id' element={<TourDetails/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>} />
         <Route path='/thank-you' element={<ThankYou/>} />
         <Route path='/tours/search' element={<SearchResultList/>} />
         <Route path='/about' element={<About/>} />
      </Routes>
   )
}

export default Routers