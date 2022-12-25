import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Main = () => {
  const [block, setBlock] = useState([])

  const nav = useNavigate()
  const location = useParams()

  useEffect(() => {
    axios({
      url: `http://localhost:3000/block/${location.blockNumber}/`,
      method: 'get',
    }).then((response) => {
      setBlock(response.data.data)
    })
  }, [])

  const linkToTransaction = (blockHash) =>
    nav(`transactionByHash/${blockHash}`, {
      state: {
        searchType: 'transactionHash',
      },
    })
  return (
    <div className="grid grid-cols-1 gap-2 introY">
      {block.map((block, idx) => (
        <div className="text-white p-5 bg-slate-600 introY" key={idx}>
          {Object.keys(block).map((label, idx) => (
            <div
              className="flex overflow-hidden introX"
              key={idx}
              style={{animationDelay : `${idx * 20}ms`}}
            >
              <h1 className="mr-5">{label}</h1>
              {label === 'transactions' ? (
                <div>
                  {block[label].map((transactionHash, idx) => (
                    <div
                      className="underline underline-offset-4 cursor-pointer"
                      key={idx}
                      onClick={() => linkToTransaction(transactionHash)}
                    >
                      {transactionHash}
                    </div>
                  ))}
                </div>
              ) : (
                <p>{block[label]}</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Main
