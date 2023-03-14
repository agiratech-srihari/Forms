import React from "react";
import Home from '../pages/Home'
import DynamicArray from '../pages/DynamicArray'
import { Routes, Route } from "react-router-dom";

const RouterLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
      </Route>
        <Route path="/dynamicarray" element={<DynamicArray />} />
    </Routes>
  );
};

export default RouterLayout;
