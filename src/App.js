import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectRoute from "./components/ProtectRoute";
import { AuthContextProvider } from "./context/AuthContext";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import requests from "./components/Requests";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [search, setSearch] = useState("");
  const [popular, setPopular] = useState([]);

  useEffect(()=>{
    axios.get(requests.requestPopular).then((response)=>{
      setPopular(response.data.results);
    }).catch((err)=>{
      console.log(err)
    })
  }, [search])

  const searchFilter = popular.filter((item) => 
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
    <AuthContextProvider>
    <ToastContainer 
      className="text-gray-600"
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      limit={3}
      pauseOnHover={false}
    />
      <Navbar search={search} setSearch={setSearch} />

      <Routes>
        <Route path="/" element={<Home setSearch={setSearch} searchFilter={searchFilter} search={search} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/account" element={<ProtectRoute><Account /></ProtectRoute>} />
      </Routes>
    </AuthContextProvider>
    </>
    
  );
}

export default App;
