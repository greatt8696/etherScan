import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Main = () => {
  const [blocks, setBlocks] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    axios({
      url: "http://localhost:3000/block/page/1/", // 통신할 웹문서
      method: "get", // 통신할 방식
    }).then((response) => {
      console.log(response.data.data);
      setBlocks(response.data.data);
    });
  }, []);

  const linkTo = (blockHash) => nav(`transactionByBlockHash/${blockHash}`);
  return (
    <div className="grid grid-cols-1 gap-2">
      {blocks.map((block, idx) => (
        <div
          className="text-white p-5 bg-slate-600 "
          key={idx}
          onClick={() => linkTo(block.hash)}
        >
          {Object.keys(block).map((label) => (
            <div className="flex overflow-hidden">
              <h1 className="mr-5">{label}</h1>
              <p>{block[label]}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Main;
