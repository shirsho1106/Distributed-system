import React, { useContext } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const RegisterPage = () => {
  
  const navigate = useNavigate()
  let {authenticated} = useContext(AuthContext)
  if(authenticated) return <Navigate to="/"/>


  let registerUser = async(event)=> {
    event.preventDefault();
    console.log("in registerUser");
    let response = await fetch('http://127.0.0.1:8000/register/', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'username':event.target.username.value,'email':event.target.email.value,
                            'password1':event.target.password.value, 'password2':event.target.password2.value})
    })
    if(response.status === 201){
        alert('user created')
        navigate("/", { replace: true });
    }
    else{
        alert('sth went wrong!')
    }
    }

  return (
    <div>
      {/* <form onSubmit={registerUser}>
        <input type="text" name="username" placeholder="Enter Username"/>
        <input type="email" name="email" placeholder="Enter Email"/>
        <input type="password" name="password2" placeholder="Enter Password"/>
        <input type="password" name="password" placeholder="Confirm Password"/>
        <input type="submit" />
      </form> */}

      <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={registerUser}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link to={"/login"} className="link-primary">
              Sign In
            </Link>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              name='username'
              className="form-control mt-1"
              placeholder="e.g shirsho_1106"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name='email'
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name='password'
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name='password2'
              className="form-control mt-1"
              placeholder="Confirm Password"
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

export default RegisterPage