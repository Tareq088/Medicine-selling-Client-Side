import React from 'react';

const Button = ({label, size, type,onClick}) => {
    return (
        <div>
            <button 
                size={size}
                type={type}
                onClick={onClick}
                href="#_" className="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold leading-6 text-white bg-green-600 border border-transparent rounded-full hover:bg-green-500 focus:outline-none focus:ring-green-600 cursor-pointer">
                {label}
            </button>
        </div>
    );
};

export default Button;