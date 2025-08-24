import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link 
      to={`/product/${id}`} 
      className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          className="w-full h-100 object-cover transform group-hover:scale-110 transition-transform duration-500"
          src={image[0]}
          alt={name}
        />

        {/* Overlay View Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="px-5 py-2 bg-white text-black text-sm font-medium rounded-full shadow-md hover:bg-gray-100">
            View Product
          </span>
        </div>
      </div>

      {/* Text Info */}
      <div className="p-4">
        <p className="text-gray-700 font-medium text-base truncate group-hover:text-black transition">
          {name}
        </p>
        <p className="text-lg font-semibold mt-1 text-gray-900">
          {currency}{price}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem
