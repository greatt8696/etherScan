import { useRef, useState } from 'react'
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
import {
  getNewTransactionByHash,
  getTransactionsByPage,
  selectTransaction,
} from './store/reducers/transactionReducer'
import {
  offLoadingDispatch,
  selectLoading,
} from './store/reducers/interfaceReducer'
import Loading from './components/loading/Loading'
import { baseUriConfig } from '../baseUriConfig'
import { toast } from 'react-toastify'

function App() {
  const [web3, account] = useWeb3()
  const dispatch = useDispatch()
  const blocks = useSelector(selectBlock)
  const transactions = useSelector(selectTransaction)
  const loading = useSelector(selectLoading)

  useEffect(() => {
    const initWeb3AndContract = async () => {
      web3.init()
      const [CA, contract] = await Promise.all([
        axios(`http://${baseUriConfig}:3000/nft/getCA`).then(
          (result) => result.data.data,
        ),
        axios(`http://${baseUriConfig}:3000/nft/getContractJson`).then(
          (result) => result.data.data,
        ),
      ])
      await web3.setContracts(CA, contract)

      const instance = web3.getContractInstance()
      web3
        .subscribeNewBlockEvent((event) => {
          if (
            blocks.filter((block) => {
              block.number === event.number
            }).length === 0
          ) {
            toast.info(`블록번호 : ${event.number} 블록해시 : ${event.hash}`, {
              position: 'bottom-left',
              autoClose: 2000,
              hideProgressBar: false,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: 'colored',
            })
            dispatch(getNewBlockByNumber(event.number))
          }
        })
        .subscribeTransationEvent(instance, (event) => {
          if (
            transactions.filter((transaction) => {
              transaction.hash === event.transactionHash
            }).length === 0
          ) {
            toast.success(
              `트랜잭션 : ${event.transactionHash} 블록번호 : ${event.blockNumber}`,
              {
                position: 'bottom-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: 'colored',
              },
            )
            dispatch(getNewTransactionByHash(event.transactionHash))
          }
        })
    }
    if (!!web3) initWeb3AndContract()
    // console.log(web3);
  }, [web3])

  useEffect(() => {
    dispatch(getBlocksByPage())
    dispatch(getTransactionsByPage())
    setTimeout(() => {
      dispatch(offLoadingDispatch())
    }, 1000)
  }, [])

  return (
    <BrowserRouter>
      {loading && <Loading />}
      <Router />
      <ScrollToTop />
    </BrowserRouter>
  )
}

export default App
