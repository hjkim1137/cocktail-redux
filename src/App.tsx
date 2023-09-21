import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Category from './pages/Category';
import Detail from './pages/Detail';
import Game from './pages/Game';
import Landing from './pages/Landing';
import Random from './pages/Random';
import Weather from './pages/Weather';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/category" element={<Category />} />
        <Route path="/random" element={<Random />} />
        <Route path="/game" element={<Game />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
