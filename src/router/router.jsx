import {
    createBrowserRouter,
} from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import { Component } from "react";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Login/Register";
import Coverage from "../pages/Coverage/Coverage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashBoardLayout from "../layout/DashBoardLayout";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('../../public/warehouses.json')
            },
            {
                path: 'sendParcel',
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
                loader: () => fetch('../../public/warehouses.json')
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path:'dashBoard',
        element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children :[
            {}
        ]
    }
]);