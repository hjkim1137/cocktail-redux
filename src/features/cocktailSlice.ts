import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import WGobject from '../components/Home/getCocktail/WGobject';
import { CocktailState, Cocktail } from './cocktailSlice.interface';

export const fetchCocktail = createAsyncThunk<Cocktail, string>(
  // createAsyncThunk(매개변수1, 매개변수2)
  // 매개변수1: Action Type을 나타내는 문자열로, 상태에 따른 Action Types를 만듦(pending, fulfilled, rejected)
  // 매개변수2: 비동기 결과를 포함한 Promise를 반환하는 콜백함수(async)- 첫 번째 매개변수로 payload(arg)를 받고, 두 번째 매개변수로 thunkAPI를 받음
  // 매개변수3: (옵션) dispatch, getState 등 thunk 함수에 전달되는 추가 옵션
  'cocktail/fetchCocktail',
  async (weatherName) => {
    try {
      const glassType: any = WGobject[weatherName];
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glassType}`
      );
      console.log('response:', response.headers.get('content-type')); // 오류라면: text/html 반환
      if (!response.ok) {
        throw new Error(
          `칵테일 데이터를 가져오는 데 실패했습니다: ${response.statusText}`
        );
      }
      // 트러블 슈팅:
      // 오류가 발생했습니다: SyntaxError: Unexpected token '<', "<br /> <b>"... is not valid JSON
      // [해결방법] 응답이 JSON 형식인지(application/json) 확인함 -> 아니라면 오류로 간주
      if (response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json();
        const cocktailArr = data.drinks;
        const randomIndex = Math.floor(Math.random() * cocktailArr.length);
        return cocktailArr[randomIndex];
      } else {
        console.error(
          '서버로부터 예상치 못한 응답을 받았습니다. 나중에 다시 시도해 주세요.'
        );
      }
    } catch (error) {
      console.error('오류가 발생했습니다:', error);
      throw error;
    }
  }
);

const initialState: CocktailState = {
  cocktailInfo: null,
  status: 'idle',
};

const cocktailSlice = createSlice({
  name: 'cocktail',
  initialState,
  reducers: {}, // 동기 작업
  extraReducers: (builder) => {
    // 비동기 작업
    builder
      .addCase(fetchCocktail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCocktail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cocktailInfo = action.payload;
      })
      .addCase(fetchCocktail.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default cocktailSlice.reducer;
