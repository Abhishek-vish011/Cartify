import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center py-20 px-6">
      {/* Policy Item */}
      <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mx-auto mb-5">
          <img src={assets.exchange_icon} className="w-8" alt="Exchange Policy" />
        </div>
        <p className="font-semibold text-gray-900 text-lg">Easy Exchange Policy</p>
        <p className="text-gray-500 mt-2 text-sm">We offer a hassle-free exchange policy.</p>
      </div>

      {/* Policy Item */}
      <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mx-auto mb-5">
          <img src={assets.quality_icon} className="w-8" alt="Return Policy" />
        </div>
        <p className="font-semibold text-gray-900 text-lg">7 Day Return Policy</p>
        <p className="text-gray-500 mt-2 text-sm">We provide 7 days free return policy.</p>
      </div>

      {/* Policy Item */}
      <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mx-auto mb-5">
          <img src={assets.support_img} className="w-8" alt="Customer Support" />
        </div>
        <p className="font-semibold text-gray-900 text-lg">Best Customer Support</p>
        <p className="text-gray-500 mt-2 text-sm">We provide 24/7 customer support.</p>
      </div>
    </div>
  )
}

export default OurPolicy
