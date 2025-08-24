import React, { useEffect, useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProduct, setLatestProduct] = useState([]);

  useEffect(() => {
    setLatestProduct(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-16 sm:px-[5vw] md:px-[7vw] lg:px-[2vw]">
      
      {/* Title Section */}
      <div className="text-center py-10">
        <Title text1="LATEST" text2="COLLECTIONS" center />
        <p className="w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
          Discover our latest collections with fresh styles and modern trends — designed to upgrade your look instantly.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
        {latestProduct.map((item, index) => (
          <div
            key={index}
            className="group perspective"
          >
            <div className="relative bg-white rounded-2xl shadow-md transition-transform duration-500 transform group-hover:rotate-3d group-hover:scale-105 group-hover:shadow-2xl overflow-hidden">
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
              {/* Shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
