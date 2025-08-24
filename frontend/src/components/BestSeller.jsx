import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  console.log(products);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestSeller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-16 sm:px-[5vw] md:px-[7vw] lg:px-[2vw]">
      
      {/* Title Section */}
      <div className="text-center py-10">
        <Title text1="BEST" text2="SELLERS" center />
        <p className="w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
          Shop our best sellers loved by thousands — tried, tested, and trending for all the right reasons.  
          Don’t miss out on the most popular picks — limited stock, high demand, and top-rated by customers.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-10">
        {bestSeller.map((item, index) => (
          <div
            key={index}
            className="group perspective"
          >
            <div className="relative bg-white rounded-2xl shadow-md transform transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1 group-hover:shadow-2xl overflow-hidden">
              
              {/* Product Component */}
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-200/20 via-transparent to-pink-200/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BestSeller
