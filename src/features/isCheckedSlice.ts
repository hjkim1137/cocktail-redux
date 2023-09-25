import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import CATEGORY from '../components/Category/Constant';

const isCheckedSlice = createSlice({
  name: 'isChecked',
  initialState: [...Object.values(CATEGORY)],
  reducers: {
    setIsChecked: (state, action: PayloadAction<string[]>) => {
      return action.payload;
    },
  },
});

export const { setIsChecked } = isCheckedSlice.actions;
export default isCheckedSlice.reducer;
