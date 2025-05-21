// src/router/AppRouter.tsx
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router"; // Use react-router-dom for JS BrowserRouter
import RootLayout from "@/components/RootLayout";

// Lazy load your pages
const CustomerViewPage = lazy(
  () =>
    import("@/pages/restaurants/[restaurantId]/areas/[areaId]/customer-view"),
);
const RestaurantsPage = lazy(() => import("@/pages/restaurants"));
const RestaurantDetailsPage = lazy(
  () => import("@/pages/restaurants/[restaurantId]"),
);
const AreaCanvasViewPage = lazy(
  () => import("@/pages/restaurants/[restaurantId]/areas/[areaId]/canvas"),
);

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <RootLayout>
        {/* Use Suspense to show a fallback while the page is loading */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/restaurants" />} />
            <Route
              path="/restaurants/:restaurantId/areas/:areaId/customer-view"
              element={<CustomerViewPage />}
            />
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route
              path="/restaurants/:id"
              element={<RestaurantDetailsPage />}
            />
            <Route
              path="/restaurants/:restaurantId/areas/:areaId/canvas"
              element={<AreaCanvasViewPage />}
            />
          </Routes>
        </Suspense>
      </RootLayout>
    </BrowserRouter>
  );
};

export default AppRouter;
