import React from 'react'

const NewsLetterbox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center my-16 px-4">
      {/* Title */}
      <p className="text-3xl sm:text-4xl font-bold text-gray-900">
        Subscribe now & <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">get 20% off</span>
      </p>

      {/* Subtitle */}
      <p className="text-gray-500 mt-3 text-sm sm:text-base">
        Don’t miss out — exclusive deals delivered straight to your inbox!
      </p>

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-2/3 md:w-1/2 flex items-center gap-3 mx-auto my-8 p-2 rounded-full border border-gray-300 shadow-sm bg-white hover:shadow-md transition"
      >
        <input
          className="w-full flex-1 px-4 py-3 outline-none rounded-full text-sm sm:text-base"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs sm:text-sm px-6 sm:px-10 py-3 rounded-full font-medium hover:bg-gradient-to-r hover:from-black hover:to-gray-700 hover:scale-105 transition-all duration-300"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsLetterbox
