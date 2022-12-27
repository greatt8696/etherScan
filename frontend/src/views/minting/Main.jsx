import { map } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useWeb3 from "../../hooks/useWeb3";

const Main = ({ msg, type }) => {
  const [web3, account] = useWeb3();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const SIZE = 33;
  const DURATION = 1000;
  const stepTime = DURATION / SIZE;
  const arr = Array(SIZE)
    .fill(false)
    .map((_, idx) => parseInt(stepTime * idx));
  return (
    <div>
      <button className="w-20 h-6 bg-red-500"> 1</button>
      <div className="w-full flex gap-2 flex-wrap">
        {arr.fill(false).map((delay, idx) => (
          <div className="introY" style={{ animationDelay: `${delay}ms` }}>
            <div className="bg-yellow-300 w-44  h-60"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
