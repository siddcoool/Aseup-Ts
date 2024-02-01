import axios from "axios"
import { useState, useEffect, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../component/loader/Loader"
import { AuthenticationStatus } from "../../constant/app"
import useIsAuthentication from "../../hooks/useIsAuthentication"

interface IAuthenticationProvider{
    children : ReactNode
  }


const AuthenticationProvider = ({children}:IAuthenticationProvider ) => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { authenticationStatus} = useIsAuthentication()

    const refreshToken = async() => {
         try {
            const token = localStorage.getItem('Token')
            if(!token){
                navigate('/login')
                return
            }
            setLoading(true)
            const {status, data} = await axios.get('/token')
            if(status === 200){
                localStorage.setItem('Token', data)
                axios.defaults.headers.common.access_token = localStorage.getItem('Token')
                
            }
            else{
                navigate('/login')
            }
         } catch (error) {
            console.error(error)
            navigate('/login')
         }
         finally{
            setLoading(false)
         }
    }
    console.log( authenticationStatus)
    useEffect(()=> {
        refreshToken()
    },[])

    if(authenticationStatus === AuthenticationStatus.loading){
        return <></>
    }
    

    if(loading){
        return <Loader/>
    }
    
  return children
}

export default AuthenticationProvider