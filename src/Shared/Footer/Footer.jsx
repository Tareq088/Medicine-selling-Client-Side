import React from 'react';
import { Link } from 'react-router';
import medionLogo from "../../assets/logo.jpg";
import { FaFacebook } from 'react-icons/fa';
import { IoLogoFigma } from 'react-icons/io5';
import { SiNetlify } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="bg-base-300 text-center text-xs sm:text-sm  p-8 space-y-3">
        <div className='space-y-2'>
            <Link>
                <img className='w-20 h-20 mx-auto rounded-full' src={medionLogo}></img>
            </Link>
            <strong className='text-primary' >Medion Company Ltd.</strong><br />
            <p className='text-gray-600'>1234 Road Name, City, Country<br />
            Email: contact@example.com | Phone: +880 111 111 1111</p>
        </div>
        <div className="mt-3">
            <Link href="/terms-and-conditions" className="text-gray-600 hover:underline mx-2">
            Terms and Conditions
            </Link>
            |
            <Link href="/privacy-policy" className="text-gray-600 hover:underline mx-2">
            Privacy Policy
            </Link>
        </div>
            <div className=' flex justify-center gap-2'>
                <a className='text-xl' href="https://www.facebook.com/"><FaFacebook color='blue'/></a>
                <a className='text-xl' href="https://github.com/Tareq088"><IoLogoFigma color='gray'/></a>
                <a className='text-xl' href="https://app.netlify.com/teams/tareqrahman342"><SiNetlify color='green'/></a>
            </div>
        <div className="mt-3">
            &copy; {new Date().getFullYear()} Find Mate Company Ltd. All rights reserved.
        </div>
        </footer>
    );
};

export default Footer;