import { Users } from "lucide-react";

// Table Assignment Badge Component
const TableAssignmentBadge = ({ assignment, scale = 1 }) => {
  if (!assignment) return null;

  return (
    <div
      className="absolute -top-2 -right-2 bg-white rounded-full border-2 border-blue-500 shadow-lg p-1"
      style={{ fontSize: `${Math.max(8, 10 * scale)}px` }}
    >
      <div className="flex items-center gap-1 px-2 py-1">
        <Users size={Math.max(12, 14 * scale)} className="text-blue-600" />
        <span className="text-blue-600 font-semibold">
          {assignment.party_size}
        </span>
      </div>
    </div>
  );
};

export default TableAssignmentBadge;
