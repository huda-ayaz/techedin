import "./App.css";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
