import { lazy } from "react";
import routePath from "../routePath";

const CustomerBookingPage = lazy(
  () => import("@/pages/public/customer-booking"),
);

const BookingConfirmPage = lazy(
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
        path: routePath.customerBooking,
        element: <CustomerBookingPage />,
      },

      {
        path: routePath.bookingConfirmed,
        element: <BookingConfirmPage />,
      },
    ],
  },
];
