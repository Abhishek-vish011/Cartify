import React from 'react';
import { assets } from '../assets/assets.js';

const Navbar = ({ setToken }) => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 md:px-12
                    bg-white  ">
      
      <div className="flex items-center gap-3">
               <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide 
                 bg-gradient-to-r from-[rgba(24,19,108,0.9)] via-slate-600 to-blue-900

                 bg-clip-text text-transparent drop-shadow-sm">
                Cartify
               </h1>
         </div>

      {/* Logout Button */}
      <button
        onClick={() => setToken('')}
        className="bg-black text-white font-semibold px-5 py-2 sm:px-7 sm:py-2 
                   rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
      >
        Log Out
      </button>
    </nav>
  );
};

export default Navbar;
