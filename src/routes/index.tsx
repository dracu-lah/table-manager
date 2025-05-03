import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import AreaManager from "../pages/AreaManager";
import CustomerView from "../pages/CustomerView";
import RestaurantsPage from "@/pages/restaurants";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AreaManager />} />
        <Route path="/customer-view" element={<CustomerView />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
