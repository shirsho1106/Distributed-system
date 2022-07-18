import { createContext, useEffect, useState } from "react";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

    //localStorage.getItem('authTokens')
    let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access) : null)
    let [authenticated, setAuthenticated] = useState(()=>localStorage.getItem('authTokens') ? true : false);
    let [loading,setLoading] = useState(true);

    const navigate = useNavigate()

    let loginUser = async(event)=> {
        event.preventDefault();
        console.log("in loginUser");
        let response = await fetch('http://127.0.0.1:8000/login/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':event.target.email.value,'password':event.target.password.value})
        })
        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            setAuthenticated(true);
            localStorage.setItem('authTokens',JSON.stringify(data))
            navigate("/", { replace: true });
        }
        else{
            alert('sth went wrong!')
        }
    }

    let logout = () => {
        setAuthTokens(null)
        setUser(null)
        setAuthenticated(false);
        localStorage.removeItem('authTokens')
        navigate("/login", { replace: true });
    }

    let updateToken = async(event)=> {
        console.log("in updatetoken");
        let response = await fetch('http://127.0.0.1:8000/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens.refresh})
        })
        let data = await response.json()

        if(response.status===200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens',JSON.stringify(data))
        }
        else{
            logout();
        }
        if(loading) setLoading(false)
    }

    let contextData = {
        authenticated:authenticated,
        authTokens:authTokens,
        user:user,
        loginUser:loginUser,
        logout:logout
    }

    useEffect(()=>{
        //if(loading) updateToken();
        let interval = setInterval(() => {
            if(authTokens){
                updateToken();
            }
        },240000)
        return ()=>clearInterval(interval)
    }, [authTokens,loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}