import React from 'react'
import {TbBrandMeta} from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";



function Topbar() {
  return (
    <div className="bg-rabbit-red text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="hover:text-gray-300">
                <TbBrandMeta className="h-5 w-5" /> 
            </a>
             <a href="#" className="hover:text-gray-300">
                <IoLogoInstagram className="h-5 w-5" /> 
            </a>
             <a href="#" className="hover:text-gray-300">
                <FaXTwitter className="h-5 w-5" /> 
            </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>We ship worldwide - Fast and reliable shipping!</span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+123456789" className="hover:text-gray-300">(+1) 23456789</a>
        </div>
      </div>
    </div>
  )
}

export default Topbar
