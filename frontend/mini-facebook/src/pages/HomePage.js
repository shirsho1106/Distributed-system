import React, { useContext, useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const HomePage = () => {
  
  let {authenticated,authTokens} = useContext(AuthContext)
  let [notes,setNotes] = useState([])

  useEffect(()=>{
    getNotes()
  },[])
  
  if(!authenticated) {return <Navigate to="/login"/>}
  
  let getNotes = async () => {
    let response = await fetch('http://127.0.0.1:8000/status/', {
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + String(authTokens.access) 
      }
    })
    let data = await response.json()
    console.log(data);
    if (response.status===200) setNotes(data)
  }
        
  async function pull(e) {
  e.preventDefault();
        console.log("in loginUser");
        let response = await fetch('http://127.0.0.1:8000/status/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            body:JSON.stringify({"body":e.target.status.value})
        })
        if(response.status === 201){
          e.target.status.value = ""
          alert('created')
        }
        else{
            alert('sth went wrong!')
        }
  
}
  return (
    <div>
      <form onSubmit={pull}>
        <input type="text" name="status" placeholder="what's on yr mind"/>
        <input type="submit" />
      </form>
      <p>Notes:</p>
      <ul>
        {notes.map(note =>
          <li key={note.id}>{note.body}</li>
        )}
      </ul>
    </div>
  )
}

export default HomePage
