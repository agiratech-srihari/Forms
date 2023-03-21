import React from "react";
import Home from '../pages/Home'
import DynamicArray from '../pages/DynamicArray'
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login'
import Signup from '../pages/Signup'


const RouterLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dynamicarray" element={<DynamicArray />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
};

export default RouterLayout;
