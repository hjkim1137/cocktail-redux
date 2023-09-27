import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Category from './pages/Category';
import Detail from './pages/Detail';
import Game from './pages/Game';
import Home from './pages/Home';
import Random from './pages/Random';
import Weather from './pages/Weather';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/random" element={<Random />} />
          <Route path="/game" element={<Game />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
