import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className="px-[5vw] lg:px-[2vw]">
      <div className="relative flex flex-col sm:flex-row items-center overflow-hidden rounded-3xl border border-gray-200 shadow-lg mt-3 bg-gradient-to-r from-white via-gray-50 to-gray-100">
        
        {/* Hero left side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-16 sm:py-0 z-10">
          <div className="flex flex-col gap-6 max-w-md text-center sm:text-left">
            
            {/* Subheading */}
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <p className="w-10 md:w-14 h-[2px] bg-gray-800"></p>
              <p className="font-medium tracking-widest text-xs md:text-sm text-gray-600 uppercase">
                Our Bestsellers
              </p>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">Arrivals</span>
            </h1>
            
            {/* Description */}
            <p className="text-gray-600 text-sm md:text-base max-w-sm mx-auto sm:mx-0">
              Discover premium oversized tees with bold graphics — SS’25 Collection just dropped.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <button className="px-7 py-3 bg-black text-white rounded-full text-sm md:text-base font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300">
                Shop Now
              </button>
              <button className="px-7 py-3 border-2 border-black text-black rounded-full text-sm md:text-base font-semibold hover:bg-black hover:text-white hover:scale-105 transition-all duration-300">
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* Hero right side */}
        <div className="w-full sm:w-1/2 relative">
       <img
  className="w-full h-auto max-h-[100vh] object-cover sm:rounded-r-3xl rounded-t-3xl hover:scale-105 transition-transform duration-500"
  src={assets.StartAdd}
  alt="Hero Banner"
/>

          {/* Glow effect behind image */}
          <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>
        </div>
      </div>
    </div>
  )
}

export default Hero
