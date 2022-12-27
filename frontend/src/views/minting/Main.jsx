import { map } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useWeb3 from '../../hooks/useWeb3'
import {
  Plus,
  Minus,
  ChevronDown,
  LogIn,
  LogOut,
  User,
  Users,
  Wallet,
} from 'lucide-react'
import axios, { all } from 'axios'
import { baseUriConfig } from '../../../baseUriConfig'

const Main = ({ msg, type }) => {
  const [web3, account] = useWeb3()
  const [data, setData] = useState({
    mintingSize: 5,
  })

  const nav = useNavigate()
  const dispatch = useDispatch()

  const [uris, setUris] = useState([])
  const [cards, setCards] = useState([])

  useEffect(() => {
    const getUris = async () => {
      const uriRequestList = uris.map((uri) => axios(uri))
      const result = await Promise.all(uriRequestList).then((results) =>
        results.map((data) => data.data),
      )
      setCards(result)
    }
    getUris()
  }, [uris])

  const minusClickHandler = () => setData({ data: data.mintingSize--, ...data })
  const plusClickHandler = () => setData({ data: data.mintingSize++, ...data })

  /*
  const mintingSizeClickHandler = (e) => {
    console.log(e.target)
    e.target.name === 'minus'
      ? setData({ data: data.mintingSize--, ...data })
      : setData({ data: data.mintingSize++, ...data })
  }*/

  const mintingClickHandler = async () => {
    const contract = web3.getContractInstance()
    const account = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    const uris = await axios(
      `http://${baseUriConfig}:3000/nft/equipNft/minting/${data.mintingSize}`,
    ).then((result) => result.data.data.uris)

    web3
      .sendTransaction(
        {
          functionName: 'batchMint',
          args: [data.mintingSize, uris],
          from: account[0],
        },
        contract[3], //equipMinting
      )
      .on('receipt', () => {
        setUris(uris)
      })
  }

  const SIZE = 33
  const DURATION = 1000
  const stepTime = DURATION / SIZE
  const arr = Array(SIZE)
    .fill(false)
    .map((_, idx) => parseInt(stepTime * idx))
  return (
    <div className="w-full grid grid-cols-6 gap-5">
      <div className="col-span-4 bg-red-300 h-full">
        {cards.map((card) => (
          <div>
            {card.name}
            <img src={card.image} alt="" />
          </div>
        ))}
      </div>
      <div className="col-span-2 bg-slate-200/30 h-full rounded-xl p-5 flex flex-col gap-5">
        <h1 className="text-white mx-auto font-bold text-3xl text-center ">
          민팅하긔
        </h1>
        <div className="w-30 h-30 bg-red-300 ">1</div>
        <div className="w-30 h-30 bg-red-300 ">1</div>
        <div className="flex justify-around">
          <button
            name="minus"
            onClick={minusClickHandler}
            className="p-2  bg-red-500 rounded-full"
          >
            <Minus
              name="minus"
              className="text-white ml-auto font-bold"
              size={20}
            />
          </button>
          <input
            className="bg-slate-200/30 text-center text-xl font-bold pl-2 rounded-lg"
            type="number"
            min={1}
            max={50}
            value={data.mintingSize}
          />
          <button
            name="plus"
            onClick={plusClickHandler}
            className="p-2  bg-green-500 rounded-full"
          >
            <Plus
              name="plus"
              className="text-white ml-auto font-bold"
              size={20}
            />
          </button>
        </div>

        <button
          onClick={mintingClickHandler}
          className="p-2  bg-green-500 rounded-full"
        >
          <p className="text-white font-bold">민팅 진행시캿</p>
        </button>
      </div>
      {/* <button className="w-20 h-6 bg-red-500"> 1</button>
      <div className="w-full flex gap-2 flex-wrap">
        {arr.fill(false).map((delay, idx) => (
          <div className="introY" style={{ animationDelay: `${delay}ms` }}>
            <div className="bg-yellow-300 w-44  h-60"></div>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default Main
