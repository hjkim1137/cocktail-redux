/**
 * 랜덤으로 칵테일 하나를 반환하는 API 통신을 진행하는 함수
 * @returns 랜덤으로 선택된 칵테일 하나의 정보를 담은 배열
 */
export async function getRandomCockTail() {
  try {
    const res = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    );

    const response = await res.json();

    // return response.drinks;
    return response.drinks[0];
  } catch (err) {
    throw new Error('랜덤 칵테일 API 통신 에러');
  }
}

// glassType에 따른 랜덤 칵테일 하나를 반환하는 API 통신을 진행하는 함수
export async function getGlassTypeAPI(glassType: string) {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glassType}`
    );
    if (!response.ok) {
      throw new Error(
        `칵테일 데이터를 가져오는 데 실패했습니다: ${response.statusText}`
      );
    }
    if (response.headers.get('content-type')?.includes('application/json')) {
      // const contentType = response.headers.get('content-type');
      // console.log('contentType', contentType); // application.json
      const data = await response.json();
      const cocktailArr = data.drinks;
      return cocktailArr;
    } else {
      console.error(
        '서버로부터 예상치 못한 응답을 받았습니다. 나중에 다시 시도해 주세요.'
      );
    }
  } catch (error) {
    console.error(
      '서버와 통신에 실패하였습니다. 나중에 다시 시도해주세요.',
      error
    );
    throw error;
  }
}

/**
 * 칵테일의 카테고리 목록을 반환하는 API 통신을 진행하는 함수
 * @returns 카테고리 목록에 대한 정보를 담은 배열
 */
export async function getCateogry() {
  try {
    const res = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    );

    const response = await res.json();

    return response.drinks;
  } catch (err) {
    throw new Error('카테고리 목록 API 통신 에러');
  }
}

/**
 * 칵테일의 알코올 여부 목록을 반환하는 API 통신을 진행하는 함수
 * @returns 알코올 여부 목록에 대한 정보를 담은 배열
 */
export async function getAlcoholState() {
  try {
    const res = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list'
    );

    const response = await res.json();

    return response.drinks;
  } catch (err) {
    throw new Error('알코올 여부 목록 API 통신 에러');
  }
}

/**
 * 알파벳을 이용하여 전체 칵테일 정보를 반환하는 API 통신을 진행하는 함수
 * @returns 전체 칵테일 정보를 담고 있는 배열
 */
export async function getWholeCocktailUsingAlphabet() {
  let wholeCocktail: any[] = [];

  const alphabet = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  try {
    const response = await Promise.all(
      alphabet.map((item) => {
        return fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${item}`
        );
      })
    );

    await Promise.all(
      response.map(async (res) => {
        const json = await res.json();

        if (json.drinks !== null) {
          wholeCocktail.push(...json.drinks);
        }
      })
    );

    return wholeCocktail;
  } catch (err) {
    throw new Error('전체 데이터 fetch 중 에러 발생');
  }
}

/**
 * 유저가 선택한 옵션을 반영하여 랜덤 칵테일을 생성하는 함수
 * @param categoryOpt 카테고리 옵션
 * @param alcoholOpt 알코올 여부 옵션
 * @returns 모든 옵션을 만족하는 칵테일 정보
 */
export async function getRandomCocktailWithFavour(
  categoryOpt: string,
  alcoholOpt: string
) {
  if (categoryOpt === 'All' && alcoholOpt !== 'All') {
    try {
      const wholeCocktail = await getWholeCocktailUsingAlphabet();

      const filteredCocktail = wholeCocktail.filter(
        (cocktail) => cocktail.strAlcoholic === alcoholOpt
      );

      return makeRandomCocktailWithOption(filteredCocktail);
    } catch (err) {
      throw new Error('취향 반영 랜덤 칵테일 생성 중 에러 발생');
    }
  }

  if (categoryOpt !== 'All' && alcoholOpt === 'All') {
    try {
      const wholeCocktail = await getWholeCocktailUsingAlphabet();

      const filteredCocktail = wholeCocktail.filter(
        (cocktail) => cocktail.strCategory === categoryOpt
      );

      return makeRandomCocktailWithOption(filteredCocktail);
    } catch (err) {
      throw new Error('취향 반영 랜덤 칵테일 생성 중 에러 발생');
    }
  }

  try {
    const wholeCocktail = await getWholeCocktailUsingAlphabet();

    const filteredCocktail = wholeCocktail.filter(
      (cocktail) =>
        cocktail.strCategory === categoryOpt &&
        cocktail.strAlcoholic === alcoholOpt
    );

    return makeRandomCocktailWithOption(filteredCocktail);
  } catch (err) {
    throw new Error('취향 반영 랜덤 칵테일 생성 중 에러 발생');
  }
}

/**
 * 옵션이 적용되어 필터링된 칵테일 중 랜덤으로 하나를 골라 반환하는 함수
 * @param filteredCocktail 옵션이 적용되어 필터링된 칵테일 배열
 * @returns 랜덤으로 선택된 칵테일 데이터 하나
 */
async function makeRandomCocktailWithOption(filteredCocktail: any) {
  const randomIndex = Math.floor(Math.random() * filteredCocktail.length);

  return filteredCocktail[randomIndex];
}

function getRandomCocktails(drinks: any[], count: number): any[] {
  const randomIndices: number[] = [];
  const randomCocktails = [];

  while (randomIndices.length < count) {
    const randomIndex = Math.floor(Math.random() * drinks.length);
    if (!randomIndices.includes(randomIndex)) {
      // 중복 체크
      randomIndices.push(randomIndex);
      randomCocktails.push(drinks[randomIndex].strDrink);
    }
  }

  return randomCocktails; // 랜덤 칵테일 배열 반환
}

/**
 * glass 옵션으로 칵테일 받아오기 - 날씨 관련
 */
async function getCocktailWithWeather(mainWeather: string) {
  const weatherToDrinkMap = new Map<string, string>([
    ['Thunderstorm', 'Coffee_mug'],
    ['Tornado', 'Coffee_mug'],
    ['Rain', 'Coffee_mug'],
    ['Squall', 'Coffee_mug'],
    ['Drizzle', 'Collins_glass'],
    ['Mist', 'Collins_glass'],
    ['Smoke', 'Collins_glass'],
    ['Fog', 'Collins_glass'],
    ['Haze', 'Collins_glass'],
    ['Snow', 'Irish_coffee_cup'],
    ['Clear', 'Cocktail_glass'],
    ['Clouds', 'Highball_glass'],
    ['Dust', 'Highball_glass'],
    ['Sand', 'Highball_glass'],
    ['Ash', 'Highball_glass'],
  ]);

  try {
    const glassOption = weatherToDrinkMap.get(mainWeather);
    if (glassOption) {
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glassOption}`
      );
      const response = await res.json();
      return response.drinks;
    }
  } catch (err) {
    throw new Error('Glass 옵션 칵테일 API 통신 에러');
  }
}

export { getCocktailWithWeather };
/**
 * 해당 칵테일의 모든 정보를 반환하는 함수
 * @param id 칵테일 id
 * @returns 칵테일 상세정보
 */
export async function getCocktailDescription(id: number) {
  const drink = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  )
    .then((res) => res.json())
    .then((data) => data.drinks[0])
    .catch((e) => console.log('Error: ', e));

  console.log(drink);
  return drink;
}

/**
 * 해당 칵테일에 들어가는 재료 및 재료량을 반환하는 함수
 * @param id 칵테일 id
 * @returns 칵테일 재료, 재료량
 */
export async function getCocktailIngredients(id: number) {
  const drink = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  )
    .then((res) => res.json())
    .then((data) => data.drinks[0])
    .catch((e) => console.log('Error: ', e));

  const ingredients = [];
  const measures = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    if (ingredient) {
      ingredients.push(ingredient);
      measures.push(measure);
    }
  }
  return { ingredients, measures };
}

/**
 * 해당 재료의 이미지를 반환하는 함수
 * @param name 재료 name
 * @returns 재료 이미지
 */
export async function getIngredientImg(name: string) {
  const img = await fetch(
    `https://www.thecocktaildb.com/images/ingredients/${name}.png`
  ).then((data) => data.url);

  return img;
}

export type QuizQuestion = {
  id: string; // 고유한 질문 ID
  cocktail: {
    idDrink: string; // 칵테일 ID
    strDrink: string; // 칵테일 이름
    strInstructions: string; // 칵테일 조리 방법
    strDrinkThumb: string; // 칵테일 이미지 URL
  };
  choices: any[]; // 선택지 배열 (칵테일 이름으로 구성)
  answer: string; // 정답 칵테일 이름
};

export async function fetchQuestions(): Promise<QuizQuestion[]> {
  const cocktailResponse = await getWholeCocktailUsingAlphabet();
  const quizQuestions: QuizQuestion[] = [];

  for (let i = 0; i < 4; i++) {
    const cocktail = cocktailResponse[i];
    const choices = getRandomCocktails(cocktailResponse, 3);
    quizQuestions.push({
      id: i.toString(),
      cocktail: {
        idDrink: cocktail.idDrink,
        strDrink: cocktail.strDrink,
        strInstructions: cocktail.strInstructions,
        strDrinkThumb: cocktail.strDrinkThumb,
      },
      choices: [...choices, cocktail.strDrink],
      answer: cocktail.strDrink,
    });
  }

  return quizQuestions;
}
