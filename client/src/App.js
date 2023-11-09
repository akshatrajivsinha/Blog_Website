import React from "react";
import Topbar from "./components/topbar/topbar";
import Home from "./pages/home/home.jsx"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Single from "./pages/single/single";
import Write from "./pages/write/write.jsx";
import Register from "./pages/register/Register.jsx";
import Login from "./pages/login/Login";
import Userpage from "./pages/userpage/Userpage";

import Search from "./pages/search/Search";

function App() {
  return (
    <Router>
      <Topbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/:id" element={<Single />}/>
        <Route path="/write" element={<Write />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/userpage/:id" element={<Userpage />}/>
        <Route path="/search" element={<Search />}/>
      </Routes> 
      
      
      
    </Router>
   
  );
}

export default App;
