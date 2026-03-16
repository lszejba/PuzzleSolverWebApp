import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GriddlersPage from "./pages/GriddlersPage";
import SudokuPage from "./pages/SudokuPage";

function App() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <BrowserRouter>
        <nav className="flex justify-center items-center p-4">
          <h1>Puzzle Solver App</h1>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sudoku" element={<SudokuPage />} />
          <Route path="/griddlers" element={<GriddlersPage />} />
        </Routes>
        <footer className="flex justify-center items-center p-4">
          @2026 by Łukasz Szejba
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
