import React, { useContext, useState, useEffect } from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import axios from 'axios'

export const Stories = () => {
  
  const navigate = useNavigate()
  const [file, setFile] = useState()
  const [stories, setStories] = useState()
  const [img, setImg] = useState(null)
  const [imgname, setImgname] = useState("")
  
  useEffect(()=>{
    getStories()
  },[])

  let {authTokens,authenticated} = useContext(AuthContext)
  if(!authenticated) return <Navigate to="/"/>

  let getStories = async () => {
    let response = await fetch('http://127.0.0.1:8000/story/', {
      method:'GET',
      headers:{
        'Content-Type':'multipart/form-data',
        'Authorization':'Bearer ' + String(authTokens.access) 
      }
    })
    let data = await response.json()
    console.log(data[0]);
    if (response.status===200) setStories(data)
  }

  //working
  const handleFormSubmit = (event) => {
    event.preventDefault();

    let data = new FormData(); // creates a new FormData object
    data.append("storyimage", img.image); // add your file to form data
    data.append("imagename", imgname)
    console.log(imgname);
    axios.post("http://127.0.0.1:8000/story/",data,{
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


    async function handleInputChange(event) {
        event.preventDefault();
        setImg({
          image:event.target.files[0]
        })
        //console.log(event.target.files[0].name);
        setImgname(
          event.target.files[0].name
        )
        setFile(URL.createObjectURL(event.target.files[0]))
        // this.setState({
        //   // [event.target.name]: event.target.files[0]
        //   image: event.target.files[0]
        //   // image: event.target.files[0]
        // });
      };

  return (
    <div id="other" className="">
        <p style={{marginTop:"100px"}}>Stories</p>
      <ul>
        {stories? stories.map(story =>
          <li key={story.id}>{story.storyimage}</li>
          /* <img src={"."+require(story.storyimage)}/></li> */
        ) : <></>}
      </ul>
        <p className="mod" style={{ marginTop: "10px" }}>
          Uplaod
        </p>
        
        <form onSubmit={handleFormSubmit}>
          <input type="file" name="image" onChange={handleInputChange} />
          {/* <img src={img.image[0]}/> */}
          <button>Submit</button>
        </form>
        <img src={file}/>
      </div>
  )
}

export default Stories