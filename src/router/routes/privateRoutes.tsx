import { lazy } from "react";
import { Navigate } from "react-router";
import routePath from "../routePath";
import { ProtectedRoute } from "../ProtectedRoute";

// Lazy-loaded components
const DashboardPage = lazy(() => import("@/pages/private/dashboard"));
const CustomerViewPage = lazy(
  () =>
    import(
      "@/pages/private/restaurants/[restaurantId]/areas/[areaId]/customer-view"
    ),
);

const EmployeeViewPage = lazy(
  () =>
    import(
      "@/pages/private/restaurants/[restaurantId]/areas/[areaId]/employee-view"
    ),
);
const RestaurantsPage = lazy(() => import("@/pages/private/restaurants"));
const OutletsPage = lazy(() => import("@/pages/private/outlets"));
const CreateOutletPage = lazy(
  () => import("@/pages/private/outlets/components/create"),
);

const EditOutletPage = lazy(
  () => import("@/pages/private/outlets/[outletId]/edit"),
);
const RestaurantDetailsPage = lazy(
  () => import("@/pages/private/restaurants/[restaurantId]"),
);

const ZonesPage = lazy(
  () => import("@/pages/private/outlets/[outletId]/zones"),
);

const ZonesCanvasPage = lazy(
  () => import("@/pages/private/outlets/[outletId]/zones/[zoneId]/canvas"),
);
const AreaCanvasViewPage = lazy(
  () =>
    import("@/pages/private/restaurants/[restaurantId]/areas/[areaId]/canvas"),
);

const UserManagementPage = lazy(
  () => import("@/pages/private/users/user-management"),
);
const RolePage = lazy(() => import("@/pages/private/users/role-management"));
const ManageRolePage = lazy(
  () => import("@/pages/private/users/role-management/slug"),
);

// Private routes definition
export const privateRoutes = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <DashboardPage /> },
      {
        index: true,
        element: <Navigate to={routePath.restaurants} replace />,
      },
      {
        path: routePath.restaurantCustomerView,
        element: <CustomerViewPage />,
      },

      {
        path: routePath.restaurantEmployeeView,
        element: <EmployeeViewPage />,
      },

      {
        path: routePath.outlets,
        children: [
          {
            index: true,
            element: <OutletsPage />,
          },

          {
            path: routePath.createOutlet,
            element: <CreateOutletPage />,
          },
          {
            path: routePath.editOutlet({}),
            element: <EditOutletPage />,
          },
        ],
      },

      {
        path: routePath.zones,
        children: [
          {
            index: true,
            element: <ZonesPage />,
          },

          {
            path: routePath.zoneCanvas({}),
            element: <ZonesCanvasPage />,
          },
        ],
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

      {
        path: routePath.userManagement,
        children: [
          {
            index: true,
            element: <UserManagementPage />,
          },
        ],
      },
      {
        path: routePath.roleManagement,
        children: [
          {
            index: true,
            element: <RolePage />,
          },
          {
            path: ":id",
            element: <ManageRolePage />,
          },
        ],
      },
    ],
  },
];
