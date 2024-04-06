import axios from "axios"
import { useEffect, useState } from "react";

type IUser = {
    name: string
    _id: string
}

export const useUser = (): IUser => {

    const [user, setUser] = useState()

    const getUser = async () => {
        const { data } = await axios.get('/user/me');
        setUser(data)
    }

    useEffect(() => {
        getUser()
    }, [])

    return user


}