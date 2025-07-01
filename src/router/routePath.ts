export default {
  // ========================= GENERAL ROUTES =========================
  login: "/login",
  dashboard: "/",

  // ========================= PUBLIC ROUTES =========================
  aboutUs: "/about-us",
  customerBooking: "/:restaurantId/customer-booking",
  bookingConfirmed: "/:restaurantId/customer-booking/booking-confirmed",

  // ========================= USERS & ROLES =========================
  userManagement: "/users/user-management",
  roleManagement: "/users/role-management",

  // ========================= PRIVATE ROUTES =========================
  restaurants: "/restaurants",

  outlets: "/outlets",
  createOutlet: "/outlets/create",
  editOutlet: ({ id = ":id" }) => `/outlets/${id}/edit`,

  zones: `/zones`,
  createZone: "/zones/create",
  editZone: ({ id = ":id" }) => `/zones/${id}/edit`,
  zoneCanvas: ({ zoneId = ":zoneId" }) => `/zones/${zoneId}/canvas`,
};
