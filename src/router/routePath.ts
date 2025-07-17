export default {
  login: "/login",
  dashboard: "/",

  // ========================= PUBLIC ROUTES =========================
  aboutUs: "/about-us",
  // ========================= USERS & ROLES =========================
  userManagement: "/users/user-management",
  roleManagement: "/users/role-management",

  // ========================= PRIVATE ROUTES =========================
  properties: "/properties",
  layoutsConfigurations: "/configurations/layouts",

  customerBooking: () => `/customer-booking`,
  customerBooked: () => `/customer-booking/booked`,

  outlets: "/outlets",
  createOutlet: "/outlets/create",
  editOutlet: ({ id = ":id" }) => `/outlets/${id}/edit`,

  zones: `/zones`,
  createZone: "/zones/create",
  editZone: ({ id = ":id" }) => `/zones/${id}/edit`,
  zoneCanvas: ({ zoneId = ":zoneId", outletId = ":outletId" }) =>
    `/zones/${outletId}/${zoneId}/canvas`,
  zoneEmployeeView: ({ zoneId = ":zoneId" }) =>
    `/zones/${zoneId}/employee-view`,
};
