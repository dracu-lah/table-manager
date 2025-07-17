import { lazy } from "react";
import routePath from "../routePath";

const CustomerBookingPage = lazy(
  () => import("@/pages/public/customer-booking"),
);

const CustomerBookedPage = lazy(
  () => import("@/pages/public/customer-booking/booking-confirmed"),
);
export const publicRoutes = [
  {
    path: "/",
    children: [
      // {
      //   path: routePath.aboutUs,
      //   element: <AboutPage />,
      // },
      {
        path: routePath.customerBooking(),
        children: [
          {
            index: true,
            element: <CustomerBookingPage />,
          },
          {
            path: routePath.customerBooked(),
            element: <CustomerBookedPage />,
          },
        ],
      },
    ],
  },
];
