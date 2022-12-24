import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const createInputList = createAsyncThunk(
  "remember/createInputList",
  async ({ category, level }) => {
    const { data } = await import(`../../data/${category}`);
    let result = _.sampleSize(data, level);
    return { result, level };
  }
);

export const rememberSlice = createSlice({
  name: "remember",
  initialState: {
    inputList: {
      list: [],
      loading: false,
      error: false,
    },
    ansList: [],
    score: 0,
    retry: 0,
    playing: false,
  },
  reducers: {
    addToAnsList: (state, action) => {
      const value = action.payload;
      const success = state.inputList.list.includes(value.toLowerCase());
      success ? (state.score += 1) : (state.retry -= 1);
      state.ansList.push({
        key: Math.random(),
        success,
        data: value,
      });
    },
    cleanUpState: (state, action) => {
      state.inputList.list = [];
      state.ansList = [];
      state.score = 0;
      state.retry = 0;
      state.playing = false;
    },
  },
  extraReducers: {
    [createInputList.pending]: (state) => {
      state.inputList.loading = true;
      state.inputList.error = false;
    },
    [createInputList.fulfilled]: (state, action) => {
      state.playing = true;
      state.inputList.list = action.payload.result;
      state.retry = action.payload.level === "10" ? 3 : 2;
      state.inputList.loading = false;
    },
    [createInputList.rejected]: (state) => {
      state.inputList.loading = false;
      state.inputList.error = true;
    },
  },
});

export const { addToAnsList, cleanUpState } = rememberSlice.actions;
export default rememberSlice.reducer;
