import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";

export default function Navbar() {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  return (
    <nav className="sidebar">
      <div className="text">LOGO</div>
      <ul>
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <div
            className="serv-btn"
            onClick={() => {
              setShow(!show);
            }}
          >
            User Setting
            <span
              className={`fas fa-caret-down second ${show ? "rotate" : null}`}
            ></span>
          </div>
          <ul className={`serv-show ${show ? `show1` : null}`}>
            <li>
              <Link to="createuser">Create User</Link>
            </li>
            <li>
              <Link to="rolesetting">Role Setting</Link>
            </li>
            <li>
              <Link to="screen">Screen Setup</Link>
            </li>
          </ul>
        </li>

        <div className="logout-btn-container">
          <button
            className="logout-btn"
            onClick={() => {
              navigate("/");
              localStorage.clear()
            }}
          >
            Logout
          </button>
        </div>
      </ul>
    </nav>
  );
}
