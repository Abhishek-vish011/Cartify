import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterbox from '../components/NewsLetterbox'

const About = () => {
  return (
    <div className="sm:px-[5vw] md:px-[7vw] lg:px-[10vw]">
      {/* ABOUT US Section */}
      <div className="text-2xl sm:text-3xl font-bold text-center pt-10 text-gray-800">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-14 flex flex-col md:flex-row items-center gap-12">
        <img
          className="w-full md:max-w-[450px] rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 leading-relaxed">
          <p>
            Our mission is to deliver <span className="font-semibold text-gray-800">style, quality, and value</span> right to your doorstep — with fast shipping, secure payments, and friendly customer support. 
          </p>
          <p>
            We believe shopping should be simple, enjoyable, and inspiring. That’s why we handpick every item to bring you the latest styles, everyday essentials, and exclusive collections you won’t find anywhere else.
          </p>
          <b className="text-lg text-[35px] text-gray-900">✨ Our Mission</b>
          <p>
            To make <span className="font-semibold text-gray-800">quality shopping accessible</span> to everyone. We aim to bring you the best products at fair prices, combining style, comfort, and durability. Every order is more than just a purchase — it’s our promise to deliver <span className="text-pink-500 font-medium">happiness, value, and trust</span> to your doorstep.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US Section */}
      <div className="text-xl sm:text-2xl font-bold text-center py-6 text-gray-800">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-20">
        {/* Card 1 */}
        <div className="border rounded-2xl px-8 py-10 flex flex-col gap-5 bg-white shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
          <b className="text-lg text-gray-900">🛡 Quality Assurance</b>
          <p className="text-gray-600">
            We believe you deserve the best, and that’s why every product goes through strict <span className="font-medium">quality checks</span> before reaching you. From sourcing premium materials to ensuring flawless finishing, we pay attention to every detail.
          </p>
        </div>

        {/* Card 2 */}
        <div className="border rounded-2xl px-8 py-10 flex flex-col gap-5 bg-white shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
          <b className="text-lg text-gray-900">⚡ Convenience</b>
          <p className="text-gray-600">
            We make shopping <span className="font-medium">effortless</span>. With a user-friendly website, secure payments, and fast doorstep delivery, your favorite products are just a few clicks away.
          </p>
        </div>

        {/* Card 3 */}
        <div className="border rounded-2xl px-8 py-10 flex flex-col gap-5 bg-white shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
          <b className="text-lg text-gray-900">💬 Exceptional Service</b>
          <p className="text-gray-600">
            Your satisfaction is our <span className="font-medium">priority</span>. Our support team is always ready to assist — building trust through care, clear communication, and commitment.
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <NewsLetterbox />
    </div>
  )
}

export default About
