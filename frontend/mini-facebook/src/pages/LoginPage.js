import React, { useContext } from 'react'
import {Link, Navigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const LoginPage = () => {
  
  let {loginUser, authenticated} = useContext(AuthContext)
  if(authenticated) return <Navigate to="/"/>

  return (
    <div>
      {/* <form onSubmit={loginUser}>
        <input className='mb-3' type="email" name="email" placeholder="Enter Email" required/>
        <input type="password" name="password" placeholder="Enter Password" required/>
        <input type="submit" />
      </form> */}
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={loginUser}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <Link to={"/register"} className="link-primary">
                Sign Up
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                name='password'
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
