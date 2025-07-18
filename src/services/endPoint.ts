export default {
  // ========================= AUTH APIS =========================
  login: "/api/auth/login",
  register: "/api/User/Account/RegisterUser",
  assignUser: "/api/User/Account/CreateUserRole",
  refresh: "/api/User/Account/GetAccessToken",
  changePassword: "/api/Admin/Account/UpdateUserPassword",

  // ========================= MENU APIS =========================
  getMenus: "/api/Admin/Role/GetMenuItems",
  updateMenus: "/api/Admin/Role/UpdateMenuItems",
  // ========================= DASHBOARD APIS =========================
  getDashboardData: "/api/Admin/Reports/GetDashboardDisplayData",

  // ========================= USER MANAGEMENT APIS =========================
  getUsers: "/api/User/Account/SearchUsers",
  updateUserPassword: "/api/User/Account/UpdateUserPasswordFromCMS",

  // ========================= ROLE MANAGEMENT APIS =========================
  registerRole: "/api/User/Account/CreateRole",
  getRoles: "/api/User/Account/SearchRoles",

  // ========================= PROPERTY  MANAGEMENT APIS =========================
  property: "/api/properties",
  // ========================= OUTLET  MANAGEMENT APIS =========================
  outets: "/api/outlets",

  // ========================= ZONE  MANAGEMENT APIS =========================
  zones: "/api/zones",

  // ========================= Layout  MANAGEMENT APIS =========================
  layouts: "/api/layouts",
  layoutImageUpload: "/api/files/upload/canvas",
  logoImageUpload: "/api/files/upload/logo",
  zoneThumbnailImage: "/api/files/upload/canvas",
};
