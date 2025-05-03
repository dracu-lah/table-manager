// src/router/AppRouter.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import CustomerView from "../pages/CustomerView";
import RestaurantsPage from "@/pages/restaurants";
import RestaurantDetailsPage from "@/pages/RestaurantDetailsPage";
import AreaCanvasView from "@/pages/AreaCanvasView"; // Import AreaCanvasView
import RootLayout from "@/components/RootLayout";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/restaurants" />} />
          <Route
            path="/restaurants/:restaurantId/areas/:areaId/customer-view"
            element={<CustomerView />}
          />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
          {/* Route for the Area Canvas View */}
          <Route
            path="/restaurants/:restaurantId/areas/:areaId/canvas"
            element={<AreaCanvasView />}
          />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
