import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import CreateUser from "../components/userComponent/CreateUser";
import RoleSetting from "../components/roleComponent/RoleSetting";
import Screen from "../components/screenComponent/Screen";
import Home from "./Home";
import "./style.scss";
import Login from "../components/Login";
import Dashboard from "./Dashboard";

export default function AuthProject() {
  // const [isLogged, setIsLogged] = useState(true);

  return (
    <>
      {/* {isLogged ? (
        <>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createuser" element={<CreateUser />} />
              <Route path="/rolesetting" element={<RoleSetting />} />
              <Route path="/screen" element={<Screen />} />
            </Routes>
          </div>
        </>
      ) : (
        <Login />
      )} */}

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="createuser" element={<CreateUser />} />
          <Route path="rolesetting" element={<RoleSetting />} />
          <Route path="screen" element={<Screen />} />
        </Route>
      </Routes>
    </>
  );
}
