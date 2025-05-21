import { RoomLayouts } from "./assets";
const isTesting = import.meta.env.VITE_TESTING === "true";
const permissionBased = import.meta.env.VITE_PERMISSION_BASED !== "false";
const devMode = import.meta.env.DEV;
const globalDateInputFormat = "yyyy-MM-dd'T'HH:mm:ss";
const globalDateDisplayFormat = "PPP";
const roomLayouts = [
  { img: RoomLayouts.RoomLayout1, alt: "Roomlayout1" },
  { img: RoomLayouts.RoomLayout2, alt: "Roomlayout2" },
];
export {
  isTesting,
  permissionBased,
  devMode,
  globalDateDisplayFormat,
  globalDateInputFormat,
  roomLayouts,
};
