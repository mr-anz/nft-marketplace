import React, { useEffect, useState } from 'react'
import img from '../assets/nnf.jpeg'

import {getGlobalState, useGlobalState, setGlobalState} from '../store/index'


const Artworks = () => {

    const [nfts] = useGlobalState('nfts')
    const [end, setEnd] = useState(4)
    const [count] = useState(4)
    const [collection, setCollection] = useState([])
  
    const getCollection = () => {
      return nfts.slice(0, end)
    }
    console.log(nfts)
    useEffect(() => {
      setCollection(getCollection())
    }, [nfts, end])
  

  return (
    <div className='bg-[#151c25] gradient-bg-artworks'>
        <div className="w-4/5 py-10 mx-auto">
            <h4 className="text-white text-3xl font-bold uppercase text-gradient">
                {collection.length > 0 ? 'Latest Artworks' : 'No Artworks Yet'}
            </h4>
            <div 
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 
                md:gap-4 lg:gap-3 py-2.5"
            >
              {collection.map((nft, i) => (
                <Card key={i} nft={nft} />
              ))}
            </div>
            {collection.length > 0 && nfts.length > collection.length ? (
                <div className="text-center my-5">
                  <button
                    className="shadow-xl shadow-black text-white
                  bg-[#e32970] hover:bg-[#bd255f]
                  rounded-full cursor-pointer p-2"
                    onClick={() => setEnd(end + count)}
                  >
                    Load More
                  </button>
                </div>
            ) : null}
        </div>
    </div>
  )
}

const Card = ({nft}) => {
    const setNFT = () => {
    setGlobalState('nft', nft)
    setGlobalState('showModal', 'scale-100')
    }
    return(    
    <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden
        bg-gray-800 my-2 p-3"
    >
        <img src={nft.image} alt={nft.title} className='h-48 w-full object-fill shadow-lg 
            shadow-black  rounded-lg mb-3' 
        />
        <h4 className="text-white font-bold ">{nft.title}</h4>
        <p className="text-gray-400 text-sm my-1">
            {nft.description.slice(0,149)+'...'}
        </p>
        <div className="flex justify-between items-center mt-3 text-white">
            <div className="flex flex-col">
                <small className="text-xs">Current Price</small>
                <p className="text-sm font-semibold">{nft.price} ETH</p>
            </div>
            <button 
                onClick={setNFT}
                className="shadow-md shadow-black text-sm bg-[#e32970] 
                hover:bg-[#bd255f] rounded-full p-2"
            >
                View Details
            </button>
        </div>
    </div>
)
}


export default Artworks