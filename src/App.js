import "./App.css";
import Login from "./component/Main";
import Home from "./Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const uid = localStorage.getItem("uid");

  return (
    <BrowserRouter>
      <Routes>
        {uid ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
