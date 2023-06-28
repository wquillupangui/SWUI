import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Popular } from '../../types/Popular';

interface PopularState {
  popularItems: { [key: string]: Popular };
}

const initialState: PopularState = {
  popularItems: {},
};


const storedData = localStorage.getItem('popularItems');
if (storedData) {
  initialState.popularItems = JSON.parse(storedData);
}

const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {
    incrementPopularItem: (state, action: PayloadAction<Popular>) => {
      const item = action.payload;
      if (state.popularItems[item.url]) {
        state.popularItems[item.url].count++;
      } else {
        state.popularItems[item.url] = item;
      }


      localStorage.setItem('popularItems', JSON.stringify(state.popularItems));
    },
  },
});

export const { incrementPopularItem } = popularSlice.actions;

export default popularSlice.reducer;