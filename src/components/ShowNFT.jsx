import React, { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import nf from '../assets/nnf.jpeg'
import { buyNFT } from '../Blockchain.Services'
import {useGlobalState, setGlobalState, setAlert, truncate} from '../store/index'

const ShowNFT = () => {
  const [showModal] = useGlobalState('showModal')
  const [connectedAccount] = useGlobalState('connectedAccount')
  const [nft] = useGlobalState('nft')
  console.log(connectedAccount)
  console.log(nft)
  const onChangePrice = () => {
    setGlobalState('showModal', 'scale-0')
    setGlobalState('updateModal', 'scale-100')
  }

  const handleNFTPurchase = async () => {
    
    setGlobalState('showModal', 'scale-0')
    setGlobalState('loading', {
      show: true,
      msg: 'Initializing NFT transfer...',
    })

    try {
      await buyNFT(nft)
      setAlert('Transfer completed...', 'green')
      window.location.reload()
    } catch (error) {
      console.log('Error transfering NFT: ', error)
      setAlert('Purchase failed...', 'red')
    }
  }
  
  
    return (
      <div 
        className={`fixed top-0 left-0 w-screen h-screen flex items-center 
        justify-center bg-black bg-opacity-50 transform transition-transform 
        duration-300 ${showModal}`}
      >
        <div 
          className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12
          md:w-2/5 h-7/12 p-6"
        >
          <div action="" className="flex flex-col">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-400">
                Buy NFT
              </p>
              <button
                onClick={() => setGlobalState('showModal', 'scale-0')}
                type='button'
                className="border-0 bg-transparent text-white focus:outline-none"
              >
                <FaTimes/>
              </button>
            </div>
            <div className="flex justify-center items-center rounded-xl mt-5">
              <div className="shrink-0 h-32 w-32 rounded-xl overflow-hidden shadow-sm shadow-white">
                <img 
                  src={nft?.image} 
                  alt={nft?.title} 
                  className="h-full w-full object-cover cursor-pointer " 
                />
              </div>
            </div>
           
            <div className="flex flex-col justify-start rounded-xl mt-5">
              <h4 className="text-white font-semibold ">{nft?.title}</h4>
              <p className="text-gray-400 text-sm my-1">
              {nft?.description} 
              </p>
              <div className="flex justify-between items-center mt-3 text-white">
                <div className="flex justify-start items-center">
                  <div className="flex flex-col justify-center items-start ">
                    <small className="text-white font-bold">@Seller</small>
                    <small className="text-green-500 font-semibold">
                      {nft?.seller ? truncate(nft?.seller, 4, 4, 11) : '...'}
                    </small>
                  </div>
                </div>
              
                <div className="flex flex-col text-white">
                  <small className="text-xs">
                    Current Price
                  </small>
                  <p className="text-sm font-semibold">{nft?.price} ETH</p>
                </div>
              </div>
            </div>
           
            
            <div className="flex justify-between items-center space-x-2">
            {connectedAccount == (nft?.seller?.toLowerCase())  ? (
              <></>
            ) : (
              <button
                className="flex flex-row justify-center items-center
                w-full text-white text-md bg-[#e32970]
                hover:bg-[#bd255f] py-2 px-5 rounded-full
                drop-shadow-xl border border-transparent
                hover:bg-transparent hover:text-[#e32970]
                hover:border hover:border-[#bd255f]
                focus:outline-none focus:ring mt-5"
                onClick={handleNFTPurchase}
               
              >
                Purchase Now
              </button>
            )}
            </div>
          </div>
        </div>
      </div>
    )
  }
export default ShowNFT
//{connectedAccount == nft?.owner ? (
//  ) : (
//}