import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HelloPage";
import ContactPage from "./pages/ContactPage";
import AboutMePage from "./pages/AboutMePage";
import ProductsPage from "./pages/ProductsPage";
import ArticlesPage from "./pages/ArticlesPage.tsx";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.DEV ? "/" : "/portfolio/"}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/aboutme" element={<AboutMePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
