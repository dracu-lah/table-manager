export default {
  // ========================= GENERAL ROUTES =========================
  login: "/login",
  dashboard: "/",

  // ========================= PUBLIC ROUTES =========================
  aboutUs: "/about-us",

  // ========================= USERS & ROLES =========================
  userManagement: "/users/user-management",
  roleManagement: "/users/role-management",

  // ========================= PRIVATE ROUTES =========================
  restaurants: "/restaurants",
  restaurantDetails: "/restaurants/:id",
  restaurantCustomerView:
    "/restaurants/:restaurantId/areas/:areaId/customer-view",
  restaurantCanvasView: "/restaurants/:restaurantId/areas/:areaId/canvas",
};
