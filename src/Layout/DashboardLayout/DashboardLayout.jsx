import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import MedionLogo from "../../Components/MedionLogo/MedionLogo";
import {
  FaHome,
  FaUsers,
  FaTags,
  FaMoneyCheckAlt,
  FaHistory,
  FaBullhorn,
} from "react-icons/fa";
import {
  MdCategory,
  MdOutlinePayment,
  MdOutlineManageAccounts,
  MdReceiptLong,
  MdOutlineCategory,
} from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { HiOutlineClipboardList } from "react-icons/hi";
import useUserRole from "../../Hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  // console.log(role)
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      {/* Page content here */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
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
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
      </div>
      {/* larger device: drawyer-slide */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <MedionLogo></MedionLogo>
          <li>
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) =>
                isActive
                  ? "text-black bg-primary font-bold px-3 py-2 rounded"
                  : "px-3 py-2"
              }
            >
              <FaHome className="inline mr-2" />
                Dashboard Home Page
            </NavLink>
          </li>
          {/* admin role */}
          {!roleLoading && role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/manageUsers"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black bg-primary font-bold px-3 py-2 rounded"
                      : "px-3 py-2"
                  }
                >
                  <FaUsers className="inline mr-2" />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageCategory"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black bg-primary font-bold px-3 py-2 rounded"
                      : "px-3 py-2"
                  }
                >
                  <MdCategory className="inline mr-2" />
                  Manage Category
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/adminPaymentManagement"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black bg-primary font-bold px-3 py-2 rounded"
                      : "px-3 py-2"
                  }
                >
                  <MdOutlinePayment className="inline mr-2" />
                  Admin Payment Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/salesReport"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black bg-primary font-bold px-3 py-2 rounded"
                      : "px-3 py-2"
                  }
                >
                  <HiOutlineClipboardList className="inline mr-2" />
                  Sales Report
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageBanner"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black bg-primary font-bold px-3 py-2 rounded"
                      : "px-3 py-2"
                  }
                >
                  <MdOutlineManageAccounts className="inline mr-2" />
                  Manage Banner
                </NavLink>
              </li>
            </>
          )}
                                        {/* seller role */}
          {!roleLoading && role === "seller" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/manageMedicine"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black bg-primary font-bold px-3 py-2 rounded"
                      : "px-3 py-2"
                  }
                >
                  <GiMedicines className="inline mr-2" />
                  Manage Medicine
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/sellerPaymentHistory"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black bg-primary font-bold px-3 py-2 rounded"
                      : "px-3 py-2"
                  }
                >
                  <FaHistory className="inline mr-2" />
                  Seller Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/askForAdvertisement"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black bg-primary font-bold px-3 py-2 rounded"
                      : "px-3 py-2"
                  }
                >
                  <FaBullhorn className="inline mr-2" />
                  Ask for Advertisement
                </NavLink>
              </li>
            </>
          )}

          {/* user role */}

          {!roleLoading && role === "user" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/categoryDetailsMedicine/:category"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black bg-primary font-bold px-3 py-2 rounded"
                      : "px-3 py-2"
                  }
                >
                  <MdOutlineCategory className="inline mr-2" />
                  Category Details Medicine
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/userPaymentHistory"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black bg-primary font-bold px-3 py-2 rounded"
                      : "px-3 py-2"
                  }
                >
                  <FaMoneyCheckAlt className="inline mr-2" />
                  User Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myOrders"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black bg-primary font-bold px-3 py-2 rounded"
                      : "px-3 py-2"
                  }
                >
                  <MdReceiptLong className="inline mr-2" />
                  My Orders
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
