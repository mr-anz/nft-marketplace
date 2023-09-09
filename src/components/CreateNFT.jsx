import React, { useState } from 'react'
import {FaTimes} from 'react-icons/fa'
import nf from '../assets/nf.jpg'
import {useGlobalState, setGlobalState, setLoadingMsg, setAlert} from '../store/index'
import { uploadFileToIPFS, uploadJSONToIPFS } from '../pinata'
import { mintNFT } from '../Blockchain.Services'
import { ethers } from 'ethers'


const CreateNFT = () => {
  const [modal] =useGlobalState('modal') 
  const [title,setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [imgBase64, setImgBase64] = useState(null)

  const changeImage = async (e) => {
    const reader = new FileReader()
    if(e.target.files[0]) reader.readAsDataURL(e.target.files[0])

    reader.onload = (readerEvent) =>{
      const file = readerEvent.target.result
       setImgBase64(file)
    }
    var file = e.target.files[0]
    console.log(imgBase64)
    try{
      const response = await uploadFileToIPFS(file)
      if(response.success === true){
        setAlert('Uploading image to pinata ', response.pinataURL)
        setFileUrl(response.pinataURL)

      }
      console.log(response,'hello')
    }
    catch(e){
      console.log('Error during file upload', e)
    }
  }

  const uploadMetadataToIPFS = async ()=>{
    
    console.log(title,description,price)
    if (!title || !price || !description || !fileUrl ) return

    setGlobalState('modal', 'scale-0')
    setGlobalState('loading', { show: true, msg: 'Uploading IPFS data...' })

    const nftJSON = {
      title, price, description, image: fileUrl
    }

    try {
      //Upload the metadata JSON to IPFS
      const response = await uploadJSONToIPFS(nftJSON)
      if(response.success === true){
        console.log('Uploading JSON to pinata:', response)
        return response.pinataURL
      }

  
    } catch (error) {
      console.log('Error uploading file: ', error)
      setAlert('Minting failed...', 'red')
    }
    
    closeModel()

  }
  
  
  const listNFT = async(e)=>{
    e.preventDefault()

    //Uploading data to IPFS
    try{
      const metadataURL = await uploadMetadataToIPFS()
      const nft = {metadataURL, price}
      await mintNFT(nft)
      setLoadingMsg('Intializing transaction...')

      setAlert('Minting completed...', 'green')
      resetForm()
      window.location.reload()
    } catch (error) {
      console.log('Error uploading file: ', error)
      setAlert('Minting failed...', 'red')
   }
  } 

  const closeModel = ()=>{
    setGlobalState('modal','scale-0')
    resetForm()
  }

  const resetForm = ()=>{
    setFileUrl('')
    setImgBase64(null)
    setTitle('')
    setDescription('')
    setPrice('')
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
              onClick={closeModel}
              type='button'
              className="border-0 bg-transparent text-white focus:outline-none"
            >
              <FaTimes/>
            </button>
          </div>
          <div className="flex justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 h-32 w-32 rounded-xl overflow-hidden shadow-sm shadow-white">
              <img 
                src={imgBase64 || nf} 
                alt="NFT" 
                className="h-full w-full object-cover cursor-pointer " 
              />
            </div>
          </div>
          <div className="flex justity-between items-center bg-gray-800 rounded-xl mt-5">
            <label htmlFor="" className="block">
              <span className="sr-only">Choose Profile Photo</span>
              <input 
                type="file" 
                className=" block w-full text-sm text-slate-500 file:mr-4 
                file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm
                file:font-semibold hover:file:bg-green-500 focus:outline-none
                cursor-pointer focus:ring-0"
                accept='image/jpeg, image/gig, image/png, image/webp, image/jpg'
                onChange={changeImage}
                required 
              />
            </label>
          </div>
          <div className="flex justity-between py-3 px-4 items-center bg-gray-800 rounded-xl mt-5">
            <input 
              type="text" 
              className="block w-full text-sm text-white focus:outline-none
              cursor-pointer focus:ring-0 bg-transparent border-0"
              placeholder='Title'
              name='title'
              onChange={(e)=> setTitle(e.target.value)}
              value={title}
              required 
            />
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
          <div className="flex justity-between py-3 px-4 items-center bg-gray-800 rounded-xl mt-5">
            <textarea 
              type="text" 
              className="block w-full text-sm text-white focus:outline-none
              cursor-pointer focus:ring-0 bg-transparent border-0 h-20 resize-none"
              placeholder='Description'
              name='description'
              onChange={(e)=> setDescription(e.target.value)}
              value={description}
              required 
            />
          </div>
          <button 
            onClick={listNFT}
            className="flex shadow-lg shadow-black text-white text-sm bg-green-500 
            hover:bg-green-700 rounded-full p-2 justify-center items-center w-full text-md
            mt-5"
          >
              Mint Now
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateNFT