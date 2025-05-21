import { lazy } from "react";
import { Navigate } from "react-router";
import routePath from "../routePath";
import { ProtectedRoute } from "../ProtectedRoute";

// Lazy-loaded components
const CustomerViewPage = lazy(
  () =>
    import(
      "@/pages/private/restaurants/[restaurantId]/areas/[areaId]/customer-view"
    ),
);
const RestaurantsPage = lazy(() => import("@/pages/private/restaurants"));
const RestaurantDetailsPage = lazy(
  () => import("@/pages/private/restaurants/[restaurantId]"),
);
const AreaCanvasViewPage = lazy(
  () =>
    import("@/pages/private/restaurants/[restaurantId]/areas/[areaId]/canvas"),
);

// Private routes definition
export const privateRoutes = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: "hello" },
      {
        index: true,
        element: <Navigate to={routePath.restaurants} replace />,
      },
      {
        path: routePath.restaurantCustomerView,
        element: <CustomerViewPage />,
      },
      {
        path: routePath.restaurants,
        element: <RestaurantsPage />,
      },
      {
        path: routePath.restaurantDetails,
        element: <RestaurantDetailsPage />,
      },
      {
        path: routePath.restaurantCanvasView,
        element: <AreaCanvasViewPage />,
      },
    ],
  },
];
