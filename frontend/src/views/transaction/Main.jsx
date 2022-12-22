import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Main = () => {
  const [transaction, setTransaction] = useState([]);
  const [logs, setLogs] = useState([]);

  const nav = useNavigate();
  const location = useParams();
  // const searchParams = new URLSearchParams(location);
  console.log("@@@@@@@@@@@", location);
  useEffect(() => {
    axios({
      url: `http://localhost:3000/transaction/searchByblockHash/${location.hash}/`, // 통신할 웹문서
      method: "get", // 통신할 방식
    }).then((response) => {
      console.log(response.data.data);
      setTransaction(response.data.data);

      axios({
        url: `http://localhost:3000/logs/searchByTransactionHash/${response.data.data.hash}/`, // 통신할 웹문서
        method: "get", // 통신할 방식
      }).then((response) => {
        console.log(response.data.data);
        setLogs(response.data.data);
      });
    });
  }, []);

  const linkToTransaction = () => {
    nav();
  };
  return (
    <div className="grid grid-cols-1 gap-2">
      {transaction.map((block, idx) => (
        <div className="text-white p-5 bg-slate-600 " key={idx}>
          {Object.keys(block).map((label) => (
            <div className="flex overflow-hidden">
              <h1 className="mr-5">{label}</h1>
              <p>{block[label]}</p>
            </div>
          ))}
          {logs.map((log) => {
            <div>{log}</div>;
          })}
        </div>
      ))}
    </div>
  );
};

export default Main;
