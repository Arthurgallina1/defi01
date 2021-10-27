import React, { useEffect, useRef, useState } from 'react'
import Web3 from 'web3'
import Navbar from './Navbar'
import Color from '../abis/Color.json'
import DaiToken from '../abis/DaiToken.json'
import TokenFarm from '../abis/TokenFarm.json'

import './App.css'

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


  useEffect(() => {
    console.log(account)

  }, [account])
  
  const loadBlockchain = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId() //to find correct address of contract
    const networkData = Color.networks[networkId]
    if (networkData) {
      const abi = Color.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      setContract(contract)
      const totalSupply = await contract.methods.totalSupply().call()
      
      //load colors
      let colores = []
      for (let i = 1; i <= totalSupply; i++) {
        let color = await contract.methods.colors(i - 1).call()
        colores.push(color)
      }
      setColors(colores)
    } else alert('SC not deployed')
  }

  const mint = (color) => {
    console.debug('account!!', account)
    console.debug('color!!', color)
    try {
      contract.methods.mint(color).send({ from: account })
    .once('receipt', (receipt) => {
      console.log('receipt', receipt)
      setColors([...colors, color])
    })
    } catch(err) {
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
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        href="http://www.dappuniversity.com/bootcamp"
        target="_blank"
        rel="noopener noreferrer"
      >
        Color Tokens
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
          <small className="text-white"><span id="account">{account}</span></small>
        </li>
      </ul>
    </nav>
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 d-flex text-center">
          <div className="content mr-auto ml-auto">
            <h1>Issue Token</h1>
            <form onSubmit={(event) => {
              event.preventDefault()
              const color = ref.current.value
              mint(color)
              // this.mint(color)
            }}>
              <input
                type='text'
                className='form-control mb-1'
                placeholder='e.g. #FFFFFF'
                ref={ref}
              />
              <input
                type='submit'
                className='btn btn-block btn-primary'
                value='MINT'
              />
            </form>
          </div>
        </main>
      </div>
      <hr/>
      <div className="row text-center">
        {colors.map((color, key) => {
          return(
            <div key={key} className="col-md-3 mb-3">
              <div className="token" style={{ backgroundColor: color }}></div>
              <div>{color}</div>
            </div>
          )
        })}
      </div>
    </div>
  </div>
  )
}
