import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import GalleryPage from './pages/GalleryPage';
import HomePage from './pages/HelloPage';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.DEV ? '/' : '/portfolio/'}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
