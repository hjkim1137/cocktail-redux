import React from 'react';
import Layout from '../Layout/Layout';
import { SearchAddress } from '../components/Weather/SearchAddress';
import { GetWeather } from '../components/Weather/GetWeather';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import CWLayout from '../Layout/CWLayout';

function Weather() {
  return (
    <Provider store={store}>
      <CWLayout>
        <GetWeather></GetWeather>
      </CWLayout>
    </Provider>
  );
}

export default Weather;
