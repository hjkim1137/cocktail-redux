export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface CocktailState {
  cocktailInfo: Cocktail | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
