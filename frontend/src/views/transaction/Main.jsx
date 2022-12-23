import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Main = () => {
  const [transaction, setTransaction] = useState([])
  const [logs, setLogs] = useState([])

  const nav = useNavigate()
  const location = useParams()
  // const searchParams = new URLSearchParams(location);
  // console.log("@@@@@@@@@@@", location);
  useEffect(() => {
    axios({
      url: `http://localhost:3000/transaction/searchByblockHash/${location.hash}/`, 
      method: 'get', 
    }).then((response) => {
      setTransaction(response.data.data)

      axios({
        url: `http://localhost:3000/logs/searchByTransactionHash/${response.data.data[0].hash}/`,
        method: 'get',
      }).then((response) => {
        setLogs(response.data.data)
      })
    })
  }, [])

  const linkToTransaction = () => {
    nav()
  }
  return (
    <div className="grid grid-cols-1 gap-2 introY">
      {transaction.map((block, idx) => (
        <div className="text-white p-5 bg-slate-600 introY" key={idx}>
          {Object.keys(block).map((label, idx) => (
            <div className="flex overflow-hidden introX" key={idx}>
              <h1 className="mr-5">{label}</h1>
              <p>{block[label]}</p>
            </div>
          ))}

          {logs.map((log) => {
            return Object.keys(log).map((label, idx) => {
              console.log(label)
              return (
                <div className="flex overflow-ellipsis introX" key={idx}>
                  <h1 className="mr-5">{label}</h1>
                  <p>{JSON.stringify(log[label])}</p>
                </div>
              )
            })
          })}
        </div>
      ))}
    </div>
  )
}

export default Main
