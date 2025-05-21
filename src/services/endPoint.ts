export default {
  // ========================= GUEST APIS =========================
  guestLogin: "/api/User/Account/SignIn",
  guestDetails: "/api/User/GuestAccount/GetGuestProfile",
  deleteGuestAccount: "/api/User/GuestAccount/DeleteGuestAccount",

  // ========================= CMS APIS =========================
  login: "/api/User/Account/SignIn",
  register: "/api/User/Account/RegisterUser",
  assignUser: "/api/User/Account/CreateUserRole",
  refresh: "/api/User/Account/GetAccessToken",
  changePassword: "/api/Admin/Account/UpdateUserPassword",

  // ========================= DASHBOARD APIS =========================
  getDashboardData: "/api/Admin/Reports/GetDashboardDisplayData",

  // ========================= USER MANAGEMENT APIS =========================
  getUsers: "/api/User/Account/SearchUsers",
  updateUserPassword: "/api/User/Account/UpdateUserPasswordFromCMS",

  // ========================= ROLE MANAGEMENT APIS =========================
  registerRole: "/api/User/Account/CreateRole",
  getRoles: "/api/User/Account/SearchRoles",

  // ========================= GUEST MANAGEMENT APIS =========================
  createGuest: "/api/User/Account/CreateEnrollMemberCMS",
  deactivateGuest: "/api/Admin/Member/UpdateActivateOrDeactivateMember",
  updateGuestMembershipStatus: "/api/Admin/Member/UpdateMembershipStatus",
  enrollGuests: "/api/Admin/Member/CreateBulkEnrollMember",
  createGuests: "/api/Admin/Member/CreateBulkMemberUploadFromExcel",
  createGuestsStatus: "/api/Admin/Member/GetBulkEnrollMemberList",
  getGuestList: "/api/User/Account/GetGuestListForCMS",
  getGuest: "/api/Admin/Member/GetMemberById",
  updateGuest: "/api/Admin/Member/UpdateProfile",

  // ========================= CMS CONTENT APIS =========================
  updateTermsConditions: "/api/Admin/AppResources/SaveTermsAndConditions",
  getTermsConditions: "/api/Admin/AppResources/GetTermsAndConditions",
  updatePrivacyPolicy: "/api/Admin/AppResources/SavePrivacyPolicy",
  getPrivacyPolicy: "/api/Admin/AppResources/GetPrivacyPolicy",
  getAboutUs: "/api/Admin/AppResources/GetAboutUs",
  updateAboutUs: "/api/Admin/AppResources/SaveAboutUs",

  // ========================= FAQ APIS =========================
  getFAQs: "/api/Admin/AppResources/GetFAQList",
  findFAQ: "/api/Admin/AppResources/FindFAQ",
  createFAQ: "/api/Admin/AppResources/CreateFAQ",
  updateFAQ: "/api/Admin/AppResources/UpdateFAQ",
  deleteFAQ: "/api/Admin/AppResources/DeleteFAQ",

  // ========================= PROPERTY APIS =========================
  sendPropertyImage: "/api/Settings/Image/SaveLocationImage",
  sendPropertyVideo: "/api/Settings/Image/SaveVideo",
  sendPropertyLogo: "/api/Settings/Image/SaveLogoImage",
  propertyList: "/api/Masters/Location/GetLocationListForAdmin",
  createProperty: "/api/Admin/Property/CreateProperty",
  editProperty: "/api/Admin/Property/UpdateProperty",
  deleteProperty: "/api/Admin/Property/DeleteProperty",
  propertyDetails: "/api/Admin/Property/GetPropertyInfoById",
  propertyPublished: "/api/Masters/Location/IsPublishLocation",

  // ========================= OFFERS APIS =========================
  sendOfferImage: "/api/Settings/Image/SaveOfferImage",
  createOffer: "/api/Settings/OfferContent/Create",
  deleteOffer: "/api/Settings/OfferContent/CreatedOfferDelete",
  editOffer: "/api/Settings/OfferContent/Update",
  offerList: "/api/Settings/OfferContent/GetAllList",
  homeOfferList: "/api/Settings/OfferContent/GetHomeScreenList",
  homeOfferOrder: "/api/Settings/OfferContent/UpdateHomeScreenOrder",
  publishedOfferList: "/api/Settings/OfferContent/GetPublishedList",
  offer: "/api/Settings/OfferContent/Find",
  publishOffer: "/api/Settings/OfferContent/CreatePublish",

  // ========================= NEWS APIS =========================
  sendNewsImage: "/api/Settings/Image/SaveNewsImage",
  createNews: "/api/Settings/NewsContent/Create",
  deleteNews: "/api/Settings/NewsContent/Delete",
  editNews: "/api/Settings/NewsContent/Update",
  newsList: "/api/Settings/NewsContent/GetAllList",
  publishedNewsList: "/api/Settings/NewsContent/GetPublishedList",
  news: "/api/Settings/NewsContent/Find",
  publishNews: "/api/Settings/NewsContent/Publish",

  // ========================= BANNER APIS =========================
  sendBannerImage: "/api/Settings/Image/SaveBannerImage",
  banners: "/api/Settings/BannerContent/GetAllList",
  banner: "/api/Settings/BannerContent/Find",
  publishBanner: "/api/Settings/BannerContent/Publish",
  createBanner: "/api/Settings/BannerContent/Create",
  deleteBanner: "/api/Settings/BannerContent/Delete",
  editBanner: "/api/Settings/BannerContent/Update",

  // ========================= MEMBERSHIP CATEGORIES APIS =========================
  membershipCategories: "/api/User/AdminHabtoor/GetCMSCategoryTiers",
  createMembershipCategory: "/api/User/AdminHabtoor/CreateCategory",
  updateMembershipCategory: "/api/User/AdminHabtoor/UpdateCategory",
  deleteMembershipCategory: "/api/User/AdminHabtoor/DeleteCategory",

  // ========================= MEMBERSHIP PROGRAMS APIS =========================
  membershipPrograms: "/api/User/AdminHabtoor/GetMembershipProgram",
  createMembershipPrograms: "/api/User/AdminHabtoor/CreateMembershipProgram",
  updateMembershipPrograms: "/api/User/AdminHabtoor/UpdateMembershipProgram",
  deleteMembershipPrograms: "/api/User/AdminHabtoor/DeleteMembershipProgram",

  // ========================= MEMBERSHIP TIER TYPES APIS =========================
  membershipTierTypes: "/api/User/AdminHabtoor/GetTierType",
  createMembershipTierTypes: "/api/User/AdminHabtoor/CreateTierType",
  updateMembershipTierTypes: "/api/User/AdminHabtoor/UpdateTierType",
  deleteMembershipTierTypes: "/api/User/AdminHabtoor/DeleteTierTypes",

  // ========================= MEMBERSHIP TIERS APIS =========================
  membershipTiers: "/api/User/AdminHabtoor/GetTierInfo",
  createMembershipTiers: "/api/User/AdminHabtoor/CreateTier",
  updateMembershipTiers: "/api/User/AdminHabtoor/UpdateTier",
  deleteMembershipTiers: "/api/User/AdminHabtoor/DeleteTier",

  // ========================= FEEDBACK APIS =========================
  getFeedbacks: "/api/Settings/GuestFeedback/GetAllFeedBackList",
  markAsRead: "/api/Settings/GuestFeedback/SaveAsRead",
  getFeedback: "/api/Settings/GuestFeedback/GetFeedBackByID",
  replyFeedback: "/api/Settings/GuestFeedback/CreateGuestFeedbackReply",
  getClaimPointsFeedbacks:
    "/api/Settings/GuestFeedback/GetAllClaimFeedBackList",
  getClaimPointsFeedback: "/api/Settings/GuestFeedback/GetClaimFeedBackByID",
  replyClaimPointsFeedback:
    "/api/Settings/GuestFeedback/CreateGuestClaimFeedbackReply",

  // ========================= RVC OUTLET APIS =========================
  getRVCOutlets: "/api/Admin/RVCOutlet/GetOutletAllList",
  getRVCOutlet: "/api/Admin/RVCOutlet/GetRVCOutletById",
  createRVCOutlet: "/api/Admin/RVCOutlet/CreateRVCOutlet",
  updateRVCOutlet: "/api/Admin/RVCOutlet/UpdateRVCOutlet",
  deleteRVCOutlet: "/api/Admin/RVCOutlet/DeleteRVCOutlet",
  sendOutletLogo: "/api/Settings/Image/SaveLogoImage",
  sendOutletMenuPDF: "/api/Settings/Image/SaveMenuFile",
  outletPublished: "/api/Admin/RVCOutlet/UpdateActivateDeactivateOutlet",

  // ========================= POINTS MANAGEMENT APIS =========================
  addPoints: "/api/User/AdminHabtoor/CreateAddPointsOriginFromCMS",
  addLaperleTickets: "/api/User/AdminHabtoor/CreateLaPerleTicketsFromCMS",
  redeemPoints: "/api/User/AdminHabtoor/CreateRedeemPointsOriginFromCMS",

  // ========================= TRANSACTION APIS =========================
  transactionById: "/api/Admin/Reports/GetSearchMemberTransactionDetailReport",
  transactions: "/api/Admin/Reports/GetSearchMemberTransactionDetailReport",
  transferTransactionById:
    "/api/Admin/Reports/GetSearchTransferTransactionsByMemberReport",
  transferTransactions: "/api/User/AdminHabtoor/GetTransferTransactionsList",
  revertTransactionById: "/api/User/AdminHabtoor/ReversePointsFromCMS",

  // ========================= LOYALTY PROGRAM CONFIGURATION APIS =========================
  createEarnPointsConfig: "/api/User/AdminHabtoor/CreateEarnPointsConfig",
  deleteEarnPointsConfig: "/api/User/AdminHabtoor/DeleteEarnPointsConfig",
  updatePointSettings: "/api/User/AdminHabtoor/ConfigureLoyaltySetting",
  getPointSettings: "/api/User/AdminHabtoor/GetLoyaltyPointSetting",
  createDiscountSettings: "/api/User/AdminHabtoor/CreateDiscountSettings",
  getDiscountSettings: "/api/User/AdminHabtoor/GetDiscountLoyaltytSettings",
  updateEarnPointsConfig: "/api/User/AdminHabtoor/UpdateEarnPointsConfig",
  getEarnPointsConfigList: "/api/User/AdminHabtoor/ReadEarnPointsConfig",
  createBurnPointsConfig: "/api/User/AdminHabtoor/CreateBurnPointsConfig",
  deleteBurnPointsConfig: "/api/User/AdminHabtoor/DeleteBurnPointsConfig",
  updateBurnPointsConfig: "/api/User/AdminHabtoor/UpdateBurnPointsConfig",
  getBurnPointsConfigList: "/api/User/AdminHabtoor/ReadBurnPointsConfig",

  // ========================= EXPERIENCE APIS =========================
  experienceList: "/api/Settings/ExperienceContent/GetAllList",
  experience: "/api/Settings/ExperienceContent/Find",
  createExperience: "/api/Settings/ExperienceContent/Create",
  editExperience: "/api/Settings/ExperienceContent/Update",
  deleteExperience: "/api/Settings/ExperienceContent/Delete",
  publishExperience: "/api/Settings/ExperienceContent/Publish",
  sendExperienceImage: "/api/Settings/Image/SaveExperienceImage",

  // ========================= DESCRIPTION APIS =========================
  descriptionList: "/api/Settings/DescriptionContent/GetAllList",
  description: "/api/Settings/DescriptionContent/Find",
  createDescription: "/api/Settings/DescriptionContent/Create",
  editDescription: "/api/Settings/DescriptionContent/Update",
  deleteDescription: "/api/Settings/DescriptionContent/Delete",
  publishDescription: "/api/Settings/DescriptionContent/Publish",

  // ========================= CONTACT US APIS =========================
  getContactUs: "/api/Settings/DescriptionContent/FindContactInfo",
  updateContactUs: "/api/Settings/DescriptionContent/UpdateContactInfo",

  // ========================= ORGANIZATION APIS =========================
  getOrganizations: "/api/User/AdminHabtoor/GetOrganizationInfoList",
  getOrganizationById: "/api/User/AdminHabtoor/GetOrganizationInfoById",
  createOrganization: "/api/User/AdminHabtoor/CreateOrganizationInfo",
  updateOrganization: "/api/User/AdminHabtoor/UpdateOrganizationInfo",
  deleteOrganization: "/api/User/AdminHabtoor/DeleteOrganizationInfo",

  // ========================= MEMBERSHIP DISCOUNT APIS =========================
  createMembershipDiscount:
    "/api/User/AdminHabtoor/CreateMembershipDiscountConfig",
  deleteMembershipDiscount:
    "/api/User/AdminHabtoor/DeleteMembershipDiscountConfig",
  updateMembershipDiscount:
    "/api/User/AdminHabtoor/UpdateMembershipDiscountConfig",
  getMembershipDiscountList:
    "/api/User/AdminHabtoor/GetMembershipDiscountConfig",

  // ========================= DISCOUNT RVC RESTRICTIONS APIS =========================
  createDiscountRVCRestriction:
    "/api/User/AdminHabtoor/CreateDiscountRVCRestriction",
  getDiscountRVCRestrictions:
    "/api/User/AdminHabtoor/GetDiscountRVCRestriction",
  updateDiscountRVCRestriction:
    "/api/User/AdminHabtoor/UpdateDiscountRVCRestriction",
  deleteDiscountRVCRestriction:
    "/api/User/AdminHabtoor/DeleteDiscountRVCRestriction",

  // ========================= RVC LEVEL DISCOUNTS APIS =========================
  getRVCLevelDiscounts: "/api/User/AdminHabtoor/GetRVCLevelDiscounts",
  createRVCLevelDiscount: "/api/User/AdminHabtoor/CreateRVCLevelDiscounts",
  updateRVCLevelDiscount: "/api/User/AdminHabtoor/UpdateRVCLevelDiscounts",
  deleteRVCLevelDiscount: "/api/User/AdminHabtoor/DeleteRVCLevelDiscounts",

  // ========================= DISCOUNT ITEMIZERS APIS =========================
  getDiscountItemizers: "/api/User/AdminHabtoor/GetDiscountItemizers",
  createDiscountItemizer: "/api/User/AdminHabtoor/CreateDiscountItemizers",
  updateDiscountItemizer: "/api/User/AdminHabtoor/UpdateDiscountItemizers",
  deleteDiscountItemizer: "/api/User/AdminHabtoor/DeleteDiscountItemizer",

  // ========================= MICRO DISCOUNTS APIS =========================
  getMicroDiscounts: "/api/User/AdminHabtoor/GetMicrosDiscounts",
  createMicroDiscount: "/api/User/AdminHabtoor/CreateMicrosDiscounts",
  updateMicroDiscount: "/api/User/AdminHabtoor/UpdateMicrosDiscounts",
  deleteMicroDiscount: "/api/User/AdminHabtoor/DeleteMicrosDiscounts",

  // ========================= DISCOUNT PROGRAMS APIS =========================
  getDiscountPrograms: "/api/User/AdminHabtoor/GetDiscountProgramsList",
  createDiscountProgram: "/api/User/AdminHabtoor/CreateDiscountPrograms",
  updateDiscountProgram: "/api/User/AdminHabtoor/UpdateDiscountPrograms",
  deleteDiscountProgram: "/api/User/AdminHabtoor/DeleteDiscountPrograms",

  // =========================  TEMPLATE APIS =========================
  getTemplates: "/api/Settings/ManageNotification/GetNotificationTemplate",
  createTemplate:
    "/api/Settings/ManageNotification/CreateChannelNotificationTemplate",
  updateTemplate: "/api/Settings/ManageNotification/UpdateNotificationTemplate",
  deleteTemplate: "/api/Settings/ManageNotification/DeleteNotificationTemplate",

  // ========================= NOTIFICATION APIS =========================
  getNotifications: "", //TODO: Add the correct endpoint
  sendNotifcation: "/api/Settings/ManageNotification/CreateSendNotification",
  sendBulkNotifcation:
    "/api/Settings/ManageNotification/CreateBulkNotification",
  updateNotification: "", //TODO: Add the correct endpoint
  deleteNotification: "", //TODO: Add the correct endpoint

  // ========================= EMAIL APIS =========================
  sendBulkEmail: "/api/Settings/ManageNotification/CreateBulkEmail",

  // ========================= SMS APIS =========================
  sendBulkSMS: "/api/Settings/ManageNotification/CreateBulkSMS",

  // ========================= LOYALTY OUTLET TYPES APIS =========================
  getOutletConfigTypeList: "/api/User/AdminHabtoor/GetOutletConfigTypeList",
  createLoyaltyOutletTypes: "/api/User/AdminHabtoor/CreateLoyaltyOutletTypes",
  updateLoyaltyOutletTypes: "/api/User/AdminHabtoor/UpdateLoyaltyOutletTypes",
  getLoyaltyOutletTypes: "/api/User/AdminHabtoor/GetLoyaltyOutletTypes",
  deleteLoyaltyOutletTypes: "/api/User/AdminHabtoor/DeleteLoyaltyOutletTypes",

  // ========================= MAJOR GROUPS APIS =========================
  getMajorGroups: "/api/User/AdminHabtoor/GetMajorgroupList",
  createMajorGroup: "/api/User/AdminHabtoor/CreateMajorgroup",
  updateMajorGroup: "/api/User/AdminHabtoor/UpdateMajorgroup",
  deleteMajorGroup: "/api/User/AdminHabtoor/UpdateMajorgroup",

  // ========================= BENEFIT APIS =========================
  createBenefit: "/api/User/AdminHabtoor/CreateMembershipBenefits",
  editBenefit: "/api/User/AdminHabtoor/UpdateMembershipBenefits",
  benefitList: "/api/User/AdminHabtoor/GetMembershipBenefits",
  benefit: "/benefits/detail", //TODO: Add the correct endpoint
  deleteBenefit: "/api/User/AdminHabtoor/DeleteMembershipBenefits",
  publishBenefit: "/benefits/publish", //TODO: Add the correct endpoint

  // ========================= EVENT APIS =========================
  createEvent: "/api/Events/WinterGarden/CreateEvent",
  editEvent: "/api/Events/WinterGarden/UpdateEvent",
  eventList: "/api/Events/WinterGarden/GetAllEventsList",
  event: "/api/Events/WinterGarden/FindEvent",
  deleteEvent: "/events/delete", //TODO: Add the correct endpoint
  publishEvent: "/api/Events/WinterGarden/PublishEvents",
  getWalletList: "/api/Events/WinterGarden/GetEventWalletReport",

  // ========================= REPORTS APIS =========================
  totalSpendReport: "/api/Admin/Reports/SearchMemberTotalSpendReport",
  pointExpiryReport: "/api/Admin/Reports/SearchMemberPointExpiryReport",
  affiliatedReport: "/api/Admin/Reports/SearchMemberAffiliatedReport",
  staffIncentiveReport: "/api/Admin/Reports/SearchStaffIncentiveReport",
  loyaltyTransactionReport: "/api/Admin/Reports/SearchLoyaltyTransactionReport",

  // ========================= REPORTS Download APIS =========================
  downloadLoyaltyTransactionReport:
    "/api/Admin/Reports/GetExportToExcelLoyaltyTransactionReport",

  downloadTotalSpendReport:
    "/api/Admin/Reports/GetExportToExcelTotalSpendReport",
  downloadPointExpiryReport:
    "/api/Admin/Reports/GetExportToExcelMemberPointExpiryReport",
  downloadAffiliatedReport:
    "/api/Admin/Reports/GetExcelExportMemberAffiliatedReport",
  downloadStaffIncentiveReport:
    "/api/Admin/Reports/GetExelExportStaffIncentiveReport",
  // ========================= MENU APIS =========================
  getMenus: "/api/Admin/Role/GetMenuItems",
  updateMenus: "/api/Admin/Role/UpdateMenuItems",

  // ========================= Simphony APIS =========================
  simphonyRVCOutlets: "/api/Admin/RVCOutlet/GetRewardsProOutletInfo",
  simphonyPropertyList: "/api/User/AdminHabtoor/GetRewardsProPropertyInfo",
};
