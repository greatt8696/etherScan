import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import produce, { original } from "immer";
import { toast } from "react-toastify";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: { transactions: [], newTransaction: {} },

  reducers: {
    getTransactions: (state, action) =>
      produce(state, (draft) => {
        draft.transactions = action.payload;
        //console.log(draft.transactions);
      }),

    addNewTransaction: (state, action) =>
      produce(state, (draft) => {
        const newtransaction = action.payload[0];
        const prevtransactions = original(state.transactions);
        const transactionsExceptLast = prevtransactions.slice(0, -1);
        const updatedtransactions = [newtransaction, ...transactionsExceptLast];
        draft.transactions = updatedtransactions;
        draft.newtransaction = newtransaction;
      }),
  },
});

export const { getTransactions, addNewTransaction } = transactionSlice.actions;

export const getTransactionsByPage =
  (page = 1) =>
  async (dispatch) => {
    const transactions = await axios({
      url: `http://192.168.0.116:3000/transaction/page/${page}/`,
      method: "get",
    }).then((response) => response.data.data);
    dispatch(getTransactions(transactions));
  };

export const getNewTransactionByHash =
  (transactionHash) => async (dispatch) => {
    const newTransaction = await axios({
      url: `http://192.168.0.116:3000/transaction/searchByHash/${transactionHash}/`,
      method: "get",
    }).then((response) => response.data.data);
    console.log("addNewTransaction(newTransaction)", newTransaction[0].hash);
    dispatch(addNewTransaction(newTransaction));
    setTimeout(() => {
      toast.success(`트랜잭션 : ${newTransaction[0].hash}`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }, 200);
  };

export const selectTransaction = (state) => state.transaction.transactions;
export const selectNewTransaction = (state) => state.transaction.newTransaction;
export default transactionSlice.reducer;
