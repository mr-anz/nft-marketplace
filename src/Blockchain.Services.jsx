import abi from './abis/TimelessNFT.json'
import Timeless from './config.json'
import axios from "axios";
import { setGlobalState, getGlobalState, setAlert } from './store'
import {ethers} from 'ethers'
import Transactions from './components/Transactions';


const  ethereum  = window.ethereum

const getEtheriumContract = () => {
  const connectedAccount = getGlobalState('connectedAccount')

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()

    const contract = new ethers.Contract(Timeless[31337].Timeless.address, abi, signer)
    return contract
  } else {
    return getGlobalState('contract')
  }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    setGlobalState('connectedAccount', accounts[0])
  } catch (error) {
    reportError(error)
  }
}


const isWallectConnected = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      setGlobalState('connectedAccount', accounts[0])
      await isWallectConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0])
    } else {
      alert('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const structuredNfts = (nfts) => {
  return nfts
    .map((nft) => ({
      id: Number(nft.id),
      owner: nft.owner.toLowerCase(),
      cost: ethers.utils.formatEther(nft.cost),
      title: nft.title,
      description: nft.description,
      metadataURI: nft.metadataURI,
      timestamp: nft.timestamp,
    }))
    .reverse()
}

const getAllNFTs = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const contract = await getEtheriumContract()
    const nfts = await contract.getAllNFTs()
    //const transactions = await contract.getAllTransactions()
    console.log(nfts)
    
    //setGlobalState('transactions', structuredNfts(transactions))
  } catch (error) {
    reportError(error)
  }
}

const nftItem = async() => {
  const contract = await getEtheriumContract()
  let transaction = await contract.getAllNFTs()
  
  const items = await Promise.all(transaction.map(async i => {
    const tokenURI = await contract.tokenURI(i.tokenId);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
  
    let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
    let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.image,
        title: meta.title,
        description: meta.description,
    }
    return item;
  }))
  console.log(items)
  setGlobalState('nfts', items)
  return true
}


const mintNFT = async ({ metadataURL, price }) => {
  try {
    price = ethers.utils.parseUnits(price, 'ether')
    const contract = await getEtheriumContract()
  //  const account = getGlobalState('connectedAccount')
    const mintPrice = ethers.utils.parseUnits('0.01', 'ether')

    let transaction = await contract.createToken(metadataURL, price, {value:mintPrice})
    await transaction.wait()  

  } catch (error) {
    reportError(error)
  }
}

const buyNFT = async ({ tokenId, price }) => {
  try {
    const cost = ethers.utils.parseUnits(price, 'ether')
    const contract = await getEtheriumContract()
   // const buyer = getGlobalState('connectedAccount')

    await contract
      .executeSale(Number(tokenId), {value:cost})
      

    return true
  } catch (error) {
    reportError(error)
  }
}

const updateNFT = async ({ id, cost }) => {
  try {
    cost = ethers.utils.parseUnits(cost, 'ether')
    const contract = await getEtheriumContract()
  //  const buyer = getGlobalState('connectedAccount')

    await contract.changePrice(Number(id), cost)
  } catch (error) {
    reportError(error)
  }
}

const reportError = (error) => {
  setAlert(JSON.stringify(error), 'red')
  throw new Error('No ethereum object.')
}

export {
  getAllNFTs,
  connectWallet,
  mintNFT,
  buyNFT,
  updateNFT,
  nftItem,
  isWallectConnected,
}
