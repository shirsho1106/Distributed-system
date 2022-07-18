import React, { useContext } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
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
      <form onSubmit={registerUser}>
        <input type="text" name="username" placeholder="Enter Username"/>
        <input type="email" name="email" placeholder="Enter Email"/>
        <input type="password" name="password2" placeholder="Enter Password"/>
        <input type="password" name="password" placeholder="Confirm Password"/>
        <input type="submit" />
      </form>
    </div>
  )
}

export default RegisterPage