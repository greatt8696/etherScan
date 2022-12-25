import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getBlocksByPage, selectBlock } from '../../store/reducers/blockReducer'
import { selectTransaction } from '../../store/reducers/transactionReducer'

const Main = () => {
  // const [blocks, setBlocks] = useState([])
  const nav = useNavigate()
  const blocks = useSelector(selectBlock)
  const transactions = useSelector(selectTransaction)

  const linkToBlock = (blockNumber) =>
    nav(`blockByNumber/${blockNumber}`, {
      state: {
        searchType: 'blockNumber',
      },
    })
  const linkToTransaction = (blockHash) =>
    nav(`transactionByHash/${blockHash}`, {
      state: {
        searchType: 'transactionHash',
      },
    })
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="col-span-1  gap-2">
        {blocks.map((block, idx) => (
          <div
            className="text-white p-5 bg-slate-600  my-2 rounded-md "
            key={idx}
            onClick={() => linkToBlock(block.number)}
          >
            <div className="flex overflow-hidden flex-col introX" key={idx}>
              <h1 className="mr-5">블록번호 : {block.number}</h1>
              <p className="whitespace-nowrap">블록해시 : {block.hash}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-1 gap-2">
        {transactions.map((transaction, idx) => (
          <div
            className="text-white p-5 bg-slate-600 my-2 rounded-md introX"
            key={idx}
            onClick={() => linkToTransaction(transaction.hash)}
          >
            <div className="flex overflow-hidden flex-col introX" key={idx}>
              {/* <h1 className="mr-5">트랜잭션해시 : {transaction.number}</h1> */}
              <p className="text-ellipsis">트랜잭션해시 : {transaction.hash}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Main

/** 
  <div className="grid grid-cols-2 gap-2">
  <div className="col-span-1">
    {blocks.map((block, idx) => (
      <div
        className="text-white p-5 bg-slate-600 "
        key={idx}
        onClick={() => linkTo(block.hash)}
      >
        {Object.keys(block).map((label, idx) => (
          <div className="flex overflow-hidden" key={idx}>
            <h1 className="mr-5">{label}</h1>
            <p>{block[label]}</p>
          </div>
        ))}
      </div>
    ))}
  </div>
  </div>
*/
