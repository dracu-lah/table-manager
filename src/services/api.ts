/* eslint-disable no-useless-catch */
import api, { BASE_URL } from "@/configs/axios";
import endPoint from "./endPoint";
export { BASE_URL };

/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* GUEST APIS FOR DELETE ACCOUNT  */
export const GuestLoginAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.login}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const GuestDeleteAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteGuestAccount}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
export const GuestDetailsAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.guestDetails}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
/* GUEST APIS FOR DELETE ACCOUNT  */
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
export const GetPermissionsAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.getMenus}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
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
/* GUEST MANAGEMENT  START */

export const DeactivateGuestAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deactivateGuest}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
export const CreateGuestAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.createGuest}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateGuestMembershipStatusAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateGuestMembershipStatus}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export const AddGuestsExcelAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.createGuests}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const AddEnrollGuestsAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.enrollGuests}`, null, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetUploadedGuestStatusAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.createGuestsStatus}`, null, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const GetMembershipCategoriesAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.membershipCategories}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetGuestListAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.getGuestList}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetGuestAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.getGuest}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateGuestAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.updateGuest}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

/* GUEST MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* LOCATION MANAGEMENT  START */

export const GetPropertyMenuAPI = async ({ filter }) => {
  try {
    const { data } = await api.get(`${endPoint.propertyList}`, {
      params: { filter },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetPropertyDetailsAPI = async ({ propertyId }) => {
  try {
    const { data } = await api.get(
      `${endPoint.propertyDetails}?ID=${propertyId}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreatePropertyAPI = async (propertyData) => {
  try {
    const { data } = await api.post(`${endPoint.createProperty}`, propertyData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const EditPropertyAPI = async (propertyData) => {
  try {
    const { data } = await api.post(`${endPoint.editProperty}`, propertyData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const PropertyIsPublishedAPI = async (propertyData) => {
  try {
    const { data } = await api.post(
      `${endPoint.propertyPublished}`,
      propertyData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeletePropertyAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteProperty}`, null, {
      params: {
        Id: params.id,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
/* LOCATION MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* OFFER MANAGEMENT  START */

export const CreateOfferAPI = async (offerData) => {
  try {
    const { data } = await api.post(`${endPoint.createOffer}`, offerData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateHomeScreenOrderAPI = async (offerData) => {
  try {
    const { data } = await api.post(`${endPoint.homeOfferOrder}`, offerData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const EditOfferAPI = async (offerData) => {
  try {
    const { data } = await api.post(`${endPoint.editOffer}`, offerData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetHomeOffersAPI = async ({
  filter,
  locationId,
  outletId,
  page,
  pageSize = 12,
}) => {
  try {
    const { data } = await api.get(`${endPoint.homeOfferList}`, {
      params: {
        filter,
        LocationID: locationId,
        PageSize: pageSize,
        OutletId: outletId,
        PageNumber: page,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const GetOffersAPI = async ({
  filter,
  locationId,
  outletId,
  page,
  pageSize = 12,
}) => {
  try {
    const { data } = await api.get(`${endPoint.offerList}`, {
      params: {
        filter,
        LocationID: locationId,
        PageSize: pageSize,
        OutletId: outletId,
        PageNumber: page,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetPublishedOffersAPI = async ({
  filter,
  locationId,
  outletId,
  page,
  pageSize = 12,
}) => {
  try {
    const { data } = await api.get(`${endPoint.publishedOfferList}`, {
      params: {
        filter,
        LocationID: locationId,
        PageSize: pageSize,
        OutletId: outletId,
        PageNumber: page,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const GetOfferAPI = async ({ offerId }) => {
  try {
    const { data } = await api.get(`${endPoint.offer}?ID=${offerId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteOfferAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteOffer}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const PublishOfferAPI = async (offerData) => {
  try {
    const { data } = await api.post(`${endPoint.publishOffer}`, offerData);
    return data;
  } catch (error) {
    throw error;
  }
};
/* OFFER MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* NEWS MANAGEMENT  START */

export const CreateNewsAPI = async (newsData) => {
  try {
    const { data } = await api.post(`${endPoint.createNews}`, newsData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteNewsAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteNews}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
export const EditNewsAPI = async (newsData) => {
  try {
    const { data } = await api.post(`${endPoint.editNews}`, newsData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetPublishedNewsListAPI = async ({
  filter,
  locationId,
  page,
  pageSize = 12,
}) => {
  try {
    const { data } = await api.get(`${endPoint.publishedNewsList}`, {
      params: {
        filter,
        LocationID: locationId,
        PageSize: pageSize,
        PageNumber: page,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const GetNewsListAPI = async ({
  filter,
  locationId,
  page,
  pageSize = 12,
}) => {
  try {
    const { data } = await api.get(`${endPoint.newsList}`, {
      params: {
        filter,
        LocationID: locationId,
        PageSize: pageSize,
        PageNumber: page,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const GetNewsAPI = async ({ newsId }) => {
  try {
    const { data } = await api.get(`${endPoint.news}?ID=${newsId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const PublishNewsAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.publishNews}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
/* NEWS MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* BANNER MANAGEMENT  START */

export const CreateBannerAPI = async (bannerData) => {
  try {
    const { data } = await api.post(`${endPoint.createBanner}`, bannerData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteBannerAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteBanner}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
export const EditBannerAPI = async (bannerData) => {
  try {
    const { data } = await api.post(`${endPoint.editBanner}`, bannerData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetBannersAPI = async (screen) => {
  try {
    const { data } = await api.get(`${endPoint.banners}?Screen=${screen}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UploadBannerVideoAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.sendPropertyVideo}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const PublishBannerAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.publishBanner}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
/* BANNER MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* BENEFITS MANAGEMENT  START */

export const CreateBenefitAPI = async (benefitData) => {
  try {
    const { data } = await api.post(`${endPoint.createBenefit}`, benefitData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const EditBenefitAPI = async (benefitData) => {
  try {
    const { data } = await api.post(`${endPoint.editBenefit}`, benefitData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetBenefitsAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.benefitList}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetBenefitAPI = async ({ benefitId }) => {
  try {
    const { data } = await api.get(`${endPoint.benefit}?ID=${benefitId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteBenefitAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteBenefit}`, null, {
      params: { Id: params.id },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const PublishBenefitAPI = async (benefitData) => {
  try {
    const { data } = await api.post(`${endPoint.publishBenefit}`, benefitData);
    return data;
  } catch (error) {
    throw error;
  }
};
/*  BENEFITS MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* EXPERIENCES MANAGEMENT  START */
export const CreateExperienceAPI = async (experienceData) => {
  try {
    const { data } = await api.post(
      `${endPoint.createExperience}`,
      experienceData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const EditExperienceAPI = async (experienceData) => {
  try {
    const { data } = await api.post(
      `${endPoint.editExperience}`,
      experienceData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetExperiencesAPI = async ({
  filter,
  locationId,
  outletId,
  page,
}) => {
  try {
    const { data } = await api.get(`${endPoint.experienceList}`, {
      params: {
        filter,
        LocationID: locationId,
        PageSize: 8,
        OutletId: outletId,
        PageNumber: page,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetExperienceAPI = async ({ experienceId }) => {
  try {
    const { data } = await api.get(`${endPoint.experience}?ID=${experienceId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteExperienceAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteExperience}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const PublishExperienceAPI = async (experienceData) => {
  try {
    const { data } = await api.post(
      `${endPoint.publishExperience}`,
      experienceData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
/* EXPERIENCES MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* DESCRIPTIONS MANAGEMENT  START */
export const CreateDescriptionAPI = async (descriptionData) => {
  try {
    const { data } = await api.post(
      `${endPoint.createDescription}`,
      descriptionData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const EditDescriptionAPI = async (descriptionData) => {
  try {
    const { data } = await api.post(
      `${endPoint.editDescription}`,
      descriptionData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetDescriptionsAPI = async ({ screen }) => {
  try {
    const { data } = await api.get(`${endPoint.descriptionList}`, {
      params: {
        Screen: screen,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetDescriptionAPI = async ({ descriptionId }) => {
  try {
    const { data } = await api.get(
      `${endPoint.description}?ID=${descriptionId}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteDescriptionAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteDescription}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const PublishDescriptionAPI = async (descriptionData) => {
  try {
    const { data } = await api.post(
      `${endPoint.publishDescription}`,
      descriptionData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
/* DESCRIPTIONS MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* CONTACT US MANAGEMENT  START */
export const GetContactUsAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getContactUs}`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const UpdateContactUsAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.updateContactUs}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
/* CONTACT US MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* CONFIGURATIONS  START */

// MEMBERSHIP PROGRAM
export const GetMembershipProgramsAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.membershipPrograms}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateMembershipProgramsAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.createMembershipPrograms}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export const UpdateMembershipProgramsAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateMembershipPrograms}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteMembershipProgramsAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.deleteMembershipPrograms}`,
      null,
      { params: { Id: params.id } },
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// MEMBERSHIP TIER TYPES

export const GetMembershipTierTypesAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.membershipTierTypes}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateMembershipTierTypesAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.createMembershipTierTypes}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export const UpdateMembershipTierTypesAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateMembershipTierTypes}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteMembershipTierTypesAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.deleteMembershipTierTypes}`,
      null,
      { params: { Id: params.id } },
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// MEMBERSHIP TIERS
export const GetMembershipTiersAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.membershipTiers}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateMembershipTiersAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.createMembershipTiers}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateMembershipTiersAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateMembershipTiers}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteMembershipTiersAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteMembershipTiers}`, null, {
      params: { Id: params.id },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
// MEMBERSHIP CATEGORY
export const GetMembershipCategoryListAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getMembershipCategories}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateMembershipCategoryAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.createMembershipCategory}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
export const UpdateMembershipCategoryAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateMembershipCategory}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteMembershipCategoryAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.deleteMembershipCategory}`,
      null,
      { params: { Id: params.id } },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// RVC Outlets
export const GetRVCOutletListAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getRVCOutlets}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UploadOutletMenuAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.sendOutletMenuPDF}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
export const GetRVCOutletAPI = async ({ outletId }) => {
  try {
    const { data } = await api.get(`${endPoint.getRVCOutlet}?Id=${outletId}`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const CreateRVCOutletAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.createRVCOutlet}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateRVCOutletAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.updateRVCOutlet}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteRVCOutletAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteRVCOutlet}`, {
      id: params.id,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const OutletIsPublishedAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.outletPublished}`, {
      isPublished: params.isPublished,
      outletId: params.id,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
// PointSettings
export const UpdatePointSettings = async (updateData) => {
  try {
    const { data } = await api.post(
      `${endPoint.updatePointSettings}`,
      updateData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetPointSettings = async () => {
  try {
    const { data } = await api.get(`${endPoint.getPointSettings}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// EARN POINTS CONFIG
export const CreateEarnPointsConfigAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.createEarnPointsConfig}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteEarnPointsConfigAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.deleteEarnPointsConfig}`,
      null,
      { params: { Id: params.id } },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateEarnPointsConfigAPI = async (updateData) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateEarnPointsConfig}`,
      updateData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetEarnPointsConfigListAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getEarnPointsConfigList}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// BURN POINTS CONFIG
export const CreateBurnPointsConfigAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.createBurnPointsConfig}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteBurnPointsConfigAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.deleteBurnPointsConfig}`,
      null,
      { params: { Id: params.id } },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateBurnPointsConfigAPI = async (updateData) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateBurnPointsConfig}`,
      updateData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetBurnPointsConfigListAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getBurnPointsConfigList}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// ORGANIZATION API
export const GetOrganizationsAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getOrganizations}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateOrganizationAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.createOrganization}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateOrganizationAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.updateOrganization}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteOrganizationAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteOrganization}`, null, {
      params: { Id: params.id },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// MEMBERSHIP DISCOUNT

export const CreateDiscountSettings = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.createDiscountSettings}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetDiscountSettings = async () => {
  try {
    const { data } = await api.get(`${endPoint.getDiscountSettings}`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const CreateMembershipDiscountAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.createMembershipDiscount}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteMembershipDiscountAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.deleteMembershipDiscount}`,
      null,
      {
        params: { Id: params.id },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateMembershipDiscountAPI = async (updateData) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateMembershipDiscount}`,
      updateData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetMembershipDiscountListAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getMembershipDiscountList}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// DISCOUNT RVC RESTRICTION
export const CreateDiscountRVCRestrictionAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.createDiscountRVCRestriction}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteDiscountRVCRestrictionAPI = async (id) => {
  try {
    const { data } = await api.post(
      `${endPoint.deleteDiscountRVCRestriction}`,
      null,
      {
        params: { Id: id },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateDiscountRVCRestrictionAPI = async (updateData) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateDiscountRVCRestriction}`,
      updateData,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetDiscountRVCRestrictionsAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getDiscountRVCRestrictions}`);
    return data;
  } catch (error) {
    throw error;
  }
};
// RVCLevelDiscounts
export const GetRVCLevelDiscountsAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getRVCLevelDiscounts}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateRVCLevelDiscountsAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.createRVCLevelDiscount}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateRVCLevelDiscountsAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateRVCLevelDiscount}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteRVCLevelDiscountsAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.deleteRVCLevelDiscount}`,
      null,
      { params: { Id: params.id } },
    );
    return data;
  } catch (error) {
    throw error;
  }
};
// DiscountItemizers
export const GetDiscountItemizersAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getDiscountItemizers}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateDiscountItemizersAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.createDiscountItemizer}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateDiscountItemizersAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateDiscountItemizer}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteDiscountItemizersAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.deleteDiscountItemizer}`,
      null,
      {
        params: { Id: params.id },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// Micro Discounts
export const GetMicroDiscountsAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getMicroDiscounts}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateMicroDiscountsAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.createMicroDiscount}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateMicroDiscountsAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.updateMicroDiscount}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteMicroDiscountsAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteMicroDiscount}`, null, {
      params: { Id: params.id },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// Discount Programs
export const GetDiscountProgramsAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getDiscountPrograms}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateDiscountProgramAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.createDiscountProgram}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateDiscountProgramAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateDiscountProgram}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteDiscountProgramAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteDiscountProgram}`, null, {
      params: { Id: params.id },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
// OUTLET CONFIG TYPES
export const GetLoyaltyOutletTypesAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getLoyaltyOutletTypes}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateLoyaltyOutletTypesAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.createLoyaltyOutletTypes}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateLoyaltyOutletTypesAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateLoyaltyOutletTypes}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteLoyaltyOutletTypesAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.deleteLoyaltyOutletTypes}`,
      null,
      {
        params: { Id: params.id },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

// Major Group

export const GetMajorGroupAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getMajorGroups}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateMajorGroupAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.createMajorGroup}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateMajorGroupAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.updateMajorGroup}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteMajorGroupAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteMajorGroup}`, null, {
      params: { Id: params.id },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
/* CONFIGURATIONS  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* FEEDBACKS  START */
export const GetFeedbacksAPI = async ({ filter }) => {
  try {
    const { data } = await api.get(`${endPoint.getFeedbacks}`, {
      params: { filter },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetFeedbackAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.getFeedback}`, {
      params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const MarkAsReadFeedbackAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.markAsRead}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
export const ReplyFeedbackAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.replyFeedback}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
/* FEEDBACKS  END */

/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* CLAIM FEEDBACKS  START */
export const GetClaimPointsFeedbacksAPI = async ({ filter }) => {
  try {
    const { data } = await api.get(`${endPoint.getClaimPointsFeedbacks}`, {
      params: { filter },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetClaimPointsFeedbackAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.getClaimPointsFeedback}`, {
      params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const ReplyClaimPointsFeedbackAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.replyClaimPointsFeedback}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
/* CLAIM FEEDBACKS  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* POINTS  START */

export const AddPointsAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.addPoints}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const AddLaperleTicketsAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.addLaperleTickets}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const RedeemPointsAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.redeemPoints}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetTransactionsAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.transactions}`, {
      params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const GetTransactionByIdAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.transactionById}`, {
      params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetTransferTransactionByIdAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.transferTransactionById}`, {
      params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetTransferTransactionsAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.transferTransactions}`, {
      params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const ReversePointsFromCMSAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.revertTransactionById}`, null, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

/* POINTS  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* NOTIFICATION MANAGEMENT  START */

export const GetNotificationsAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getNotifications}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const SendNotificationAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.sendNotifcation}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const SendBulkNotificationAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.sendBulkNotifcation}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateNotificationAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.updateNotification}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteNotificationAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteNotification}`, null, {
      params: { Id: params.id },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

/* NOTIFICATION MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* EMAIL MANAGEMENT  START */

export const SendBulkEmailAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.sendBulkEmail}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
/* EMAIL MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* SMS MANAGEMENT  START */
export const SendBulkSMSAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.sendBulkSMS}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

/* SMS MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* TEMPLATE MANAGEMENT  START */

export const GetTemplatesAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.getTemplates}`, { params });
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateTemplateAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.createTemplate}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateTemplateAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.updateTemplate}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteTemplateAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteTemplate}`, null, {
      params: { Id: params.id },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
/* TEMPLATE MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* USER MANAGEMENT START */
export const CreateUserAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.register}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const AssignUserAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.assignUser}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteUserAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteUser}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
export const UpdateUserPasswordAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.updateUserPassword}`, null, {
      params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
export const GetUsersAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.getUsers}`, { params });
    return data;
  } catch (error) {
    throw error;
  }
};

/* ROLE START */

export const CreateRoleAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.registerRole}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetRolesAPI = async (params) => {
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
/* EVENTS START */
export const CreateEventAPI = async (eventData) => {
  try {
    const { data } = await api.post(`${endPoint.createEvent}`, eventData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const EditEventAPI = async (eventData) => {
  try {
    const { data } = await api.post(`${endPoint.editEvent}`, eventData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetEventsAPI = async ({ filter, locationId, outletId, page }) => {
  try {
    const { data } = await api.get(`${endPoint.eventList}`, {
      params: {
        filter,
        LocationID: locationId,
        PageSize: 8,
        OutletId: outletId,
        PageNumber: page,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetEventAPI = async ({ eventId }) => {
  try {
    const { data } = await api.get(`${endPoint.event}?ID=${eventId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteEventAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.deleteEvent}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const PublishEventAPI = async (eventData) => {
  try {
    const { data } = await api.post(`${endPoint.publishEvent}`, eventData);
    return data;
  } catch (error) {
    throw error;
  }
};
/* EVENTS MANAGEMENT  END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* TERMS AND CONDITIONS START */
export const GetTermsConditionsAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getTermsConditions}`);
    return data;
  } catch (error) {
    throw error;
  }
};
export const UpdateTermsConditionsAPI = async (params) => {
  try {
    const { data } = await api.post(
      `${endPoint.updateTermsConditions}`,
      params,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
/* TERMS AND CONDITIONS END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* PRIVACY POLICY START */
export const GetPrivacyPolicyAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getPrivacyPolicy}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdatePrivacyPolicyAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.updatePrivacyPolicy}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
/* PRIVACY POLICY END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* ABOUT US START */
export const GetAboutUsAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getAboutUs}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateAboutUsAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.updateAboutUs}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};
/* ABOUT US END */

/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* FAQs START */

export const GetFAQsAPI = async () => {
  try {
    const { data } = await api.get(`${endPoint.getFAQs}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const CreateFAQAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.createFAQ}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const UpdateFAQAPI = async (params) => {
  try {
    const { data } = await api.post(`${endPoint.updateFAQ}`, params);
    return data;
  } catch (error) {
    throw error;
  }
};

export const DeleteFAQAPI = async (id) => {
  try {
    const { data } = await api.post(`${endPoint.deleteFAQ}`, {
      id,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
/* FAQs END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/* WALLET START */

export const GetWalletAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.getWalletList}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
/* WALLET END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*  REPORTS START */

export const GetTotalSpendReportAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.totalSpendReport}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetStaffIncentiveReportAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.staffIncentiveReport}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetPointExpiryReportAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.pointExpiryReport}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetAffiliatedReportAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.affiliatedReport}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetLoyaltyTransactionReportAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.loyaltyTransactionReport}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
/*  REPORTS END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*  SIMPHONY START */
export const GetSimphonyPropertiesAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.simphonyPropertyList}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const GetSimphonyOutletsAPI = async (params) => {
  try {
    const { data } = await api.get(`${endPoint.simphonyRVCOutlets}`, {
      params: params,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
/*  SIMPHONY END */
/************************************************************************************************************************************************************************************************************************************************************************************************************************/
