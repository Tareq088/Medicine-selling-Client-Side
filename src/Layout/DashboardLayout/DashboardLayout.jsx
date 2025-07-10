import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import MedionLogo from '../../Components/MedionLogo/MedionLogo';
import { FaHome, FaUsers, FaTags, FaMoneyCheckAlt, FaHistory, FaBullhorn } from "react-icons/fa";
import { MdCategory, MdOutlinePayment, MdOutlineManageAccounts } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { HiOutlineClipboardList } from "react-icons/hi";
import useUserRole from '../../Hooks/useUserRole';

const DashboardLayout = () => {
    const {role, roleLoading} = useUserRole();
    // console.log(role)
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                            {/* Page content here */}
                    <div className="drawer-content flex flex-col">
                        {/* Navbar */}
                        <div className="navbar bg-base-300 w-full lg:hidden">
                            <div className="flex-none lg:hidden ">
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
                        </div>
                        {/* Page content here */}
                       
                        <Outlet></Outlet>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>                   
                    </div>
                        {/* larger device: drawyer-slide */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                    <MedionLogo></MedionLogo>
                    <li>
                        <NavLink to="/">
                        <FaHome className="inline mr-2" />
                        Home
                        </NavLink>
                    </li>
                                            {/* admin role */}
                    {
                        !roleLoading && role === "admin" && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/manageUsers">
                                    <FaUsers className="inline mr-2" />
                                    Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageCategory">
                                    <MdCategory className="inline mr-2" />
                                    Manage Category
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/adminPaymentManagement">
                                    <MdOutlinePayment className="inline mr-2" />
                                    Admin Payment Management
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/salesReport">
                                    <HiOutlineClipboardList className="inline mr-2" />
                                    Sales Report
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageBanner">
                                    <MdOutlineManageAccounts className="inline mr-2" />
                                    Manage Banner
                                    </NavLink>
                                </li>
                            </>
                        )
                    }                  
                                                        {/* seller role */}
                    {
                        !roleLoading && role === "seller" && 
                        (
                            <>
                                <li>
                                    <NavLink to="/dashboard/manageMedicine">
                                    <GiMedicines className="inline mr-2" />
                                    Manage Medicine
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/sellerPaymentHistory">
                                    <FaHistory className="inline mr-2" />
                                    Seller Payment History
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/askForAdvertisement">
                                    <FaBullhorn className="inline mr-2" />
                                    Ask for Advertisement
                                    </NavLink>
                                </li>
                            </>
                        )
                    }

                                        {/* user role */}
                    <li>
                        <NavLink to="/dashboard/userPaymentHistory">
                        <FaMoneyCheckAlt className="inline mr-2" />
                        User Payment History
                        </NavLink>
                    </li>
                </ul>
                
            </div>
        </div>
    );
};

export default DashboardLayout;