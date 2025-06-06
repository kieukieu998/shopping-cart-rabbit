import React from 'react'
import { FaXTwitter } from "react-icons/fa6"
import { IoLogoInstagram } from "react-icons/io"
import { TbBrandMeta } from "react-icons/tb"
import { FaPhoneAlt } from "react-icons/fa";

import { Link } from "react-router-dom"

function Footer() {
  return (
   <footer className="border-t py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
                <p className="text-gray-500 mb-4">
                    Be the first to hear about new products, exclusive events, and online offers.
                </p>
                <p className="font-medium text-sm text-gray-600">Sign up and get 10% of your first order</p>
                {/* Newsletter form  */}
                <form className="flex mt-4">
                    <input type="email"  placeholder="Enter your email" className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none transition-all" required/>
                    <button type="submit" className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all">Subscribe</button>
                </form>
            </div>
            {/* Shop link  */}
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
                <ul className="space-y-2 text-gray-600">
                    <li><Link to="#" className="hover:text-gray-500 transition-colors">Men's top wear</Link></li>
                    <li><Link to="#" className="hover:text-gray-500 transition-colors">Women's top wear</Link></li>
                    <li><Link to="#" className="hover:text-gray-500 transition-colors">Men's bottom wear</Link></li>
                    <li><Link to="#" className="hover:text-gray-500 transition-colors">Women's bottom wear</Link></li>
                </ul>
            </div>
             {/* Support link  */}
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Support</h3>
                <ul className="space-y-2 text-gray-600">
                    <li><Link to="#" className="hover:text-gray-500 transition-colors">Contact us</Link></li>
                    <li><Link to="#" className="hover:text-gray-500 transition-colors">About us</Link></li>
                    <li><Link to="#" className="hover:text-gray-500 transition-colors">FAQs</Link></li>
                    <li><Link to="#" className="hover:text-gray-500 transition-colors">Features</Link></li>
                </ul>
            </div>
              {/* Follow social  */}
            <div>
                <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
              <div className="flex items-center space-x-4 mb-6">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300"><TbBrandMeta className="h-5 w-5" /></a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300"><IoLogoInstagram className="h-5 w-5" /></a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300"><FaXTwitter className="h-5 w-5" /></a>
              </div>
              <p className="text-gray-500">Call Us</p>
              <p>
                <FaPhoneAlt className="inline-block h-5 w-5 mr-2" /> 0123-456-789
              </p>
            </div>
        </div>
        {/* footer bottom  */}
        <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
            <p className="text-gray-500 text-sm tracking-tighter text-center">&copy; 2025, CompileTab. All rights Reserved</p>
        </div>
   </footer>
  )
}

export default Footer
