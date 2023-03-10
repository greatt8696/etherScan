import { createSlice, combineReducers } from "@reduxjs/toolkit";
import blockReducer from "./blockReducer";
import transactionReducer from "./transactionReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  todos: userReducer,
  block: blockReducer,
  transaction: transactionReducer,
});

export default rootReducer;
