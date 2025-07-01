import { TableIcons as Tables } from "@/utils/assets";

const getTableIcon = (type: string) => {
  switch (type) {
    case "hexagon-6":
      return Tables.TableHexagon6Icon;
    case "oval-6":
      return Tables.TableOval6Icon;
    case "oval-8":
      return Tables.TableOval8Icon;
    case "rectangle-2":
      return Tables.TableRectangle2Icon;
    case "rectangle-4":
      return Tables.TableRectangle4Icon;
    case "rectangle-6":
      return Tables.TableRectangle6Icon;
    case "rectangle-8":
      return Tables.TableRectangle8Icon;
    case "round-3":
      return Tables.TableRound3Icon;
    case "round-6":
      return Tables.TableRound6Icon;
    case "round-8":
      return Tables.TableRound8Icon;
    case "round-9":
      return Tables.TableRound9Icon;
    case "round-10":
      return Tables.TableRound10Icon;
    case "square-4":
      return Tables.TableSquare4Icon;
    default:
      return null;
  }
};
export default getTableIcon;
