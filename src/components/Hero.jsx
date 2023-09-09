import React from 'react'
import nft from '../assets/nft.jpeg'
import { setGlobalState, useGlobalState } from '../store'

const Hero = () => {

  const [connectedAccount] = useGlobalState('connectedAccount')
  const onCreatedNFT = () => {
    setGlobalState('modal', 'scale-100')
  }


  return (
    <div 
        className='flex flex-col md:flex-row w-4/5 justify-between
        items-center py-10 mx-auto'
    >
        <div className="md:w-3/6 w-full">
            <div className="">
                <h1 className=" text-white text-5xl font-bold ">
                    Buy and Sell <br/>Digital Arts,<br/>
                    <span className="text-gradient">NFT's</span> Collections
                </h1>
                <p className="text-gray-500 font-semibold text-sm mt-3">
                    Mint and collect coolest NFT's around
                </p>
            </div>
            
            <div className="flex mt-5 ">
                <button 
                    onClick={onCreatedNFT}
                    className="shadow-xl shadow-black text-white bg-[#e32970] 
                    hover:bg-[#bd255f] p-2 rounded-full"
                >
                    Create NFT
                </button>
            </div>
            <div className="w-3/4 flex justify-between items-center mt-5">
                <div className="text-white">
                    <p className="font-bold">123</p>
                    <small className="text-gray-300">Users</small>
                </div>
                <div className="text-white">
                    <p className="font-bold">152</p>
                    <small className="text-gray-300">Artworks</small>
                </div>
                <div className="text-white">
                    <p className="font-bold">200</p>
                    <small className="text-gray-300">Artists</small>
                </div>
            </div>
        </div>
        <div 
            className="shadow-xl shadow-black md:2/5 w-full ml-3 mt-10 md:mt-0 
            rounded-lg overflow-hidden bg-gray-800"
        >
            <img src={nft} alt="nft" className="h-80 w-full object-fill lg:h-[480px]"/>
        </div> 
        
    </div>
  )
}

export default Hero