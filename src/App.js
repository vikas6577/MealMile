import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import Home from "./screens/Home";
import Login from "./screens/Login";

function App() {

  return (
    <Router>
        <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route  path="/login" element={<Login/>}/>
        </Routes>
    </Router>
  );
}

export default App;
