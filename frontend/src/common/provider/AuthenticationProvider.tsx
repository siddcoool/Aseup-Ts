import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Loader from "../component/loader/Loader"
import { AuthenticationStatus } from "../../constant/app"
import useIsAuthentication from "../../hooks/useIsAuthentication"




const AuthenticationProvider = ({children}) => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { authenticationStatus} = useIsAuthentication()

    const refreshToken = async() => {
         try {
            setLoading(true)
            const {status, data} = await axios.get('/token')
            if(status === 200){
                localStorage.setItem('Token', data.token)
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

    useEffect(()=> {
        refreshToken()
    },[])

    if(authenticationStatus === AuthenticationStatus.loading){
        return <></>
    }

    if(loading){
        return <Loader/>
    }
    
  return (
    <div>

    </div>
  )
}

export default AuthenticationProvider