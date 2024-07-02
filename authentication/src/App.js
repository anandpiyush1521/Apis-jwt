import logo from "./logo.svg";
import "./App.css";
import { BrowseRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Confirm from "./pages/Confirm";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm" element={<ProtectedRoute Component={Confirm} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
