import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import { useState } from "react";
export default function Navbar(props) {
  const [cartView, setCartView] = useState(false)
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  const loadCart=()=>{
    setCartView(true)
  }
  const items=useCart();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark  bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="#">
            MealMile
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link active fs-4" aria-current="page" to="/">
                Home
              </Link>
              {localStorage.getItem("authToken") ? (
                <Link className="nav-link active fs-4" aria-current="page" to="/myOrder">
                  My Orders
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="d-flex ">
            {!localStorage.getItem("authToken") ? (
              <div>
                <Link className="btn bg-white text-success mx-2" to="/login">
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-2"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success mx-2" onClick={loadCart}
                >
                  Cart{" "}
                  <Badge pill bg="danger">{items.length===0?"":items.length}</Badge>
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  LogOut
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
