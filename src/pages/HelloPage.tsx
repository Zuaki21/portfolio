import { useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom"; // ← 追加
import reactLogo from "src/assets/react.svg";
import viteLogo from "src/assets/vite.svg";
import "src/App.css";

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate(); // ← 追加

  return (
    <>
      <Header />
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <p>
          Edit <code>src/pages/Hello.tsx</code> and save to test HMR
        </p>

        {/* ここに Gallery へ遷移するボタンを追加 */}
        <button
          onClick={() => navigate("/gallery")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          AboutMeへ移動
        </button>
        <button
          onClick={() => navigate("/gallery")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Productへ移動
        </button>
        <button
          onClick={() => navigate("/gallery")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Galleryへ移動
        </button>
        <button
          onClick={() => navigate("/gallery")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Articlesへ移動
        </button>
        <button
          onClick={() => navigate("/gallery")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Contactへ移動
        </button>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
