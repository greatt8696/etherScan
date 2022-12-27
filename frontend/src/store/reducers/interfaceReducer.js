import { createAction, createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const interfaceSlice = createSlice({
  name: "interface",

  initialState: {
    loading: true,
  },

  reducers: {
    onLoading: (state) =>
      produce(state, (draft) => {
        draft.loading = true;
      }),
    offLoading: (state) =>
      produce(state, (draft) => {
        draft.loading = false;
      }),
  },
});

export const { onLoading, offLoading } = interfaceSlice.actions;

// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const offLoadingDispatch = () => (dispatch) => {
  dispatch(offLoading());
};

export const selectLoading = (state) => state.interface.loading;

export default interfaceSlice.reducer;
