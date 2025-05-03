// src/router/AppRouter.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router"; // Corrected import
import AreaManager from "../pages/AreaManager";
import CustomerView from "../pages/CustomerView";
import RestaurantsPage from "@/pages/restaurants";
import RootLayout from "@/components/RootLayout"; // Import the RootLayout

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <RootLayout>
        {" "}
        {/* Wrap your Routes with RootLayout */}
        <Routes>
          {/* Consider if AreaManager should be the landing page or under restaurants */}
          <Route path="/" element={<AreaManager />} />
          <Route path="/customer-view" element={<CustomerView />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          {/* Add a route for individual restaurant details */}
          {/* <Route */}
          {/*   path="/restaurants/:id" */}
          {/*   element={<RestaurantDetailsPage />} */}
          {/* />{" "} */}
          {/* Assuming you have this */}
        </Routes>
      </RootLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
