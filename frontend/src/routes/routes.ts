import React from 'react'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'

const routes = [
    {
        path: '/',
        component : Home
    },{
        path: '/login',
        component : Login
    },{
        path: '/signup',
        component : SignUp
    }
]

export const createRoutes = () =>{
    const newRoutes = routes.map((route)=>{
        const component = route.component
        return {
            path : route.path
        }
    })
return newRoutes
}