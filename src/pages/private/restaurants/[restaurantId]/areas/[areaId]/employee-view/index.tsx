import { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Clock,
  UserPlus,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import getTableIcon from "./getTableIcon";
import BookingDialogForm from "./BookingDialogForm";

// Mock API Data
const MOCK_USERS = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john.smith@email.com",
    party_size: 2,
    reservation_time: "7:30 PM",
    status: "waiting",
    phone: "+1-555-0123",
    avatar: null,
  },
  {
    id: "user-2",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    party_size: 4,
    reservation_time: "8:00 PM",
    status: "confirmed",
    phone: "+1-555-0456",
    avatar: null,
  },
  {
    id: "user-3",
    name: "Mike Wilson",
    email: "mike.w@email.com",
    party_size: 6,
    reservation_time: "8:30 PM",
    status: "waiting",
    phone: "+1-555-0789",
    avatar: null,
  },
  {
    id: "user-4",
    name: "Emily Davis",
    email: "emily.d@email.com",
    party_size: 3,
    reservation_time: "9:00 PM",
    status: "confirmed",
    phone: "+1-555-0321",
    avatar: null,
  },
  {
    id: "user-5",
    name: "David Brown",
    email: "david.brown@email.com",
    party_size: 2,
    reservation_time: "9:30 PM",
    status: "waiting",
    phone: "+1-555-0654",
    avatar: null,
  },
];

// Table status configurations
const TABLE_STATUSES = {
  available: {
    color: "bg-green-600",
    textColor: "text-green-600",
    label: "Available",
    badgeTextColor: "text-white",
  },
  seated: {
    color: "bg-blue-600",
    textColor: "text-blue-600",
    label: "Seated",
    badgeTextColor: "text-white",
  },
  cleaning: {
    color: "bg-yellow-600",
    textColor: "text-yellow-600",
    label: "Cleaning",
    badgeTextColor: "text-white",
  },
  maintenance: {
    color: "bg-gray-600",
    textColor: "text-gray-600",
    label: "Maintenance",
    badgeTextColor: "text-white",
  },
};

// Simple table icon component
const TableIcon = ({
  tableType,
  status,
  width,
  height,
  scale = 1,
  isSelected = false,
}) => {
  const statusConfig = TABLE_STATUSES[status] || TABLE_STATUSES.available;

  const getTableShape = () => {
    if (tableType.includes("round")) {
      return "rounded-full";
    } else if (tableType.includes("rectangle")) {
      return "rounded-lg";
    }
    return "rounded-md";
  };
  const IconComponent = getTableIcon(tableType);
  if (!IconComponent) {
    return (
      <div
        className={`
        ${statusConfig.color} 
        ${getTableShape()} 
        border-2 
        ${isSelected ? "border-blue-400 border-4" : "border-gray-300"}
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

        ${isSelected ? "border-blue-400 border-4" : "border-gray-300"}

${statusConfig.textColor} border-current  bg-opacity-80`}
      style={{ width: `${width * scale}px`, height: `${height * scale}px` }}
    />
  );
};

const UserCard = ({
  user,
  seatedTables = [],
  onSeatUser,
  onCancelUser,
  onUnseatUser,
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

  return (
    <Card className="transition-all p-0 duration-200 hover:shadow-md">
      <CardContent className="p-3">
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
            <div className="flex gap-2 mt-3">
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
      </CardContent>
    </Card>
  );
};

// Helper function to group users by status
const groupUsersByStatus = (users) => {
  return users.reduce((acc, user) => {
    if (!acc[user.status]) {
      acc[user.status] = [];
    }
    acc[user.status].push(user);
    return acc;
  }, {});
};

// Status display configuration
const statusConfig = {
  waiting: {
    label: "Waiting",
    color: "text-yellow-600",
  },
  confirmed: {
    label: "Confirmed",
    color: "text-green-600",
  },
  seated: {
    label: "Seated",
    color: "text-blue-600",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-600",
  },
};

// Main component usage
const UserAccordion = ({
  users,
  getUserSeatedTables,
  onSeatUser,
  onCancelUser,
  onUnseatUser,
}) => {
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

// Main Component
const RestaurantTableManager = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState(1);

  // State management
  const [users, setUsers] = useState(MOCK_USERS);
  const [selectedTables, setSelectedTables] = useState([]);
  const [tableAssignments, setTableAssignments] = useState({});
  const [pendingUser, setPendingUser] = useState(null);

  // Original canvas dimensions
  const originalCanvasConfig = {
    width: 800,
    height: 494,
  };

  const [tables, setTables] = useState([
    {
      id: "table-1",
      tableNumber: 1,
      tableType: "square-4",
      tableStatus: "available",
      position: { x: 150, y: 80 },
      width: 80,
      height: 60,
      capacity: 4,
    },
    {
      id: "table-2",
      tableNumber: 2,
      tableType: "round-6",
      tableStatus: "available",
      position: { x: 300, y: 80 },
      width: 80,
      height: 80,
      capacity: 6,
    },
    {
      id: "table-3",
      tableNumber: 3,
      tableType: "rectangle-6",
      tableStatus: "available",
      position: { x: 480, y: 80 },
      width: 60,
      height: 60,
      capacity: 6,
    },
    {
      id: "table-4",
      tableNumber: 4,
      tableType: "square-4",
      tableStatus: "available",
      position: { x: 150, y: 200 },
      width: 80,
      height: 60,
      capacity: 4,
    },
    {
      id: "table-5",
      tableNumber: 5,
      tableType: "round-6",
      tableStatus: "available",
      position: { x: 300, y: 200 },
      width: 70,
      height: 70,
      capacity: 4,
    },
    {
      id: "table-6",
      tableNumber: 6,
      tableType: "square-4",
      tableStatus: "available",
      position: { x: 480, y: 200 },
      width: 60,
      height: 50,
      capacity: 2,
    },
    {
      id: "table-8",
      tableNumber: 8,
      tableType: "round-6",
      tableStatus: "available",
      position: { x: 450, y: 320 },
      width: 80,
      height: 80,
      capacity: 6,
    },
  ]);

  // Calculate responsive scale
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const availableWidth = containerWidth - 40;
        const maxScale = Math.min(
          1.2,
          availableWidth / originalCanvasConfig.width,
        );
        const scale = Math.max(0.4, maxScale);
        setCanvasScale(scale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Scaled canvas dimensions
  const scaledCanvasConfig = {
    width: originalCanvasConfig.width * canvasScale,
    height: originalCanvasConfig.height * canvasScale,
  };

  // Table management functions
  const handleTableClick = (tableId) => {
    if (!pendingUser) return;

    setSelectedTables((prev) => {
      if (prev.includes(tableId)) {
        return prev.filter((id) => id !== tableId);
      } else {
        return [...prev, tableId];
      }
    });
  };

  // User management functions
  const handleSeatUser = (user) => {
    setPendingUser(user);
    setSelectedTables([]);
  };

  const handleCancelUser = (user) => {
    // Update user status to cancelled
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: "cancelled" } : u)),
    );

    // Remove any table assignments for this user
    const newAssignments = { ...tableAssignments };
    Object.keys(newAssignments).forEach((tableId) => {
      if (newAssignments[tableId]?.id === user.id) {
        delete newAssignments[tableId];
      }
    });
    setTableAssignments(newAssignments);

    // Update table statuses
    setTables((prev) =>
      prev.map((table) => ({
        ...table,
        tableStatus: newAssignments[table.id] ? "seated" : "available",
      })),
    );
  };

  const handleUnseatUser = (user) => {
    // Remove table assignments for this user
    const newAssignments = { ...tableAssignments };
    Object.keys(newAssignments).forEach((tableId) => {
      if (newAssignments[tableId]?.id === user.id) {
        delete newAssignments[tableId];
      }
    });
    setTableAssignments(newAssignments);

    // Update table statuses
    setTables((prev) =>
      prev.map((table) => ({
        ...table,
        tableStatus: newAssignments[table.id] ? "seated" : "available",
      })),
    );

    // Update user status back to confirmed
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: "confirmed" } : u)),
    );
  };

  const confirmSeating = () => {
    if (!pendingUser || selectedTables.length === 0) return;

    const newAssignments = { ...tableAssignments };

    // Remove previous assignments for this user
    Object.keys(newAssignments).forEach((tableId) => {
      if (newAssignments[tableId]?.id === pendingUser.id) {
        delete newAssignments[tableId];
      }
    });

    // Add new assignments
    selectedTables.forEach((tableId) => {
      newAssignments[tableId] = pendingUser;
    });

    setTableAssignments(newAssignments);

    // Update table statuses
    setTables((prev) =>
      prev.map((table) => ({
        ...table,
        tableStatus: selectedTables.includes(table.id)
          ? "seated"
          : newAssignments[table.id]
            ? "seated"
            : "available",
      })),
    );

    // Update user status
    setUsers((prev) =>
      prev.map((user) => ({
        ...user,
        status: user.id === pendingUser.id ? "seated" : user.status,
      })),
    );

    // Clear selections
    setSelectedTables([]);
    setPendingUser(null);
  };

  const cancelSeating = () => {
    setPendingUser(null);
    setSelectedTables([]);
  };

  const updateTableStatus = (tableId, newStatus) => {
    setTables((prev) =>
      prev.map((table) =>
        table.id === tableId ? { ...table, tableStatus: newStatus } : table,
      ),
    );

    // If setting to available, remove assignment
    if (newStatus === "available" && tableAssignments[tableId]) {
      const newAssignments = { ...tableAssignments };
      delete newAssignments[tableId];
      setTableAssignments(newAssignments);
    }
  };

  const clearAllAssignments = () => {
    setTableAssignments({});
    setTables((prev) =>
      prev.map((table) => ({ ...table, tableStatus: "available" })),
    );
    setUsers((prev) =>
      prev.map((user) => ({
        ...user,
        status: user.status === "seated" ? "confirmed" : user.status,
      })),
    );
    setSelectedTables([]);
    setPendingUser(null);
  };

  const getUserSeatedTables = (userId) => {
    return Object.entries(tableAssignments)
      .filter(([_, user]) => user?.id === userId)
      .map(([tableId, _]) => {
        const table = tables.find((t) => t.id === tableId);
        return table?.tableNumber;
      })
      .filter(Boolean);
  };

  return (
    <div className="w-full mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Canvas Container */}
        <div className="xl:col-span-2 space-y-4">
          <Card>
            <CardContent className="pt-4">
              <div ref={containerRef} className="w-full">
                <div className="flex justify-center">
                  <div
                    ref={canvasRef}
                    className="relative border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
                    style={{
                      width: scaledCanvasConfig.width,
                      height: scaledCanvasConfig.height,
                      backgroundImage: `linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)`,
                      backgroundSize: "auto",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, #666 1px, transparent 1px),
                          linear-gradient(to bottom, #666 1px, transparent 1px)
                        `,
                        backgroundSize: `${Math.max(30, 50 * canvasScale)}px ${Math.max(30, 50 * canvasScale)}px`,
                      }}
                    />

                    {/* Tables */}
                    {tables.map((table) => (
                      <div
                        key={table.id}
                        className={`absolute transition-all duration-200 hover:scale-105 ${
                          pendingUser ? "cursor-pointer" : ""
                        }`}
                        style={{
                          left: `${table.position.x * canvasScale}px`,
                          top: `${table.position.y * canvasScale}px`,
                        }}
                        onClick={() => handleTableClick(table.id)}
                      >
                        <div className="relative">
                          <TableIcon
                            tableType={table.tableType}
                            status={table.tableStatus}
                            width={table.width}
                            height={table.height}
                            scale={canvasScale}
                            isSelected={selectedTables.includes(table.id)}
                          />

                          {/* Table Number */}
                          <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{
                              fontSize: `${Math.max(12, 16 * canvasScale)}px`,
                            }}
                          >
                            <span className="text-white font-bold drop-shadow-lg">
                              {table.tableNumber}
                            </span>
                          </div>

                          {/* Assignment Badge */}
                          <TableAssignmentBadge
                            assignment={tableAssignments[table.id]}
                            scale={canvasScale}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Seating Instructions */}
                {pendingUser && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-blue-800 font-semibold">
                          Seating: {pendingUser.name} (Party of{" "}
                          {pendingUser.party_size})
                        </p>
                        <p className="text-xs text-blue-600">
                          Click on available tables to select them
                        </p>
                        {selectedTables.length > 0 && (
                          <p className="text-xs text-blue-600 mt-1">
                            Selected: Table{" "}
                            {selectedTables
                              .map((tableId) => {
                                const table = tables.find(
                                  (t) => t.id === tableId,
                                );
                                return table?.tableNumber;
                              })
                              .join(", ")}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={confirmSeating}
                          disabled={selectedTables.length === 0}
                        >
                          <CheckCircle size={14} className="mr-1" />
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelSeating}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              {/* Status Legend */}
              <h1 className="text-2xl underline font-semibold">Legend</h1>
              <div className="flex flex-wrap gap-2">
                {Object.entries(TABLE_STATUSES).map(([status, config]) => (
                  <Badge
                    key={status}
                    className={`${config.color} ${config.badgeTextColor}`}
                  >
                    {config.label}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* User Management */}
        <div className="space-y-4">
          <Card className="px-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Customers ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-1 max-h-[500px] overflow-y-auto">
              <UserAccordion
                users={users}
                getUserSeatedTables={getUserSeatedTables}
                onSeatUser={handleSeatUser}
                onCancelUser={handleCancelUser}
                onUnseatUser={handleUnseatUser}
              />
            </CardContent>
            <CardFooter className="">
              <BookingDialogForm />
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Quick Actions & Controls */}
      <div className="grid grid-cols-1 gap-4">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                tables.forEach((table) =>
                  updateTableStatus(table.id, "available"),
                )
              }
            >
              Set All Available
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                tables.forEach((table) =>
                  updateTableStatus(table.id, "cleaning"),
                )
              }
            >
              Set All Cleaning
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() =>
                tables.forEach((table) =>
                  updateTableStatus(table.id, "maintenance"),
                )
              }
            >
              Set All Under Maintenance
            </Button>
            <Button
              variant="destructive"
              className="w-full"
              onClick={clearAllAssignments}
            >
              Clear All Assignments
            </Button>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4   text-center gap-6">
              <div>
                <p className="text-gray-500 text-base mb-2">Available Tables</p>
                <p className="font-semibold text-green-600 ">
                  {tables.filter((t) => t.tableStatus === "available").length}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-base mb-2">Seated Guests</p>
                <p className="font-semibold text-blue-600 ">
                  {Object.keys(tableAssignments).length}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-base mb-2">Waiting Guests</p>
                <p className="font-semibold text-yellow-600">
                  {users.filter((u) => u.status === "waiting").length}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-base mb-2">Cancelled</p>
                <p className="font-semibold text-red-600 ">
                  {users.filter((u) => u.status === "cancelled").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RestaurantTableManager;
