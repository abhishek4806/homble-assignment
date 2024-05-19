import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListingPage from './screens/ProductListingPage';
import ProductDetailsPage from './screens/ProductDetailsPage';
import Dashboard from "./screens/Dashboard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<ProductListingPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
