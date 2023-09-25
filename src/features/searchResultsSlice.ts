import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type cocktailListType = {
  [key: string]: string;
};

const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState: [] as cocktailListType[],
  reducers: {
    setSearchResults: (state, action: PayloadAction<cocktailListType[]>) => {
      return action.payload;
    },
  },
});

export const { setSearchResults } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
