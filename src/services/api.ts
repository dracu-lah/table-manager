/* eslint-disable no-useless-catch */
import api, { BASE_URL } from "@/configs/axios";
import endPoint from "./endPoint";
export { BASE_URL };

/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* AUTH START */
export const LoginAPI = async (params: any) => {
  try {
    const { data } = await api.post(`${endPoint.login}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdatePermissionsAPI = async (params: any) => {
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
export const GetPermissionsAPI = async ({ roles }: { roles: any }) => {
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
        key: "properties",
        routeName: "Properties",
        isEnabled: true,
        availablePermissions: ["create", "edit", "delete"],
        permissions: [],
        parent: "properties",
        parentID: 0,
        submenus: [],
      },
      {
        id: 2,
        key: "outlets",
        routeName: "Outlets",
        isEnabled: true,
        availablePermissions: ["create", "edit", "delete"],
        permissions: [],
        parent: "outlets",
        parentID: 0,
        submenus: [],
      },

      {
        id: 2,
        key: "zones",
        routeName: "Outlets",
        isEnabled: true,
        availablePermissions: ["create", "edit", "delete"],
        permissions: [],
        parent: "outlets",
        parentID: 0,
        submenus: [],
      },
      {
        id: 3,
        key: "users",
        routeName: "Users",
        isEnabled: true,
        availablePermissions: [],
        permissions: [],
        parent: "users",
        parentID: 0,
        submenus: [
          {
            id: 4,
            key: "roleManagement",
            routeName: "Manage Roles",
            isEnabled: true,
            availablePermissions: ["view", "create", "assign", "revoke"],
            permissions: ["view", "create", "assign", "revoke"],
            parent: "users",
            parentID: 3,
            submenus: [],
          },
          {
            id: 5,
            key: "userManagement",
            routeName: "Manage Users",
            isEnabled: true,
            availablePermissions: [
              "view",
              "add",
              "update",
              "deactivate",
              "view",
              "add",
              "update",
              "deactivate",
            ],
            permissions: [],
            parent: "users",
            parentID: 3,
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
export const ChangePasswordAPI = async (params: any) => {
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

export const GetDashboardAPI = async (params: any) => {
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
/* USER MANAGEMENT START */
export const CreateUserAPI = async (params: any) => {
  try {
    const { data } = await api.post(`${endPoint.register}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const AssignUserAPI = async (params: any) => {
  try {
    const { data } = await api.post(`${endPoint.assignUser}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteUserAPI = async (params: any) => {
  try {
    const { data } = await api.post(`${endPoint.outets}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
export const UpdateUserPasswordAPI = async (params: any) => {
  try {
    const { data } = await api.post(`${endPoint.updateUserPassword}`, null, {
      params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const GetUsersAPI = async (params: any) => {
  try {
    const { data } = await api.get(`${endPoint.getUsers}`, { params });
    return data;
  } catch (error) {
    throw error;
  }
};

/* ROLE START */

export const CreateRoleAPI = async (params: any) => {
  try {
    const { data } = await api.post(`${endPoint.registerRole}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetRolesAPI = async (params: any) => {
  try {
    const { data } = await api.get(`${endPoint.getRoles}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
/* ROLE END */

/* USER MANAGEMENT END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* OUTLET MANAGEMENT END */

export const GetOutletsAPI = async (params: any = {}) => {
  try {
    const { data } = await api.get(`${endPoint.outets}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetOutletAPI = async (params: any) => {
  try {
    const { data } = await api.get(`${endPoint.outets}/${params.id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const CreateOutletAPI = async (params: any) => {
  try {
    const { data } = await api.post(`${endPoint.outets}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UploadOutletLogoAPI = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(endPoint.logoImageUpload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Upload failed");
    }
  } catch (error: any) {
    throw new Error(error?.message || "Network error");
  }
};

export const UpdateOutletAPI = async (params: any) => {
  try {
    const { data } = await api.put(`${endPoint.outets}/${params.id}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
/* OUTLET MANAGEMENT END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* ZONE MANAGEMENT START */

export const GetZonesAPI = async (params: any = {}) => {
  try {
    const { data } = await api.get(`${endPoint.zones}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const UploadZoneImageAPI = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(endPoint.zoneThumbnailImage, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Upload failed");
    }
  } catch (error: any) {
    throw new Error(error?.message || "Network error");
  }
};
export const GetZoneAPI = async (params: { id: string }) => {
  try {
    const { data } = await api.get(`${endPoint.zones}/${params.id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateZoneAPI = async (params: any) => {
  try {
    const { data } = await api.post(`${endPoint.zones}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateZoneAPI = async (params: any) => {
  try {
    const { data } = await api.patch(`${endPoint.zones}/${params.id}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

// Layout

export const GetLayoutsAPI = async (params: any = {}) => {
  try {
    const { data } = await api.get(`${endPoint.layouts}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const UploadLayoutImageAPI = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(endPoint.layoutImageUpload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    throw error;
  }
};

export const GetLayoutAPI = async (params: { id: string }) => {
  try {
    const { data } = await api.get(`${endPoint.layouts}/${params.id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateLayoutAPI = async (params: any) => {
  try {
    const { data } = await api.post(`${endPoint.layouts}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateLayoutAPI = async (params: any) => {
  try {
    const { data } = await api.patch(
      `${endPoint.layouts}/${params.id}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

//  Canvas

export const GetCanvasAPI = async (params: { id: string }) => {
  try {
    const { data } = await api.get(`${endPoint.zones}/${params.id}/layout`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const UpdateCanvasAPI = async (params: any) => {
  try {
    const { data } = await api.patch(
      `${endPoint.zones}/${params.id}/layout`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

/* ZONE MANAGEMENT END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* PROPERTY MANAGEMENT START */
export const GetPropertiesAPI = async (params: any = {}) => {
  try {
    const { data } = await api.get(`${endPoint.property}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetPropertyAPI = async (params: { id: string }) => {
  try {
    const { data } = await api.get(`${endPoint.property}/${params.id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreatePropertyAPI = async (params: any) => {
  try {
    const { data } = await api.post(`${endPoint.property}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdatePropertyAPI = async (params: any) => {
  try {
    const { data } = await api.put(`${endPoint.property}/${params.id}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

/* PROPERTY MANAGEMENT END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
