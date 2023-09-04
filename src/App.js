import "./App.css";
import Login from "./component/Main";
import Home from "./component/Home";
import Add from "./Home/Create";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverDue from "./Home/OverDue";
import Protected from "./component/Protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route path="/" element={<Protected Component={Home} />} />
          <Route path="/create" element={<Protected Component={Add} />} />
          <Route path="/overDue" element={<Protected Component={OverDue} />} />
          <Route path="/login" element={<Login />} />
        </>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
