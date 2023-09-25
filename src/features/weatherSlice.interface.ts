export interface WeatherType {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: any;
    description: string;
    icon: string;
  }[];
}

export interface WeatherState {
  weatherInfo: WeatherType | null;
}
