import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Clock, UserPlus, X, AlertCircle, Eye } from "lucide-react";

// User Card Component
const UserCard = ({
  user,
  seatedTables = [],
  onSeatUser,
  onCancelUser,
  onUnseatUser,
  onShowSeatedTables,
}) => {
  const getStatusBadge = () => {
    switch (user.status) {
      case "waiting":
        return (
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-600"
          >
            Waiting
          </Badge>
        );
      case "confirmed":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Confirmed
          </Badge>
        );
      case "seated":
        return (
          <Badge variant="default" className="bg-blue-600">
            Seated
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  const canSeat = user.status === "waiting" || user.status === "confirmed";
  const canCancel = user.status !== "cancelled";
  const canUnseat = user.status === "seated";
  const canShowSeated = user.status === "seated" && seatedTables.length > 0;

  return (
    <div className="transition-all p-0 duration-200 hover:shadow-md border rounded-lg">
      <div className="p-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-sm truncate">{user.name}</h4>
              {getStatusBadge()}
            </div>
            <p className="text-xs text-gray-600 truncate">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Users size={12} className="text-gray-500" />
                <span className="text-xs">{user.party_size}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={12} className="text-gray-500" />
                <span className="text-xs">{user.reservation_time}</span>
              </div>
            </div>

            {seatedTables.length > 0 && (
              <div className="mt-2">
                <Badge variant="outline" className="text-xs">
                  Table {seatedTables.join(", ")}
                </Badge>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {canSeat && (
                <Button
                  size="sm"
                  variant="default"
                  className="h-7 text-xs"
                  onClick={() => onSeatUser(user)}
                >
                  <UserPlus size={12} className="mr-1" />
                  Seat
                </Button>
              )}

              {canShowSeated && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs text-purple-600 border-purple-300 hover:bg-purple-50"
                  onClick={() => onShowSeatedTables(user)}
                >
                  <Eye size={12} className="mr-1" />
                  View Tables
                </Button>
              )}

              {canUnseat && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs"
                  onClick={() => onUnseatUser(user)}
                >
                  <AlertCircle size={12} className="mr-1" />
                  Unseat
                </Button>
              )}

              {canCancel && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs text-red-600 border-red-300 hover:bg-red-50"
                  onClick={() => onCancelUser(user)}
                >
                  <X size={12} className="mr-1" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
