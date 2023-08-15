import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashbaord from "./pages/Dashbaord";
import { useEffect, useState } from "react";
import NotFoundPage from "./pages/NotFoundPage";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(()=>{
    const jwtToken = localStorage.getItem("jwtToken")
    if(jwtToken){
      setIsLoggedIn(true)
    }
  },[])
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
        <Route path="/dashboard" element={<Dashbaord />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
