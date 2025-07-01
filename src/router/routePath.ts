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
  restaurantDetails: "/restaurants/:id",
  restaurantCustomerView:
    "/restaurants/:restaurantId/areas/:areaId/customer-view",

  restaurantEmployeeView:
    "/restaurants/:restaurantId/areas/:areaId/employee-view",
  restaurantCanvasView: "/restaurants/:restaurantId/areas/:areaId/canvas",

  outlets: "/outlets",
  createOutlet: "/outlets/create",
  editOutlet: ({ id = ":id" }) => `/outlets/${id}/edit`,

  zones: ({ id = ":id" }) => `/outlets/${id}/zones`,
  zoneCanvas: ({ outletId = ":outletId", zoneId = ":zoneId" }) =>
    `/outlets/${outletId}/zones/${zoneId}/canvas`,
};
