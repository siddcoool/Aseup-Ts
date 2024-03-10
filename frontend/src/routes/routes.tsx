import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import EmployeeForm from "../pages/EmployeeForm";
import VerticalLayout from "../Layout/SideBarLayout";
import BlankLayout from "../Layout/BlankLayout";
import AuthenticationProvider from "../common/provider/AuthenticationProvider";
import React from "react";
import ViewEmployee from "../pages/ViewEmployee";
import EmployerForm from "../pages/Employer";
import ViewEmployer from "../pages/ViewEmployer";

interface Route {
  path: string;
  component: any; // Use ComponentType with any as a workaround for generic components
  layout: any; // Use ComponentType with any as a workaround for generic components
}

const routes: Route[] = [
  {
    path: '/',
    component: Login,
    layout: BlankLayout,
  },
  {
    path: "/home",
    component: Home,
    layout: VerticalLayout,
  },
  {
    path: "/login",
    component: Login,
    layout: BlankLayout,
  },
  {
    path: "/register",
    component: SignUp,
    layout: BlankLayout,
  },
  {
    path: "/Dashboard",
    component: Dashboard,
    layout: VerticalLayout,
  },
  {
    path: "/employeeForm/",
    component: EmployeeForm,
    layout:VerticalLayout ,
  },
  {
    path: "/employeeForm/:employeeId",
    component: EmployeeForm,
    layout: VerticalLayout,
  },{
    path: "/viewEmployee",
    component: ViewEmployee,
    layout:VerticalLayout ,
  },{
    path: '/employer/add',
    component: EmployerForm,
    layout: VerticalLayout
  },{
    path: '/employer/view',
    component: ViewEmployer,
    layout: VerticalLayout
  }
];

export const createRoutes = () => {
  const newRoutes = routes.map((route) => {
    const Layout = route.layout;
    const Component = route.component;
    return {
      path: route.path,
      element: React.createElement(() => {
        return (
          <AuthenticationProvider>
            <Layout>
              <Component />
            </Layout>
          </AuthenticationProvider>
        );
      }),
    };
  });
  return newRoutes;
};
