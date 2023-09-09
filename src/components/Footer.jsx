import React from 'react'
import timelessLogo from '../assets/timeless.png'

const Footer = () => {
  return (
    <div className='w-full flex flex-col justify-between items-center gradient-bg-footer p-4'>
        <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
            <div className="flex flex-[0.25] justify-center items-center">
                <img src={timelessLogo} alt="Logo" className="w-32" />
            </div>
            <div 
                className="flex flex-1 justify-evenly items-center flex-wrap
                sm:mt-0 mt-5 w-full text-white text-base text-center"
            >
                <p className='cursor-pointer mx-2'>Market</p>
                <p className='cursor-pointer mx-2'>Artists</p>
                <p className='cursor-pointer mx-2'>Features</p>
                <p className='cursor-pointer mx-2'>Community</p>
            </div>
            
        </div>
        <div className="flex flex-[0.25] justify-center items-center">
                <p className="text-gray-500 text-sm">@2022 All right reserved.</p>
        </div>
    </div>
  )
}

export default Footer