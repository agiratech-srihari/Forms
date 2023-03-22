import React, { Suspense } from "react";
import Home from '../pages/Home'
import DynamicArray from '../pages/DynamicArray'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Layout from "../Layout/Layout";
// import { Hidden } from "@mui/material";


const RouterLayout = () => {
  return (
    <Suspense fallback={<div style={{ height: '100vh', width: "100%", overflow: "hidden", display: "flex", justifyContent: 'center', alignItems: 'center' }}>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to='/home' replace/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/dynamicarray" element={<DynamicArray />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes >
    </Suspense>
  );
};

export default RouterLayout;
