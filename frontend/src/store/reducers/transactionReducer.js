import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import produce, { original } from "immer";
import { toast } from "react-toastify";
import { baseUriConfig } from "../../../baseUriConfig";

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
      url: `http://${baseUriConfig}:3000/transaction/page/${page}/`,
      method: "get",
    }).then((response) => response.data.data);
    dispatch(getTransactions(transactions));
  };

export const getNewTransactionByHash =
  (transactionHash) => async (dispatch) => {
    setTimeout(async () => {
      const newTransaction = await axios({
        url: `http://${baseUriConfig}:3000/transaction/searchByHash/${transactionHash}/`,
        method: "get",
      }).then((response) => response.data.data);
      console.log("addNewTransaction(newTransaction)", newTransaction[0].hash);
      dispatch(addNewTransaction(newTransaction));
    }, 500);
  };

export const selectTransaction = (state) => state.transaction.transactions;
export const selectNewTransaction = (state) => state.transaction.newTransaction;
export default transactionSlice.reducer;
