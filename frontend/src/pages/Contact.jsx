import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterbox from '../components/NewsLetterbox'

const Contact = () => {
  return (
    <div className="px-[5vw] md:px-[8vw] lg:px-[12vw]">
      {/* Title */}
     <div className="flex flex-col items-center justify-center text-center mt-12 px-4 sm:px-0">
  <div className="text-3xl font-bold">
    <Title text1={'CONTACT'} text2={'US'} />
  </div>
  <p className="text-gray-500 text-sm sm:text-base mt-3 max-w-xl">
    We’d love to hear from you! Reach out with any questions, suggestions, or career opportunities.
  </p>
</div>

      {/* Contact Section */}
      <div className="my-14 flex flex-col md:flex-row gap-12 items-center">
        {/* Image */}
        <img
          className="w-full md:max-w-[500px] rounded-2xl shadow-lg"
          src={assets.contact_img}
          alt="Contact Us"
        />

        {/* Info */}
        <div className="flex flex-col justify-center items-start gap-6">
          {/* Store Info */}
          <div>
            <p className="font-semibold text-xl text-gray-800">📍 Our Store</p>
            <p className="text-gray-600 leading-relaxed mt-1">
              54709 Willam Station <br /> Suite 350, Washington, Belizume
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <p className="font-semibold text-xl text-gray-800">📞 Get in Touch</p>
            <p className="text-gray-600 mt-1">
              Tel: (415) 555-01932 <br /> Email: <span className="underline">cartify@gmail.com</span>
            </p>
          </div>

          {/* Careers Info */}
          <div>
            <p className="font-semibold text-xl text-gray-800">💼 Careers at Forever</p>
            <p className="text-gray-600 mt-1">
              Learn more about our team and explore exciting job openings.
            </p>
          </div>

          {/* Button */}
          <button className="border border-black px-8 py-3 text-sm font-medium rounded-lg hover:bg-black hover:text-white transition-all duration-500 shadow-md">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <NewsLetterbox />
    </div>
  )
}

export default Contact
