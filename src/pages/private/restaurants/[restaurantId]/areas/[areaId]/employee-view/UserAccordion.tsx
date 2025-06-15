import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import UserCard from "./UserCard";

// User Accordion Component
const UserAccordion = ({
  users,
  getUserSeatedTables,
  onSeatUser,
  onCancelUser,
  onUnseatUser,
  onShowSeatedTables,
}) => {
  const groupUsersByStatus = (users) => {
    return users.reduce((acc, user) => {
      if (!acc[user.status]) {
        acc[user.status] = [];
      }
      acc[user.status].push(user);
      return acc;
    }, {});
  };

  const statusConfig = {
    waiting: { label: "Waiting", color: "text-yellow-600" },
    confirmed: { label: "Confirmed", color: "text-green-600" },
    seated: { label: "Seated", color: "text-blue-600" },
    cancelled: { label: "Cancelled", color: "text-red-600" },
  };

  const groupedUsers = groupUsersByStatus(users);
  const orderedStatuses = ["waiting", "confirmed", "seated", "cancelled"];

  return (
    <Accordion
      type="multiple"
      defaultValue={["waiting", "confirmed", "seated"]}
      className="w-full"
    >
      {orderedStatuses.map((status) => {
        const statusUsers = groupedUsers[status] || [];
        const config = statusConfig[status];

        if (statusUsers.length === 0) return null;

        return (
          <AccordionItem key={status} value={status}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${config.color}`}>
                  {config.label}
                </span>
                <Badge variant="secondary" className="ml-2">
                  {statusUsers.length}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2 px-1 max-h-96 overflow-y-auto">
                {statusUsers.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    seatedTables={getUserSeatedTables(user.id)}
                    onSeatUser={onSeatUser}
                    onCancelUser={onCancelUser}
                    onUnseatUser={onUnseatUser}
                    onShowSeatedTables={onShowSeatedTables}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default UserAccordion;
