import React from 'react';
// import LayoutCategory from '../Layout/LayoutCategory';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Contents from '../components/Category/Contents';
import AlcoholicOps from '../components/Category/AlcoholicOps';
import ScrollHandler from '../components/Category/ScrollHandler';
import LayoutCategory from '../Layout/LayoutCategory';

function Category() {
  return (
    <LayoutCategory>
      <Provider store={store}>
        <Contents />
        <AlcoholicOps />
        <ScrollHandler />
      </Provider>
    </LayoutCategory>
  );
}

export default Category;
