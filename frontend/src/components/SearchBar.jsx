import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  // 🔹 Search handler
  const handleSearch = () => {
    if (search.trim() !== "") {
      // Redirect to collection page with query
      navigate(`/collection?search=${encodeURIComponent(search)}`);
    }
  };

  // 🔹 Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return showSearch && visible ? (
    <div className="border-t border-b bg-white text-center py-6 relative">
      <div className="inline-flex items-center justify-between 
        px-5 py-2 w-3/4 sm:w-1/2 rounded-full 
        bg-white/10 backdrop-blur-md shadow-xl 
        border border-white/20 
        transition-all duration-300 ease-in-out
        hover:scale-105">
        
        {/* Input */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}   // ✅ trigger search on Enter
          className="flex-1 text-white placeholder-gray-300 outline-none bg-transparent text-sm px-2"
          type="text"
          placeholder="Search products, categories..."
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}   // ✅ trigger search on click
          className="ml-3 p-2 rounded-full bg-black shadow-md hover:shadow-lg hover:scale-110 transition"
        >
          <img className="w-4 invert" src={assets.search_icon} alt="search" />
        </button>
      </div>

      {/* Close Button */}
      <img
        onClick={() => setShowSearch(false)}
        className="absolute  right-6 top-6 w-4 cursor-pointer opacity-70 hover:opacity-100 transition"
        src={assets.cross_icon}
        alt="close"
      />
    </div>
  ) : null;
};

export default SearchBar;
