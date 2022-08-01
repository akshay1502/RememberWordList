import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";


export const createInputList = createAsyncThunk('remember/createInputList', async ({fileName, number}) => {
  const {data} = await import(`../../data/${fileName}`);
  let randomData = _.sampleSize(data, 5);
  let result = randomData.map(data => ({
    key: Math.random(),
    data
  }))
  return result;
})

export const rememberSlice = createSlice({
  name: 'remember',
  initialState: {
    pending: false,
    error: false,
    inputList: [],
    ansList: [],
    score: 0,
    retry: 2
  },
  reducers: {
    addToInputList: (state, action) => {
      const data = action.payload;
      const condition = state.inputList.some((obj) => obj.data === data);
      const maxlength = state.inputList.length < 10;
      if(!condition && maxlength) {
        state.inputList.push({
          key: Date.now(),
          data: action.payload
        })
      } else if (!maxlength) {
        alert("Maximum 10 words are allowed. You have reached max limit. You can play the game now.")
      }else {
        alert("Duplicate words are not allowed.")
      }
    },
    removeFromInputList: (state, action) => {
      state.inputList = state.inputList.filter((obj) => obj.key !== action.payload);
    },
    addToAnsList: (state, action) => {
      const success = state.inputList.some((obj) => obj.data === action.payload);
      success ? state.score += 1 : state.retry -= 1;
      if (state.retry >= 0) {
        state.ansList.push({
          key: Date.now(),
          success,
          data: action.payload
        })
      } else {
        alert('You lost');
      }
    },
  },
  extraReducers: {
    [createInputList.pending]: (state) => {
      state.pending = true;
      state.error = false;
    },
    [createInputList.fulfilled]: (state, action) => {
      state.inputList = action.payload;
      state.pending = false;
    },
    [createInputList.rejected]: (state) => {
      state.pending = false;
      state.error = true;
    },
  }
})

export const { 
  addToInputList, removeFromInputList, addToAnsList
} = rememberSlice.actions;
export default rememberSlice.reducer;