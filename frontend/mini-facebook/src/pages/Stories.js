import React, { useContext, useState } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios'

const Stories = () => {
  
  const navigate = useNavigate()
  const [img, setImg] = useState(null)
  let {authTokens,authenticated} = useContext(AuthContext)
  if(!authenticated) return <Navigate to="/"/>

  //working
  const handleFormSubmit = (event) => {
    event.preventDefault();

    let data = new FormData(); // creates a new FormData object
    data.append("storyimage", img.image[0]); // add your file to form data

    axios.post("http://127.0.0.1:8000/stories/",data,{
      'headers': {'Content-Type':'multipart/form-data',
                  'Authorization':'Bearer ' + String(authTokens.access) 
                  }
    })
      .then(() => alert('image added'))
      .catch(() => alert('sth went wrong!'));
  };
  //working

  // async function handleFormSubmit(event) {
  //   event.preventDefault();
  //   let data = new FormData(); // creates a new FormData object
  //   data.append("storyimage", img.image[0]); // add your file to form data
  //   console.log(data)
  //   let response = await fetch('http://127.0.0.1:8000/media/', {
  //       method:'POST',
  //       headers:{
  //         'Content-Type':'multipart/form-data'
  //       },
  //       data
  //   })
  //   if(response.status === 201){
  //       alert('user created')
  //       navigate("/", { replace: true });
  //   }
  //   else{
  //       alert('sth went wrong!')
  //   }
  // }

    const initform = Object.freeze({
      img: null,
    });


    async function handleInputChange(event) {
        event.preventDefault();
        setImg({
          image:event.target.files
        })
        // this.setState({
        //   // [event.target.name]: event.target.files[0]
        //   image: event.target.files[0]
        //   // image: event.target.files[0]
        // });
      };

  return (
    <div id="other" className="">
        <p className="mod" style={{ marginTop: "10px" }}>
          Uplaod
        </p>
        
        <form onSubmit={handleFormSubmit}>
          <input type="file" name="image" onChange={handleInputChange} />
          {/* <img src={img.image[0]}/> */}
          <button>Submit</button>
        </form>
      </div>
  )
}

export default Stories