import React, { useEffect, useState } from 'react'
import {BiTransfer} from 'react-icons/bi'
import {MdOpenInNew} from 'react-icons/md'
import { truncate, useGlobalState } from '../store'


const Transactions = () => {

  const [transactions] = useGlobalState('transactions')
  const [end, setEnd] = useState(3)
  const [count] = useState(3)
  const [collection, setCollection] = useState([])

  const getCollection = () => {
    return transactions.slice(0, end)
  }

  useEffect(() => {
    setCollection(getCollection())
  }, [transactions, end])


  return (
    <div className='bg-[#151c25] gradient-bg-artworks '>
        <div className="w-4/5 py-10 mx-auto">
            <h4 className="text-white text-3xl font-bold uppercase text-gradient">
               {collection.length > 0 ? 'Latest Transactions' : 'No Transaction Yet'}
            </h4>
            <div 
                className="grid grid-cols-1 md:grid-cols-2  gap-6 
                md:gap-4  py-2.5"
            >
            {collection.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center border border-pink-500 text-gray-400 w-full
                  shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 p-3"
                >
                  <div className="rounded-md shadow-sm shadow-pink-500 p-2">
                    <BiTransfer />
                  </div>
    
                  <div>
                    <h4 className="text-sm">{tx.title} Transfered</h4>
                    <small className="flex flex-row justify-start items-center">
                      <span className="mr-1">Received by</span>
                      <a href="#" className="text-pink-500 mr-2">
                        {truncate(tx.owner, 4, 4, 11)}
                      </a>
                      <a href="#">
                        <MdOpenInNew />
                      </a>
                    </small>
                  </div>
    
                  <p className="text-sm font-medium">{tx.cost}ETH</p>
                </div>
              ))}
            </div>
            {collection.length > 0 && transactions.length > collection.length ? (
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

const Transaction = ({tx}) => (
    <div className="flex justify-between items-center border border-pink-500 
        text-gray-400 w-full shadow-xl shadow-black rounded-md overflow-hidden
        bg-gray-800 my-2 p-3 "
    >
        <div className="rounded-md shadow-sm shadow-pink-500 p-2">
            <BiTransfer/>
            
        </div>
        <div className="">
            <h4 className='text-sm'>#{tx}  Fund Transfered</h4>
            <small className='flex justify-start items-center m-1 '>
                <span className='m-1'>Received by </span>
                <a className='text-green-400 mr-2' href='hre' target='' >0x95....3548</a>
                <MdOpenInNew className='text-lg'/>
            </small>
        </div>

        <p className='text-sm font-medium'>1.2 ETH</p>
    
    </div>
)

export default Transactions