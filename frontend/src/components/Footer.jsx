import React from 'react'
import { assets } from '../assets/assets'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white text-black border-t-2 pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Logo & About */}
        <div>
      {/* Logo + Brand Name */}
          <div className="flex items-center gap-3 mb-5">
             <img 
  className="w-10 sm:w-18 md:w-22 lg:w-25 xl:w-28 2xl:w-30 fill-white" 
  src={assets.MainLogo} 
  alt="Your Brand Logo" 
/>

              
                </div>


          <p className="leading-relaxed text-sm md:text-base">
            Shop smarter with <span className="font-semibold text-black">CARTIFY</span> – your go-to destination 
            for trendy fashion, daily essentials, and top deals. 
            Enjoy quality products, fast delivery, and a smooth shopping experience 
            all in one place.
          </p>
          {/* Social Links */}
          <div className="flex gap-4 mt-5">
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-blue-500 transition">
              <Facebook size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-pink-500 transition">
              <Instagram size={18} />
            </a>
            <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-sky-400 transition">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">Company</h3>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Delivery</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-5">Get in Touch</h3>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-white">+1-212-456-7890</li>
            <li className="hover:text-white">contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center">
        <p className="text-gray-400 text-sm">
          © 2024 Forever.com – All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
