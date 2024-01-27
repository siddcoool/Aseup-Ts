import React from 'react';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import {Home} from '../pages/Home';
import  {Dashboard} from '../pages/Dashboard';
import EmployeeForm from '../pages/EmployeeForm';
import VerticalLayout from '../Layout/SideBarLayout';
import BlankLayout from '../Layout/BlankLayout';

// interface Route {
//     path: string;
//     component: React.ComponentType; // Specify the type of the component property
// }

const routes = [
    {
        path: '/home',
        component: Home,
        layout: VerticalLayout
    },
    {
        path: '/login',
        component: Login,
        layout: BlankLayout
    },
    {
        path: '/register',
        component: SignUp,
        layout: BlankLayout

    },
    {
        path: '/Dashboard',
        component :Dashboard,
        layout: VerticalLayout

    },{
        path: '/employeeForm',
        component: EmployeeForm,
        layout: VerticalLayout


        
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
