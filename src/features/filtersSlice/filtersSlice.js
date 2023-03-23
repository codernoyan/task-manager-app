import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: '',
  filteredProjects: [
    'Scoreboard',
    'Flight Booking',
    'Product Cart',
    'Book Store',
    'Blog Application',
    'Job Finder'
  ],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    searchTitle: (state, action) => {
      state.searchText = action.payload;
    },
    filterProject: (state, action) => {
      const indexToFilter = state.filteredProjects.findIndex((project) => project === action.payload);
      if (indexToFilter !== -1) {
        state.filteredProjects.splice(indexToFilter, 1);
      } else {
        state.filteredProjects.push(action.payload);
      }
    }
  },
});

export default filterSlice.reducer;
export const { searchTitle, filterProject } = filterSlice.actions;