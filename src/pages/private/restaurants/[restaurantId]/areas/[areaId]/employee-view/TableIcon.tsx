import getTableIcon from "./getTableIcon";
import { TABLE_STATUSES } from "./constants";

// Table Icon Component
const TableIcon = ({
  tableType,
  status,
  width,
  height,
  scale = 1,
  isSelected = false,
}) => {
  const statusConfig = TABLE_STATUSES[status] || TABLE_STATUSES.available;

  const IconComponent = getTableIcon(tableType);
  if (!IconComponent) {
    return (
      <div
        className={`
        ${statusConfig.color}
        border-2
        rounded-full
        ${isSelected ? "border-blue-400 border-2" : "border-gray-300"}
        flex items-center justify-center
        transition-all duration-200
        shadow-md
      `}
        style={{
          width: `${width * scale}px`,
          height: `${height * scale}px`,
          opacity: 0.9,
        }}
      />
    );
  }

  return (
    <IconComponent
      className={`w-full h-full
        ${isSelected ? "border-blue-400 border-2" : "border-gray-300"}
        ${statusConfig.textColor} border-current bg-opacity-80`}
      style={{ width: `${width * scale}px`, height: `${height * scale}px` }}
    />
  );
};

export default TableIcon;
