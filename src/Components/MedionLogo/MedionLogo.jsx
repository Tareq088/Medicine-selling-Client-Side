import React from "react";
import medionLogo from "../../assets/logo.jpg"
import { Link } from "react-router";

const MedionLogo = () => {
  return (
    <Link to="/">
      <div className="flex gap-5 items-center">
        <img
          className="hidden sm:block sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full"
          src={medionLogo}
        ></img>
        <p className='text-xl sm:text-3xl -ms-4 font-extrabold text-red-800'>Medion</p>
      </div>
    </Link>
  );
};

export default MedionLogo;
