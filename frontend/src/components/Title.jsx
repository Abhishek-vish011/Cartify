import React from 'react'

const Title = ({ text1, text2, center }) => {
  return (
    <div className={`flex ${center ? 'justify-center' : 'justify-start'} items-center gap-3 mb-6`}>
      {/* Left Line */}
      <span className="hidden sm:block w-10 sm:w-14 h-[2px] bg-gradient-to-r from-gray-400 to-gray-700 rounded-full"></span>
      
      {/* Text */}
      <h2 className="text-xl sm:text-2xl font-semibold tracking-wide text-gray-800 relative group">
        {text1}{' '}
        <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent font-extrabold">
          {text2}
        </span>
        {/* Underline Animation */}
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black rounded-full group-hover:w-full transition-all duration-500"></span>
      </h2>

      {/* Right Line */}
      <span className="hidden sm:block w-10 sm:w-14 h-[2px] bg-gradient-to-r from-gray-700 to-gray-400 rounded-full"></span>
    </div>
  )
}

export default Title
