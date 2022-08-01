import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";


export const createInputList = createAsyncThunk('remember/createInputList', async ({category, level}) => {
  const {data} = await import(`../../data/${category}`);
  let result = _.sampleSize(data, level);
  return result;
})

export const rememberSlice = createSlice({
  name: 'remember',
  initialState: {
    inputList: {
      list: [],
      loading: false,
      error: false
    },
    ansList: [],
    score: 0,
    retry: 2,
    playing: false
  },
  reducers: {
    addToAnsList: (state, action) => {
      const value = action.payload;
      const success = state.inputList.list.includes(value);
      success ? state.score += 1 : state.retry -= 1;
      state.ansList.push({
        key: Math.random(),
        success,
        data: value
      });
    },
    cleanUpState: (state, action) => {
      state.inputList.list = [];
      state.ansList = [];
      state.score = 0;
      state.retry = 2;
      state.playing = false;
    }
  },
  extraReducers: {
    [createInputList.pending]: (state) => {
      state.inputList.loading = true;
      state.inputList.error = false;
    },
    [createInputList.fulfilled]: (state, action) => {
      state.inputList.list = action.payload;
      state.inputList.loading = false;
      state.playing = true;
    },
    [createInputList.rejected]: (state) => {
      state.inputList.loading = false;
      state.inputList.error = true;
    },
  }
})

export const { 
  addToAnsList
} = rememberSlice.actions;
export default rememberSlice.reducer;