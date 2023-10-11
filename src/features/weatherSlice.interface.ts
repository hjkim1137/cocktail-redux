// weather state 세부 요소들을 weatherInfo 라는 한 개 단위로 묶음
export interface WeatherState {
  weatherInfo: WeatherType | null; // weatherType 또는 null 형식
}

export interface WeatherType {
  name: string; // 지역명
  main: {
    temp: number;
  };
  weather: {
    main: any; // 날씨(영문)
    description: string; // 날씨(국문)
    icon: string; // 날씨 아이콘
  }[];
}
