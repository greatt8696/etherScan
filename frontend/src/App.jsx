import { useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import ScrollToTop from "./components/scroll-to-top/Main";
import axios from "axios";
import useWeb3 from "./hooks/useWeb3";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlocksByPage,
  getNewBlockByNumber,
  selectBlock,
} from "./store/reducers/blockReducer";
import {
  getNewTransactionByHash,
  getTransactionsByPage,
  selectTransaction,
} from "./store/reducers/transactionReducer";

import { toast } from "react-toastify";
function App() {
  const [web3, account] = useWeb3();
  const firstInit = useRef();
  firstInit.current = true;
  const dispatch = useDispatch();
  const blocks = useSelector(selectBlock);
  const transactions = useSelector(selectTransaction);

  useEffect(() => {
    const initWeb3AndContract = async () => {
      if (firstInit.current) {
        web3.init();
        const [CA, contract] = await Promise.all([
          axios("http://192.168.0.116:3000/api/getCA").then(
            (result) => result.data.data
          ),
          axios("http://192.168.0.116:3000/api/getContractJson").then(
            (result) => result.data.data
          ),
        ]);

        await web3.setContract(CA, contract);

        const instance = web3.getContractInstance();

        web3
          .subscribeNewBlockEvent((event) => {
            if (
              blocks.filter((block) => {
                block.number === event.number;
              }).length === 0
            ) {
              dispatch(getNewBlockByNumber(event.number));
            }
          })
          .subscribeTransationEvent(instance, (event) => {
            if (
              transactions.filter((transaction) => {
                transaction.hash === event.transactionHash;
              }).length === 0
            ) {
              dispatch(getNewTransactionByHash(event.transactionHash));
            }
          });
      }
      firstInit.current = false;
    };
    if (!!web3) initWeb3AndContract();
    console.log(web3);
  }, [web3]);

  useEffect(() => {
    dispatch(getBlocksByPage());
    dispatch(getTransactionsByPage());
  }, []);

  return (
    <BrowserRouter>
      <Router />
      <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
