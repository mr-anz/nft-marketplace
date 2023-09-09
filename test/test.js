const { expect } = require("chai")
const { ethers } = require('hardhat')

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("Timeless", () => {
  let deployer,buyer,buyer1

  beforeEach(async ()=>{
    [deployer,buyer,buyer1] = await ethers.getSigners()

    const Timeless = await ethers.getContractFactory('TimelessNFT')
    const timeless = await Timeless.deploy()
    
  })

})
