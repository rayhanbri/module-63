import React from 'react';
import { NavLink, Outlet } from 'react-router';
import ProFastLogo from '../pages/Home/Home/Shared/ProFastLogo/ProFastLogo';
import { FaHome, FaBoxOpen, FaHistory, FaSearchLocation, FaUserEdit, FaHourglassHalf, FaMotorcycle, FaUserShield } from 'react-icons/fa';

const DashBoardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Page content here */}
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none lg:hidden">
                        {/* ei drawer ta change kore dilambhai my-drawer-2  */}
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 font-semibold px-2 lg:hidden">Dash Board</div>


                </div>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <ProFastLogo></ProFastLogo>
                    <li><NavLink to='/'><FaHome className="inline mr-2" />Home</NavLink></li>
                    <li><NavLink to='myParcels'><FaBoxOpen className="inline mr-2" />My Parcel</NavLink></li>
                    <li><NavLink to='paymentHistory'><FaHistory className="inline mr-2" />Payment History</NavLink></li>
                    <li><NavLink to='trackParcel'><FaSearchLocation className="inline mr-2" />Track A Parcel</NavLink></li>
                    <li><NavLink to='updateProfile'><FaUserEdit className="inline mr-2" />Update Profile</NavLink></li>
                    {/* ✅ New Links */}
                    <li><NavLink to='activeRiders'><FaMotorcycle className="inline mr-2" />Active Riders</NavLink></li>
                    <li><NavLink to='pendingRiders'><FaHourglassHalf className="inline mr-2" />Pending Riders</NavLink></li>
                    {/* make admin  */}
                    <li><NavLink to='makeAdmin'><FaUserShield className="inline mr-2" />Make Admin</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default DashBoardLayout;