import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const SideBar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-white shadow-lg border-r-2'>
      <div className='flex flex-col gap-4 pt-6 px-4 text-[15px]'>
        {/* Add Items */}
        <NavLink
  to="/add"
  className={({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-l-2xl border-l-4 border-transparent transition-all duration-300
     hover:bg-gray-200 hover:border-gray-800 hover:translate-x-1 ${isActive ? 'bg-gray-300 border-gray-800' : ''}`
  }
>
  <img
    className='w-5 h-5 transition-transform duration-300 hover:scale-110'
    src={assets.add_icon}
    alt=""
  />
  <p className='hidden md:block font-medium text-gray-800'>{'Add Items'}</p>
</NavLink>


        {/* List Items */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-2xl border-l-4 border-transparent transition-all duration-300
             hover:bg-gray-200 hover:border-gray-800 hover:translate-x-1 ${isActive ? 'bg-gray-300 border-gray-800' : ''}`
          }
        >
          <img className='w-5 h-5 transition-transform duration-300 group-hover:scale-110' src={assets.order_icon} alt="" />
          <p className='hidden md:block font-medium text-gray-700'>{'List Items'}</p>
        </NavLink>

        {/* Order Items */}
        <NavLink
          to="/order"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-l-2xl border-l-4 border-transparent transition-all duration-300
             hover:bg-gray-200 hover:border-gray-800 hover:translate-x-1 ${isActive ? 'bg-gray-300 border-gray-800' : ''}`
          }
        >
          <img className='w-5 h-5 transition-transform duration-300 group-hover:scale-110' src={assets.order_icon} alt="" />
          <p className='hidden md:block font-medium text-gray-700'>{'Order Items'}</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
