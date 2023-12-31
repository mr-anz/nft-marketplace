import { useEffect } from 'react'
import { getAllNFTs, isWallectConnected, nftItem } from './Blockchain.Services'
import Alert from './components/Alert'
import Artworks from './components/Artworks'
import CreateNFT from './components/CreateNFT'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import Loading from './components/Loading'
import ShowNFT from './components/ShowNFT'
import UpdateNFT from './components/UpdateNFT'

const App = () => {
  useEffect(()=>{
    const fetchData = async () => {
      await isWallectConnected()
      await nftItem()
    }
    fetchData()      
  }, [])

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      <Artworks />
      <CreateNFT />
      <ShowNFT />
      <UpdateNFT />
      <Footer />
      <Alert />
      <Loading />
    </div>
  )
}

export default App
