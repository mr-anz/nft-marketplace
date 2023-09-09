import React, { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import nf from '../assets/nf.jpg'
import { updateNFT } from '../Blockchain.Services'
import {useGlobalState, setGlobalState, setLoadingMsg, setAlert} from '../store/index'

const UpdateNFT = () => {
  const [modal] = useGlobalState('updateModal')
  const [nft] = useGlobalState('nft')
  const [price, setPrice] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!price || price <= 0) return

    setGlobalState('modal', 'scale-0')
    setGlobalState('loading', { show: true, msg: 'Initiating price update...' })

    try {
      setLoadingMsg('Price updating...')
      setGlobalState('updateModal', 'scale-0')

      await updateNFT({ ...nft, cost: price })
      setAlert('Price updated...', 'green')
      window.location.reload()
    } catch (error) {
      console.log('Error updating file: ', error)
      setAlert('Update failed...', 'red')
    }
  }

  return (
    <div 
      className={`fixed top-0 left-0 w-screen h-screen flex items-center 
      justify-center bg-black bg-opacity-50 transform transition-transform 
      duration-300 ${modal}`}
    >
      <div 
        className="bg-[#151c25] shadow-xl shadow-[#e32970] rounded-xl w-11/12
        md:w-2/5 h-7/12 p-6"
      >
        <form action="" className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-400">
              Add NFT
            </p>
            <button
              onClick={() => setGlobalState('updateModal', 'scale-0')}
              type='button'
              className="border-0 bg-transparent text-white focus:outline-none"
            >
              <FaTimes className="text-gray-400"/>
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 h-32 w-32 rounded-xl overflow-hidden shadow-sm shadow-white">
              <img 
                alt={nft?.title}
                src={nft?.metadataURI}
                className="h-full w-full object-cover cursor-pointer" 
              />
            </div>
          </div>
         
          <div className="flex justity-between py-3 px-4 items-center bg-gray-800 rounded-xl mt-5">
            <input 
              type="text" 
              className="block w-full text-sm text-white focus:outline-none
              cursor-pointer focus:ring-0 bg-transparent border-0"
              placeholder='Price (ETH)'
              min={0.01}
              step={0.01}
              name='price'
              onChange={(e)=> setPrice(e.target.value)}
              value={price}
              required 
            />
          </div>
         
          <button 
            onClick={handleSubmit}
            className="flex shadow-lg shadow-black text-white text-sm bg-green-500 
            hover:bg-green-700 rounded-full p-2 justify-center items-center w-full text-md
            mt-5"
          >
              Update Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateNFT