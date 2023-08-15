import { Route, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Home from "./components/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashbaord from "./pages/Dashbaord";
import { useEffect, useState } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import toast from "react-hot-toast";
import { backendUrl } from "./config/config";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [data, setData] = useState()

  useEffect(()=>{
    const jwtToken = localStorage.getItem("jwtToken")
    if(jwtToken){
      setIsLoggedIn(true)
    }

    async function fetchData(){
      try {
        const response = await axios.get(
          `${backendUrl}/user/dashboard`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response){
          setData(response.data.data)
        }

      } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error.message)
      }
    }

    fetchData()


  },[])
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <Navbar data={data} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
        <Route path="/dashboard" element={<Dashbaord data={data} />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
