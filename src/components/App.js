import React, { useEffect, useRef, useState } from 'react'
import Web3 from 'web3'
import Navbar from './Navbar'
import Color from '../abis/Color.json'
import DaiToken from '../abis/DaiToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Lottery from '../abis/Lottery.json'

import './App.css'
import ColorPicker from './ColorPicker'
import LotteryApp from './Lottery'

async function loadWeb3() {
  if (window.ethereum) {
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
  const [contract, setContract] = useState({})
  const [colors, setColors] = useState([])
  const ref = useRef()

  const loadBlockchain = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount('0x742e0c32628cc418E23E6E71927FaDfdd9e5c518')
    // console.log(accounts[0])
    const networkId = await web3.eth.net.getId() //to find correct address of contract
    const networkData = Lottery.networks[networkId]
    // console.log('networkData', networkData)

    if (networkData) {
      const abi = Lottery.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, '0x8B07481F448ED87C6f8297ceEb7EEd3bd64f1b9b')
      console.log('contract', contract)
      setContract(contract)
      try {
        const balance = await contract.methods.getBalance().call()
        // const picker = await contract.methods.players(1)
        const picker = await contract.methods.manager().call()

        // const balance = await contract.methods
        //   .deposit()
        //   .send({ from: accounts[0] })
        console.log('balance', picker)
      } catch (err) {
        console.debug('error', err.message)
      }

      // const totalSupply = await contract.methods.totalSupply().call()

      // //load colors
      // let colores = []
      // for (let i = 1; i <= totalSupply; i++) {
      //   let color = await contract.methods.colors(i - 1).call()
      //   colores.push(color)
      // }
      // setColors(colores)
    } else alert('SC not deployed')
  }

  //mint
  // const loadBlockchain = async () => {
  //   const web3 = window.web3
  //   const accounts = await web3.eth.getAccounts()
  //   setAccount(accounts[0])

  //   const networkId = await web3.eth.net.getId() //to find correct address of contract
  //   const networkData = Color.networks[networkId]
  //   if (networkData) {
  //     const abi = Color.abi
  //     const address = networkData.address
  //     const contract = new web3.eth.Contract(abi, address)
  //     setContract(contract)
  //     const totalSupply = await contract.methods.totalSupply().call()

  //     //load colors
  //     let colores = []
  //     for (let i = 1; i <= totalSupply; i++) {
  //       let color = await contract.methods.colors(i - 1).call()
  //       colores.push(color)
  //     }
  //     setColors(colores)
  //   } else alert('SC not deployed')
  // }

  const getBalance = async () => {
    try {
      const balance = await contract.methods.getBalance().call()
      console.log('balance', balance)
    } catch (err) {
      console.debug('error', err.message)
    }
  }

  const mint = (color) => {
    console.debug('color!!', color)
    try {
      contract.methods
        .mint(color)
        .send({ from: account })
        .once('receipt', (receipt) => {
          console.log('receipt', receipt)
          setColors([...colors, color])
        })
    } catch (err) {
      alert('error')
    }
  }

  //try01
  // async function loadBlockChainData() {
  //   const web3 = window.web3

  //   const accounts = await web3.eth.getAccounts()
  //   setAccount(accounts[0])

  //   const networkId = await web3.eth.net.getId()

  //   // get data from right network
  //   const daiTokenData = DaiToken.networks[networkId]
  //   if(daiTokenData) {
  //     const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
  //     console.log('daiToken', daiToken)
  //     console.log('account', accounts[0])
  //     setAccountInfo({ daiToken })
  //     const gas = await web3.eth.getBalance(accounts[0])
  //     console.debug('gasss', gas)
  //     let daiTokenBalance = await daiToken.methods.balanceOf(accounts[0]).call()
  //     console.log('daiTokenBalance', daiTokenBalance)
  //     // setAccountInfo({ ...accountInfo, daiTokenBalance: daiTokenBalance.toString() })
  //   } else {
  //     alert('dai token contract not deployed on this network')
  //   }
  // }

  useEffect(() => {
    // connects the app to the blockchain
    loadWeb3()
    loadBlockchain()
    // loadBlockChainData()
  }, [])

  return (
    <div>
      {/* <ColorPicker /> */}
      <LotteryApp account={account} getBalance={getBalance} />
    </div>
  )
}
