import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterText: '',
  searchText: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filterTitle: (state, action) => {
      state.filterText = action.payload;
    },
    searchTitle: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { filterTitle, searchTitle } = filterSlice.actions;