import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Error = () => {
   
   const { user } = useContext(AuthContext)

   return (
    <h1>{user.username}, You are not Authorized. This page is for Admins only.</h1>
   )
}

export default Error