import React, { use, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import medionLogo from "../../assets/logo.jpg";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import useUserRole from "../../Hooks/useUserRole";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const {role, roleLoading} = useUserRole();

  // console.log(user)
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false)
  const navList = (
    <div className="flex flex-row items-center justify-center">
      <li className="text-lg">
        <NavLink to="/" className={({ isActive }) =>isActive ? "underline text-green-600" : ""}>Home</NavLink>
      </li>
      {
        user && role === "user" && !roleLoading &&
        <>
          <li className="text-lg">
            <NavLink to="/shop" className={({ isActive }) =>isActive ? "underline text-green-600" : ""}>Shop</NavLink>
          </li>
          <li className="text-lg">
            <NavLink to="/cart" className={({ isActive }) =>isActive ? "underline text-green-600" : ""}><FaCartShopping/></NavLink>
          </li>
        </>
      }
      <li className="text-lg">
          <select className="select w-full max-w-xs">
            <option value="" >Select Language</option>
            <option value="english">English</option>
            <option value="bangla">Bangla</option>
            <option value="hindi">Hindi</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
      </li>
    </div>
  );
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({ icon: "success", title: "Logged Out" });
        setIsOpen(false)
        navigate("/login");
      })
      .catch((error) => {
        Swal.fire({ icon: "error", title: `${error.message}` });
      });
  };
  return (
    <div className="bg-base-200 sticky z-10 top-0">
      <div className="navbar justify-center items-center w-full sm:w-11/12 mx-auto pr-4 sm:px-0 py-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 px-2 shadow"
            >
              {navList}
            </ul>
          </div>
          <div className="flex gap-2 items-center">
            <img
              className="hidden sm:block sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full"
              src={medionLogo}
            ></img>
            <div className="text-xs md:text-base lg:text-xl text-red-800 font-extrabold">
              <Link to="/">Medion</Link>
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navList}</ul>
        </div>
        <div className="navbar-end h-10">
          <div className="flex items-center gap-1">
            {user ? (
                <div>
                    <a
                    onClick={()=>setIsOpen(!isOpen)}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={`user: ${user?.email}(${user?.displayName})`}
                    className="w-8 p-0.5 rounded-full cursor-pointer"
                    >
                    <img className="rounded-full w-12" src={user?.photoURL}></img>
                    </a>
                    <Tooltip id="my-tooltip" />
                </div>
                ) 
                : 
                <Link
                to="/login"
                className="btn btn-outline mr-1 text-xs md:text-base p-1 sm:p-2 text-blue-600 hover:text-red-600 cursor-pointer"
                >
                    Join Us
                </Link>
            }
            {isOpen && user && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-15 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                        <Link to='/updateProfile'className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
                            Update Profile
                        </Link>
                        <Link to='/dashboard'className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
                            Dashboard
                        </Link>
                        <Link
                          onClick={handleLogOut}
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </Link>
                  </div>
                </div>
              )}
     
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
