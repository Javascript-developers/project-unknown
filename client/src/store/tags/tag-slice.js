import { createSlice } from '@reduxjs/toolkit';

const tagSlice = createSlice({
  name: 'tag',
  initialState: {},
  reducers: {},
});

export const tagActions = tagSlice.actions;
export default tagSlice.reducer;
