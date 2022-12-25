import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import ScrollToTop from './components/scroll-to-top/Main'
import axios from 'axios'
import useWeb3 from './hooks/useWeb3'
import { useEffect } from 'react'

function App() {
  const [web3, account] = useWeb3()
  useEffect(() => {
    const initWeb3AndContract = async () => {
      web3.init()

      const contract = await fetch('http://localhost:3000/api/getContractJson')
        .then((response) => response.json())
        .then(({ data }) => data)
      const CA = await fetch('http://localhost:3000/api/getCA')
        .then((response) => response.json())
        .then(({ data }) => data)

      await web3.setContract(CA, contract)

      const instance = web3.getContractInstance()
      
      web3
        .subscribeNewBlockEvent((event) => {
          console.log(event)
        })
        .subscribeTransationEvent(instance, (event) => {
          console.log(event)
        })
    }
    if (!!web3) initWeb3AndContract()
    console.log(web3)
  }, [web3])
  return (
    <BrowserRouter>
      <Router />
      <ScrollToTop />
    </BrowserRouter>
  )
}

export default App
