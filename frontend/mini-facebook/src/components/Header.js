import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

const Header = () => {
  let {user, logout} = useContext(AuthContext)
  return (
    <div style={{marginLeft:"100px"}}>
    <Navbar bg="light">
      <Nav className="me-auto">
      <Nav.Link to="/">Home</Nav.Link>
      {user ?
        (<Nav.Link onClick={logout}>Logout</Nav.Link>)
      :
        (<Nav.Link to="/login">Login</Nav.Link>)
      }
      
      {user && <Nav.Link >Hello {user.username}</Nav.Link>}
      </Nav>
    </Navbar>
    </div>
  )
}

export default Header