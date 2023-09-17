import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showByGenre: 'all',
  searchKeyword: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setGenre: (state, action) => {
      state.showByGenre = action.payload;
    },
    setSearch: (state, action) => {
      state.searchKeyword = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const { setGenre, setSearch } = filterSlice.actions;
