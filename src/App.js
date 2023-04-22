import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import './App.css';
import React from "react";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
// import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import Home from "./screens/Home";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Navbar from "./components/Navbar";

function App() {

  return (
    <Router>
      <Navbar/>
        <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route  path="/login" element={<Login/>}/>
          <Route  path="/createuser" element={<Signup/>}/>
        </Routes>
    </Router>
  );
}

export default App;
