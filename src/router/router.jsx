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
import MyParcel from "../pages/DashBoard/MyParcel/MyParcel";
import Payment from "../pages/DashBoard/Payment/Payment";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/DashBoard/TrackParcel/TrackParcel";
import BeARider from "../pages/BeARider/BeARider";
import PendingRiders from "../pages/DashBoard/PendingRider/PendingRiders";
import ActiveRiders from "../pages/DashBoard/AcitveRiders/ActiveRiders";
import MakeAdmin from "../pages/DashBoard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/Forbidden";
import AdminRoute from "./AdminRoute";
import AssignRider from "../pages/DashBoard/AssignRider/AssignRider";


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
            },
            {
                path: 'rider',
                element: <PrivateRoute><BeARider></BeARider></PrivateRoute>,
                loader: () => fetch('../../public/warehouses.json')
            },
            {
                path:'forbidden',
                Component:Forbidden
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashBoard',
        element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
        children: [
            {
                path: 'myParcels',
                Component: MyParcel
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory
            },
            {
                path: 'trackParcel',
                Component: TrackParcel
            },
            {
                path: 'pendingRiders',
               element:<AdminRoute><PendingRiders></PendingRiders></AdminRoute>
            },
            {
                path:'activeRiders',
              element:<AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
            },
            {
                path:'makeAdmin',
                element:<AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>,
            },
            {
                path:'assignRider',
                element:<AdminRoute><AssignRider></AssignRider></AdminRoute>
            }
        ]
    }
]);