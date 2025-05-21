import routePath from "@/router/routePath";
import {
  CircleUser,
  ClipboardPen,
  HandCoins,
  Home,
  MessageCircleHeart,
  UsersRound,
  Settings,
  ShieldPlusIcon,
  FileTerminal,
  HelpCircleIcon,
  InfoIcon,
  WalletIcon,
  TicketCheck,
  CalendarDaysIcon,
} from "lucide-react";

import menuKeys from "@/utils/constants/menuKeys";
import { BarChartIcon } from "lucide-react";
import { MessagesSquare } from "lucide-react";
export const menuConfig = [
  {
    key: menuKeys.DASHBOARD,
    icon: Home,
    label: "Dashboard ",
    route: routePath.dashboard,
  },
  {
    key: menuKeys.GUEST_MANAGEMENT,
    icon: UsersRound,
    label: "Guest ",
    route: routePath.guestManagement,
  },
  {
    key: menuKeys.USERS,
    icon: CircleUser,
    label: "Users",
    subMenu: [
      {
        key: menuKeys.ROLE_MANAGEMENT,
        label: "Manage Roles",
        route: routePath.roleManagement,
      },
      {
        key: menuKeys.USER_MANAGEMENT,
        label: "Manage Users",
        route: routePath.userManagement,
      },
    ],
  },
  {
    key: menuKeys.CONTENT_MANAGEMENT,
    icon: ClipboardPen,
    label: "App Content ",
    route: routePath.contentManagement,
  },
  {
    key: menuKeys.POINTS,
    icon: HandCoins,
    label: "Points ",
    subMenu: [
      {
        key: menuKeys.EARN_POINTS,
        label: "Earn Points ",
        route: routePath.earnPoints,
      },
      {
        key: menuKeys.BURN_POINTS,
        label: "Redeem Points ",
        route: routePath.burnPoints,
      },
      {
        key: menuKeys.REVERT_POINTS,
        label: "Revert Points ",
        route: routePath.revertPoints,
      },
    ],
  },
  {
    key: menuKeys.COUPON_MANAGEMENT,
    icon: TicketCheck,
    label: "Coupon ",
    route: routePath.couponManagement,
  },
  {
    key: menuKeys.EVENTS,
    icon: CalendarDaysIcon,
    label: "Events",
    route: routePath.events,
  },
  {
    key: menuKeys.FEEDBACK_MANAGEMENT,
    icon: MessageCircleHeart,
    label: "Feedbacks",
    route: routePath.feedbackManagement,
  },
  {
    key: menuKeys.CLAIM_POINTS_FEEDBACK_MANAGEMENT,
    icon: MessageCircleHeart,
    label: "Claims",
    route: routePath.claimPointsFeedbackManagement,
  },
  {
    key: menuKeys.COMMUNICATION_CENTER,
    icon: MessagesSquare,
    label: "Communication Center",
    subMenu: [
      {
        key: menuKeys.EMAIL_MANAGEMENT,
        label: "Email",
        subMenu: [
          {
            key: menuKeys.EMAIL_TEMPLATES,
            label: "Manage Email Templates",
            route: routePath.emailTemplates,
          },
          {
            key: menuKeys.SEND_EMAIL,
            label: "Send Email",
            route: routePath.sendEmail,
          },
        ],
      },
      {
        key: menuKeys.SMS_MANAGEMENT,
        label: "SMS",
        subMenu: [
          {
            key: menuKeys.SMS_TEMPLATES,
            label: "Manage SMS Templates",
            route: routePath.smsTemplates,
          },
          {
            key: menuKeys.SEND_SMS,
            label: "Send SMS",
            route: routePath.sendSms,
          },
        ],
      },
      {
        key: menuKeys.PUSH_MANAGEMENT,
        label: "Push Notifications",
        subMenu: [
          {
            key: menuKeys.PUSH_TEMPLATES,
            label: "Manage Push Templates",
            route: routePath.pushTemplates,
          },
          {
            key: menuKeys.SEND_PUSH,
            label: "Send Push Notification",
            route: routePath.sendPush,
          },
        ],
      },
    ],
  },
  {
    key: menuKeys.CONFIGURATIONS,
    icon: Settings,
    label: "Configurations",
    subMenu: [
      {
        key: menuKeys.LOCATIONS,
        label: "Locations",
        subMenu: [
          {
            key: menuKeys.ORGANIZATIONS,
            label: "Organizations",
            route: routePath.organizations,
          },
          {
            key: menuKeys.PROPERTIES,
            label: "Properties",
            route: routePath.propertyManagement,
          },
          {
            key: menuKeys.RVC_OUTLETS,
            label: "RVC Outlets",
            route: routePath.rvcOutlets,
          },
          {
            key: menuKeys.OUTLET_TYPES,
            label: "Outlet Types",
            route: routePath.outletTypes,
          },
        ],
      },
      {
        key: menuKeys.LOYALTY,
        label: "Loyalty",
        subMenu: [
          {
            key: menuKeys.MEMBERSHIP_PROGRAMS,
            label: "Loyalty Programs",
            route: routePath.membershipPrograms,
          },
          {
            key: menuKeys.MEMBERSHIP_TIER_TYPES,
            label: "Loyalty Tier Types",
            route: routePath.membershipTierTypes,
          },
          {
            key: menuKeys.MEMBERSHIP_TIERS,
            label: "Loyalty Tiers",
            route: routePath.membershipTiers,
          },
          {
            key: menuKeys.MEMBERSHIP_CATEGORIES,
            label: "Loyalty Categories",
            route: routePath.membershipCategories,
          },
        ],
      },
      {
        key: menuKeys.MAJOR_GROUP,
        label: "Major Group",
        route: routePath.majorGroup,
      },

      {
        key: menuKeys.POINTS_CONFIG,
        label: "Points",
        subMenu: [
          {
            key: menuKeys.POINTS_SETTINGS,
            label: "Loyalty Points",
            route: routePath.pointSettings,
          },
          {
            key: menuKeys.EARN_POINTS_CONFIG,
            label: "Earn Points",
            route: routePath.earnPointsConfig,
          },
          {
            key: menuKeys.BURN_POINTS_CONFIG,
            label: "Burn Points",
            route: routePath.burnPointsConfig,
          },
        ],
      },
      {
        key: menuKeys.DISCOUNTS,
        label: "Discounts",
        subMenu: [
          {
            key: menuKeys.DISCOUNT_SETTINGS,
            label: "Discount Settings",
            route: routePath.discountSettings,
          },
          {
            key: menuKeys.DISCOUNT_ITEMIZERS,
            label: "Discount Itemizers",
            route: routePath.discountItemizers,
          },
          {
            key: menuKeys.MICRO_DISCOUNTS,
            label: "Micros Discounts",
            route: routePath.microDiscounts,
          },
          {
            key: menuKeys.DISCOUNT_PROGRAMS,
            label: "Discount Programs",
            route: routePath.discountPrograms,
          },
          {
            key: menuKeys.MEMBERSHIP_DISCOUNTS,
            label: "Loyalty Discounts",
            route: routePath.membershipDiscounts,
          },
        ],
      },
    ],
  },
  {
    key: menuKeys.WALLET,
    icon: WalletIcon,
    label: "Wallet",
    route: routePath.wallet,
  },
  {
    key: menuKeys.INFO_CENTER,
    icon: InfoIcon,
    label: "Info Center",
    subMenu: [
      {
        key: menuKeys.PRIVACY_POLICY,
        icon: ShieldPlusIcon,
        label: "Privacy Policy",
        route: routePath.privacyPolicyManagement,
      },
      {
        key: menuKeys.ABOUT_US,
        icon: InfoIcon,
        label: "About Us",
        route: routePath.aboutUsManagement,
      },
      {
        key: menuKeys.TERMS_AND_CONDITIONS,
        icon: FileTerminal,
        label: "Terms & Conditions",
        route: routePath.termsAndConditionsManagement,
      },
      {
        key: menuKeys.FAQS,
        icon: HelpCircleIcon,
        label: "FAQs",
        route: routePath.faqs,
      },
    ],
  },

  {
    key: menuKeys.REPORTS,
    icon: BarChartIcon,
    label: "Reports",
    subMenu: [
      {
        key: menuKeys.LOYALTY_TRANSACTION_REPORT,
        label: "Loyalty Transaction Report",
        route: routePath.loyaltyTransactionReport,
      },

      {
        key: menuKeys.POINT_EXPIRY_REPORT,
        label: "Point Expiry Report",
        route: routePath.pointExpiryReport,
      },
      {
        key: menuKeys.TOTAL_SPEND_REPORT,
        label: "Total Spend Report",
        route: routePath.totalSpendReport,
      },

      {
        key: menuKeys.AFFILIATED_REPORT,
        label: "Affiliated Report",
        route: routePath.affiliatedReport,
      },
      {
        key: menuKeys.STAFF_INCENTIVE_REPORT,
        label: "Staff Incentive Report",
        route: routePath.staffIncentiveReport,
      },
    ],
  },
];

// Recursive function to find config item
const findConfigItem = (key, configArray) => {
  for (const config of configArray) {
    if (config.key === key) return config;
    if (config.submenus) {
      const found = findConfigItem(key, config.submenus);
      if (found) return found;
    }
  }
  return null;
};

// Reducer function to filter menu items based on config
export const reduceMenuItems = (menuItem, config) => {
  // Find corresponding config item
  const configItem = findConfigItem(menuItem.key, config);

  // If no config found or not enabled, filter out this item
  if (!configItem || !configItem.isEnabled) {
    return null;
  }

  // Handle submenu items
  if (menuItem.subMenu) {
    const filteredSubMenu = menuItem.subMenu
      .map((subItem) => reduceMenuItems(subItem, config))
      .filter(Boolean);

    // If no submenu items remain after filtering, filter out parent item
    if (filteredSubMenu.length === 0) {
      return null;
    }

    return {
      ...menuItem,
      subMenu: filteredSubMenu,
    };
  }

  // Return the item if it passes all checks
  return menuItem;
};
