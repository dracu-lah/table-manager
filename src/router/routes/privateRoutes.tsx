import { lazy } from "react";
import routePath from "../routePath";
import { ProtectedRoute } from "../ProtectedRoute";
import { Navigate } from "react-router";
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
// Lazy load private route components
export const privateRoutes = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: "hello" },
      // Define nested routes within RootLayout
      {
        index: true, // This route will match at the root path ("/")
        element: <Navigate to="/restaurants" replace />, // Redirect to /restaurants
      },
      {
        path: "/restaurants/:restaurantId/areas/:areaId/customer-view",
        element: <CustomerViewPage />,
      },
      {
        path: "/restaurants",
        element: <RestaurantsPage />,
      },
      {
        path: "/restaurants/:id",
        element: <RestaurantDetailsPage />,
      },
      {
        path: "/restaurants/:restaurantId/areas/:areaId/canvas",
        element: <AreaCanvasViewPage />,
      },
    ],
  },
];
