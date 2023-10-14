import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const GEO_API_KEY = process.env.REACT_APP_GEO_API_KEY;

type WeatherData = {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
};

const fetchWeatherData = async (latitude: number, longitude: number) => {
  try {
    const response = await axios.get<WeatherData>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
    );
    // console.log('response', response);
    const cityName = await axios.get(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );
    // console.log('cityname', cityName);
    const newCityName = `${cityName.data[0].name} ${response.data.name}`; // Seoul Pungnap-tong
    const newResponse = { ...response.data, name: newCityName };

    return newResponse;
  } catch (err) {
    throw new Error('openweathermap API 통신 에러');
  }
};

const getLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

const GeocoderAPI = async (address: string) => {
  try {
    const URL =
      `/req/address?service=address` +
      `&request=getcoord&version=2.0` +
      `&address=` +
      encodeURI(address) +
      `&type=road&key=${GEO_API_KEY}`;
    const response = await axios.get(URL);
    //console.log(response.data.response.result.point);
    return response.data.response.result.point;
  } catch (err) {
    console.log(err);
  }
};

export { fetchWeatherData, getLocation, GeocoderAPI };
