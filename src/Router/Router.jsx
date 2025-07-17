import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout/RootLayout";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";

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
import AskForAdvertisement from "../Pages/Dashboard/AskForAdvertisement/AskForAdvertisement";
import SalesReport from "../Pages/Dashboard/SalesReport/SalesReport"; // ✅ you had typo
import UserPaymentHistory from "../Pages/Dashboard/UserPaymentHistory/UserPaymentHistory"; // ✅ correct casing

import AdminRoute from "../Route/AdminRoute/AdminRoute";
import SellerRoute from "../Route/SellerRoute/SellerRoute";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Forbidden from './../Pages/Forbidden/Forbidden';
import UserRoute from "../Route/UserRoute/UserRoute";
import Shop from "../Pages/Shop/Shop";
import Cart from "../Pages/Cart/Cart";
import CheckOut from "../Pages/CheckOut/CheckOut";
import Orders from "../Pages/Orders/myOrders";
import MyOrders from "../Pages/Orders/myOrders";
import Invoice from "../Pages/Invoice/Invoice";
import CategoryDetailsMedicine from "../Pages/Dashboard/CategoryDetailsMedicine/CategoryDetailsMedicine";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path:"forbidden",
        element:<Forbidden />
      },
      {
        path:"shop",
        element:<UserRoute><Shop/></UserRoute>
      },
      {
        path:"cart",
        element:<UserRoute> <Cart/> </UserRoute>
      },
      {
        path:"/checkOut/:orderId",
        element: <UserRoute><CheckOut/></UserRoute>
      },
      {
        path:"/invoice/:OrderID",
        element:<UserRoute> <Invoice></Invoice> </UserRoute>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <DashboardHome />
      },
                            // admin role
      {
        path: "manageUsers",
        element: <AdminRoute> <ManageUsers /> </AdminRoute> 
      },
      {
        path: "manageCategory",
        element: <AdminRoute> <ManageCategory /> </AdminRoute>
      },
      {
        path: "adminPaymentManagement",
        element: <AdminRoute> <AdminPaymentManagement /> </AdminRoute>
      },
      {
        path: "salesReport",
        element: <AdminRoute> <SalesReport /> </AdminRoute>
      },
      {
        path: "manageBanner",
        element: <AdminRoute> <ManageBanner /> </AdminRoute>
      },
                              // seller role
      {
        path: "manageMedicine",
        element:<SellerRoute> <ManageMedicine /> </SellerRoute> 
      },
      {
        path: "sellerPaymentHistory",
        element:<SellerRoute> <SellerPaymentHistory /> </SellerRoute> 
      },
      {
        path: "askForAdvertisement",
        element:<SellerRoute> <AskForAdvertisement /> </SellerRoute> 
      },
                                // user role
      {
        path: "userPaymentHistory",
        element: <UserRoute> <UserPaymentHistory /> </UserRoute>
      },
      {
        path:"myOrders",
        element:<UserRoute><MyOrders/></UserRoute>
      },
      {
        path:"categoryDetailsMedicine/:category",
        element:<UserRoute><CategoryDetailsMedicine></CategoryDetailsMedicine></UserRoute>
      }
    ]
  },
  {
    path: "/*",
    element: <ErrorPage />
  },
]);
