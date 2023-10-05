import MainPage from "./pages/MainPage";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
