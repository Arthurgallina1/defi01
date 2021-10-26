import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import Navbar from './Navbar'
import DaiToken from '../abis/DaiToken.json'
import TokenFarm from '../abis/TokenFarm.json'

import './App.css'

async function loadWeb3() {
  if(window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
    console.log('loaded if')
  } else if (window.web3) {
    console.log('loaded else if')
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    window.alert('not ethereum browser detected')
  }
}




export default function App() {
  const [account, setAccount] = useState('0x0')
  const [accountInfo, setAccountInfo] = useState({})

  async function loadBlockChainData() {
    const web3 = window.web3
  
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    
    const networkId = await web3.eth.net.getId()

    // get data from right network
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      console.log('daiToken', daiToken)
      console.log('account', accounts[0])
      setAccountInfo({ daiToken })
      const gas = await web3.eth.getBalance(accounts[0])
      console.debug('gasss', gas)
      let daiTokenBalance = await daiToken.methods.balanceOf(accounts[0]).call()
      // console.log('daiTokenBalance', daiTokenBalance)
      // setAccountInfo({ ...accountInfo, daiTokenBalance: daiTokenBalance.toString() })
    } else {
      alert('dai token contract not deployed on this network')
    }

    // const tokenFarmData = TokenFarm.networks[networkId]
    // if(tokenFarmData) {
    //   const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
    //   // this.setState({ tokenFarm })
    //   console.debug('tokenFarm', await tokenFarm.methods.isStaking(accounts[0]).call())
    //   // let stakingBalance = await tokenFarm.methods.isStaking(accounts[0]).call()
    //   // console.debug('stakingBalance', stakingBalance)
    //   // this.setState({ stakingBalance: stakingBalance.toString() })
    // } else {
    //   window.alert('TokenFarm contract not deployed to detected network.')
    // }
  
  }
  

  useEffect(() => {
    // connects the app to the blockchain
    loadWeb3()
    loadBlockChainData()
  }, [])

  return (
    <div>
      <Navbar account={account} />
      <h1>hello</h1>
    </div>
  )
}
