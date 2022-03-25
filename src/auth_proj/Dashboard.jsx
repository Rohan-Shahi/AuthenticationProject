import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('token')) {
      navigate('/');
    }
  },[])
 

  return (
    <>
      <Navbar />
      <div className="content">
        {/* {localStorage.getItem('token') ? <Outlet/> : <Navigate to=''/>} */}
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
