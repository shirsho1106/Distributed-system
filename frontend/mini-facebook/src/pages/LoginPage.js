import React, { useContext } from 'react'
import {Navigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
  
  let {loginUser, authenticated} = useContext(AuthContext)
  //if(authenticated) return <Navigate to="/"/>

  return (
    <div>
      <form onSubmit={loginUser}>
        <input type="email" name="email" placeholder="Enter Email" required/>
        <input type="password" name="password" placeholder="Enter Password" required/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default LoginPage
