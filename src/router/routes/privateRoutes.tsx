import { lazy } from "react";
import routePath from "../routePath";
import { ProtectedRoute } from "../ProtectedRoute";
import { Navigate } from "react-router";

// Lazy load private route components
export const privateRoutes = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [{ index: true, element: "hello" }],
  },
];
