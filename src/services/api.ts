/* eslint-disable no-useless-catch */
import api, { BASE_URL } from "@/configs/axios";
import endPoint from "./endPoint";
export { BASE_URL };

/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* AUTH START */
export const LoginAPI = async (loginData) => {
  try {
    const { data } = await api.post(`${endPoint.login}`, loginData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdatePermissionsAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.updateMenus}`, params, {
      params: { RoleName: params.RoleName },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
// export const GetPermissionsAPI = async (params) => {
//   try {
//     const { data } = await api.get(`${endPoint.getMenus}`, {
//       params: params,
//     });
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
//
export const GetPermissionsAPI = async ({ roles }) => {
  let menuApiResponse = {};
  menuApiResponse = {
    status: "Success",
    data: [
      {
        id: 1,
        key: "dashboard",
        routeName: "Dashboard",
        isEnabled: true,
        availablePermissions: [],
        permissions: [],
        parent: "dashboard",
        parentID: 0,
        submenus: [],
      },

      {
        id: 2,
        key: "report",
        routeName: "Report",
        isEnabled: true,
        availablePermissions: ["create", "edit", "delete"],
        permissions: [],
        parent: "report",
        parentID: 0,
        submenus: [],
      },
      {
        id: 2,
        key: "itemMaster",
        routeName: "Item Master",
        isEnabled: true,
        availablePermissions: ["create", "edit", "delete"],
        permissions: [],
        parent: "itemMaster",
        parentID: 0,
        submenus: [],
      },
      {
        id: 3,
        key: "inventory",
        routeName: "Inventory",
        isEnabled: true,
        availablePermissions: [],
        permissions: [],
        parent: "inventory",
        parentID: 0,
        submenus: [
          {
            id: 4,
            key: "batches",
            routeName: "Batches",
            isEnabled: true,
            availablePermissions: ["create"],
            permissions: ["create"],
            parent: "inventory",
            parentID: 3,
            submenus: [],
          },
          {
            id: 5,
            key: "stockAdjustment",
            routeName: "Stock Adjustment",
            isEnabled: true,
            availablePermissions: ["create", "approve"],
            permissions: [],
            parent: "inventory",
            parentID: 3,
            submenus: [],
          },

          {
            id: 5,
            key: "priceList",
            routeName: "Price List",
            isEnabled: true,
            availablePermissions: ["create", "approve"],
            permissions: [],
            parent: "inventory",
            parentID: 3,
            submenus: [],
          },
        ],
      },
      {
        id: 6,
        key: "sales",
        routeName: "Sales",
        isEnabled: true,
        availablePermissions: [],
        permissions: [],
        parent: "sales",
        parentID: 0,
        submenus: [
          {
            id: 7,
            key: "newCounterSale",
            routeName: "New Counter Sale",
            isEnabled: true,
            availablePermissions: ["create"],
            permissions: ["create"],
            parent: "sales",
            parentID: 6,
            submenus: [],
          },
          {
            id: 8,
            key: "counterSalesList",
            routeName: "Counter Sales List",
            isEnabled: true,
            availablePermissions: ["export"],
            permissions: ["export"],
            parent: "sales",
            parentID: 6,
            submenus: [],
          },
        ],
      },
    ],
  };
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous API call delay
    setTimeout(() => {
      // Simulate a successful response
      resolve(menuApiResponse);

      // To simulate an error, you could use:
      // reject(new Error("Failed to fetch permissions"));
    }, 500); // Simulate a 500ms network delay
  });
};
export const ChangePasswordAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.changePassword}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
/* AUTH END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* DASHBOARD  START */

export const GetDashboardAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.getDashboardData}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

/* DASHBOARD  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
