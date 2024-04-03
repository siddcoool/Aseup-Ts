import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import VerticalLayout from "../Layout/SideBarLayout";
import BlankLayout from "../Layout/BlankLayout";
import AuthenticationProvider from "../common/provider/AuthenticationProvider";
import React from "react";
import ViewEmployee from "../pages/ViewEmployee";
import ViewEmployer from "../pages/ViewEmployer";
import EmployerForm from "../pages/EmployerForm";
import Page from "../pages/Employee/Page";
import SearchEmployee from "../pages/SearchEmployee";
import Thankyou from "../pages/Thankyou";
import Jobs from "../pages/Jobs";
import ViewJobs from "../pages/ViewJobs";
import Skills from "../pages/Skills";
import SkillForm from "../pages/Employee/SkillForm";

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
    component: Page,
    layout:VerticalLayout ,
  },
  {
    path: "/employeeForm/:employeeId",
    component: Page,
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
  },{
    path: '/employer/edit/:id',
    component: EmployerForm,
    layout: VerticalLayout
  },{
    path: '/employee/search',
    component: SearchEmployee,
    layout: VerticalLayout
  },{
    path: '/thankyou',
    component: Thankyou,
    layout: VerticalLayout
  },{
    path: '/jobs',
    component: ViewJobs,
    layout: VerticalLayout
  },{
    path: "/jobs/add",
    component: Jobs,
    layout: VerticalLayout
  },{
    path: "/jobs/edit/:id",
    component: Jobs,
    layout: VerticalLayout
  },{
    path: "/skills",
    component: Skills,
    layout: VerticalLayout
  },{
    path: "/skill/add",
    component: SkillForm,
    layout: VerticalLayout
  },{
    path: '/skill/update/:id',
    component: SkillForm,
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
