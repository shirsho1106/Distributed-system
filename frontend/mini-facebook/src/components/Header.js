import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let {user, logout} = useContext(AuthContext)
  return (
    <div>
      <Link to="/">Home</Link>
      <span>|</span>
      {user ?
        (<p onClick={logout}>Logout</p>)
      :
        (<Link to="/login">Login</Link>)}
      
      {user && <p>Hello {user.username}</p>}
    </div>
  )
}

export default Header