import { createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import produce, { original } from "immer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseUriConfig } from "../../../baseUriConfig";

export const blockSlice = createSlice({
  name: "block",
  initialState: { blocks: [], newBlock: {} },

  reducers: {
    getBlocks: (state, action) =>
      produce(state, (draft) => {
        draft.blocks = action.payload;
        console.log(draft.blocks);
      }),

    addNewBlock: (state, action) =>
      produce(state, (draft) => {
        const newBlock = action.payload[0];
        const prevBlocks = original(state.blocks);
        const blocksExceptLast = prevBlocks.slice(0, -1);
        const updatedBlocks = [newBlock, ...blocksExceptLast];
        draft.blocks = updatedBlocks;
        draft.newBlock = newBlock;
      }),
  },
});

export const { getBlocks, addNewBlock } = blockSlice.actions;

export const getBlocksByPage =
  (page = 1) =>
  async (dispatch) => {
    const blocks = await axios({
      url: `http://${baseUriConfig}:3000/block/page/${page}/`,
      method: "get",
    }).then((response) => response.data.data);
    dispatch(getBlocks(blocks));
  };

export const getNewBlockByNumber = (blockNumber) => async (dispatch) => {
  setTimeout(async () => {
    const newBlock = await axios({
      url: `http://${baseUriConfig}:3000/block/${blockNumber}/`,
      method: "get",
    }).then((response) => response.data.data);
    dispatch(addNewBlock(newBlock));
  }, 600);
};

export const selectBlock = (state) => state.block.blocks;
export const selectNewBlock = (state) => state.block.newBlock;
export default blockSlice.reducer;
