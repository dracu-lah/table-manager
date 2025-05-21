// src/router/AppRouter.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import CustomerViewPage from "@/pages/restaurants/[restaurantId]/areas/[areaId]/customer-view";
import RestaurantsPage from "@/pages/restaurants";
import RestaurantDetailsPage from "@/pages/restaurants/[restaurantId]";
import AreaCanvasView from "@/pages/restaurants/[restaurantId]/areas/[areaId]/canvas"; // Import AreaCanvasView
import RootLayout from "@/components/RootLayout";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/restaurants" />} />
          <Route
            path="/restaurants/:restaurantId/areas/:areaId/customer-view"
            element={<CustomerViewPage />}
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
