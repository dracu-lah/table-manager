// src/router/AppRouter.tsx
import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router"; // Import necessary components
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

// Define your routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Use RootLayout as the root element
    children: [
      // Define nested routes within RootLayout
      {
        index: true, // This route will match at the root path ("/")
        element: <Navigate to="/restaurants" replace />, // Redirect to /restaurants
      },
      {
        path: "/restaurants/:restaurantId/areas/:areaId/customer-view",
        element: (
          <Suspense fallback={<div>Loading Customer View...</div>}>
            <CustomerViewPage />
          </Suspense>
        ),
      },
      {
        path: "/restaurants",
        element: (
          <Suspense fallback={<div>Loading Restaurants...</div>}>
            <RestaurantsPage />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:id",
        element: (
          <Suspense fallback={<div>Loading Restaurant Details...</div>}>
            <RestaurantDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:restaurantId/areas/:areaId/canvas",
        element: (
          <Suspense fallback={<div>Loading Area Canvas...</div>}>
            <AreaCanvasViewPage />
          </Suspense>
        ),
      },
      // Add a catch-all route for 404 (optional)
      {
        path: "*",
        element: <div>404 Not Found</div>,
      },
    ],
  },
]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
