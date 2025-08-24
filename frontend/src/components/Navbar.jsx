import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  const logOut = async () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  return (
    <div className="flex items-center justify-between px-6 sm:px-12 py-5 font-medium 
      bg-white text-black shadow-md relative z-50 border-b border-gray-200">
      
      {/* Logo */}
      <Link to={"/"}>
         <div className="flex items-center gap-3">
        <img 
  className="w-10 sm:w-18 md:w-22 lg:w-25 xl:w-28 2xl:w-30" 
  src={assets.MainLogo} 
  alt="Your Brand Logo" 
/>


               {/* <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide 
                 bg-gradient-to-r from-[rgba(24,19,108,0.9)] via-slate-600 to-blue-900

                 bg-clip-text text-transparent drop-shadow-sm">
                Cartify
               </h1> */}
         </div>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-10 text-sm tracking-wide">
        {["/", "/collection", "/about", "/contact"].map((path, i) => (
          <NavLink key={i} to={path} className="relative group">
            <p className="transition duration-300 text-black group-hover:text-blue-700">
              {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
            </p>
            <span className="absolute left-0 bottom-[-6px] w-0 h-[2px] bg-blue-700 
              transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Search */}
        <img 
          onClick={() => setShowSearch(true)} 
          src={assets.search_icon} 
          className="w-5 cursor-pointer hover:scale-110 transition transform" 
          alt="search" 
        />

        {/* Profile */}
        <div className="group relative">
          <img 
            onClick={() => token ? null : navigate('/login')} 
            src={assets.profile_icon} 
            className="w-5 cursor-pointer hover:scale-110 transition" 
            alt="profile" 
          />
          {token &&
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 
                bg-white text-black rounded-lg 
                shadow-lg border border-gray-200">
                <p className="cursor-pointer hover:text-blue-700">My Profile</p>
                <p onClick={() => navigate('/order')} className="cursor-pointer hover:text-blue-700">Orders</p>
                <p onClick={logOut} className="cursor-pointer hover:text-blue-700">Logout</p>
              </div>
            </div>}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img 
            src={assets.cart_icon} 
            className="w-5 min-w-5 hover:scale-110 transition" 
            alt="cart" 
          />
          <p className="absolute right-[-6px] bottom-[-6px] w-5 h-5 flex items-center justify-center 
            bg-blue-600 text-white font-bold
            rounded-full text-[10px] shadow-md">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Button */}
        <img 
          onClick={() => setVisible(true)} 
          src={assets.menu_icon} 
          className="w-5 cursor-pointer sm:hidden hover:scale-110 transition" 
          alt="menu" 
        />
      </div>

      {/* Sidebar Menu (Mobile) */}
      <div className={`absolute top-0 right-0 bottom-0 bg-white text-black transition-all 
        ${visible ? 'w-2/3 sm:w-1/3 p-6' : 'w-0'} overflow-hidden shadow-lg`}>
        <div className="flex flex-col gap-4">
          <div onClick={() => setVisible(false)} className="flex items-center gap-3 cursor-pointer">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="back" />
            <p>Back</p>
          </div>

          {["/", "/collection", "/about", "/contact"].map((path, i) => (
            <NavLink 
              key={i}
              onClick={() => setVisible(false)} 
              className="py-2 border-b border-gray-200 hover:text-blue-700" 
              to={path}>
              {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar
