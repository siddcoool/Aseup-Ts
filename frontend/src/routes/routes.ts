import React from 'react';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import  {Dashboard} from '../pages/Dashboard';

// interface Route {
//     path: string;
//     component: React.ComponentType; // Specify the type of the component property
// }

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/signup',
        component: SignUp
    },
    {
        path: '/Dashboard',
        component:Dashboard
    },
];

export const createRoutes = () => {
    const newRoutes = routes.map((route) => {
        const Component = route.component;
        return {
            path: route.path,
            element: React.createElement(Component)
        };
    });
    return newRoutes;
};
