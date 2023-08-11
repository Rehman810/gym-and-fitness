import "./App.css";
import Login from "./component/Main";
import Home from "./Home/Home";
import Add from "./Home/Create";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverDue from "./Home/OverDue";

function App() {
  const uid = localStorage.getItem("uid");

  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Add />} />
          <Route path="/login" element={<Login />} />
          <Route path="/overDue" element={<OverDue />} />
        </>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
