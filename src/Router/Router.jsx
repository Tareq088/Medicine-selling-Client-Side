import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/Forbidden/ErrorPage/ErrrorPage";
import PrivateRoute from './../Route/PrivateRoute/PrivateRoute';
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import Home from './../Pages/Home/Home';
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import AdminPaymentManagement from './../Pages/Dashboard/AdminPaymentManagement/AdminPaymentManagement';
import ManageBanner from './../Pages/Dashboard/ManageBanner/ManageBanner';
import ManageCategory from './../Pages/Dashboard/ManageCategory/ManageCategory';
import ManageMedicine from './../Pages/Dashboard/ManageMedicine/ManageMedicine';
import ManageUsers from './../Pages/Dashboard/ManageUsers/ManageUsers';
import SellerPaymentHistory from './../Pages/Dashboard/SellerPaymentHistory/SellerPaymentHistory';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index:true,
        Component:Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path:"/dashboard",
    element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        index: true,
        element: <DashboardHome></DashboardHome>
      },
      {
        path:"adminPaymentManagement",
        element:<AdminPaymentManagement></AdminPaymentManagement>
      },
      {
        path:"manageBanner",
        element:<ManageBanner></ManageBanner>
      },
      {
        path:"manageCategory",
        element:<ManageCategory></ManageCategory>
      },
      {
        path:"manageMedicine",
        element:<ManageMedicine></ManageMedicine>
      },
      {
        path:"manageUsers",
        element:<ManageUsers></ManageUsers>
      },
      {
        path:"salesReport",
        element:<salesReport></salesReport>
      },
      {
        path:"sellerPaymentHistory",
        element:<SellerPaymentHistory></SellerPaymentHistory>
      },
      {
        path:"userPaymentHistory",
        element:<userPaymentHistory></userPaymentHistory>
      }
    ]
  },
  {
    path:"/*",
    Component:ErrorPage
  },
]);
