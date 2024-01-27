import React from 'react';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import {Home} from '../pages/Home';
import  {Dashboard} from '../pages/Dashboard';
import EmployeeForm from '../pages/EmployeeForm';

// interface Route {
//     path: string;
//     component: React.ComponentType; // Specify the type of the component property
// }

const routes = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: SignUp
    },
    {
        path: '/Dashboard',
        component :Dashboard
    },{
        path: '/employeeForm',
        component: EmployeeForm
    }
];

export const createRoutes = () => {
    const newRoutes = routes.map((route) => {
        const Layout=route.layout
        const Component = route.component;
        return {
            path: route.path,
            element: React.createElement(Component)
        };
    });
    return newRoutes;
};
