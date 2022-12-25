import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'
import ScrollToTop from './components/scroll-to-top/Main'
import axios from 'axios'
import useWeb3 from './hooks/useWeb3'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getBlocksByPage,
  getNewBlockByNumber,
  selectBlock,
} from './store/reducers/blockReducer'
import {getNewTransactionByHash, getTransactionsByPage } from './store/reducers/transactionReducer'

function App() {
  const [web3, account] = useWeb3()
  const dispatch = useDispatch()

  useEffect(() => {
    const initWeb3AndContract = async () => {
      web3.init()

      const [CA, contract] = await Promise.all([
        axios('http://localhost:3000/api/getCA').then(
          (result) => result.data.data,
        ),
        axios('http://localhost:3000/api/getContractJson').then(
          (result) => result.data.data,
        ),
      ])
      await web3.setContract(CA, contract)

      const instance = web3.getContractInstance()

      web3
        .subscribeNewBlockEvent((event) => {
          dispatch(getNewBlockByNumber(event.number))
        })
        .subscribeTransationEvent(instance, (event) => {
          dispatch(getNewTransactionByHash(event.transactionHash))
        })
    }
    if (!!web3) initWeb3AndContract()
    console.log(web3)
  }, [web3])

  useEffect(() => {
    dispatch(getBlocksByPage())
    dispatch(getTransactionsByPage())
  }, [])

  return (
    <BrowserRouter>
      <Router />
      <ScrollToTop />
    </BrowserRouter>
  )
}

export default App
