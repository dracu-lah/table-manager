import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Clock, MapPin, UserPlus } from "lucide-react";
import getTableIcon from "./getTableIcon";
import { RoomLayouts } from "@/utils/assets";

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
  occupied: {
    color: "bg-red-600",
    textColor: "text-red-600",
    label: "Occupied",
    badgeTextColor: "text-white",
  },
  assigned: {
    color: "bg-blue-600",
    textColor: "text-blue-600",
    label: "Assigned",
    badgeTextColor: "text-white",
  },
  cleaning: {
    color: "bg-yellow-600",
    textColor: "text-yellow-600",
    label: "Cleaning",
    badgeTextColor: "text-white",
  },
  reserved: {
    color: "bg-purple-600",
    textColor: "text-purple-600",
    label: "Reserved",
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

// User Card Component
const UserCard = ({ user, isSelected, onSelect, assignedTables = [] }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "waiting":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "seated":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
      }`}
      onClick={() => onSelect(user.id)}
    >
      <CardContent className="p-4">
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
            <h4 className="font-semibold text-sm truncate">{user.name}</h4>
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

            <div className="flex items-center justify-between mt-2">
              <Badge className={`text-xs ${getStatusColor(user.status)}`}>
                {user.status}
              </Badge>

              {assignedTables.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  Table {assignedTables.join(", ")}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component
const RestaurantTableManager = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState(1);

  // State management
  const [users, setUsers] = useState(MOCK_USERS);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTables, setSelectedTables] = useState([]);
  const [tableAssignments, setTableAssignments] = useState({});

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
    setSelectedTables((prev) => {
      if (prev.includes(tableId)) {
        return prev.filter((id) => id !== tableId);
      } else {
        return [...prev, tableId];
      }
    });
  };

  const assignTablesToUser = () => {
    if (!selectedUser || selectedTables.length === 0) return;

    const newAssignments = { ...tableAssignments };

    // Remove previous assignments for this user
    Object.keys(newAssignments).forEach((tableId) => {
      if (newAssignments[tableId]?.id === selectedUser) {
        delete newAssignments[tableId];
      }
    });

    // Add new assignments
    selectedTables.forEach((tableId) => {
      const user = users.find((u) => u.id === selectedUser);
      newAssignments[tableId] = user;
    });

    setTableAssignments(newAssignments);

    // Update table statuses
    setTables((prev) =>
      prev.map((table) => ({
        ...table,
        tableStatus: selectedTables.includes(table.id)
          ? "assigned"
          : newAssignments[table.id]
            ? "assigned"
            : "available",
      })),
    );

    // Update user status
    setUsers((prev) =>
      prev.map((user) => ({
        ...user,
        status: user.id === selectedUser ? "seated" : user.status,
      })),
    );

    // Clear selections
    setSelectedTables([]);
    setSelectedUser(null);
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
    setSelectedUser(null);
  };

  const getUserAssignedTables = (userId) => {
    return Object.entries(tableAssignments)
      .filter(([_, user]) => user?.id === userId)
      .map(([tableId, _]) => {
        const table = tables.find((t) => t.id === tableId);
        return table?.tableNumber;
      })
      .filter(Boolean);
  };

  const bgImage = RoomLayouts.RoomLayout1;
  return (
    <div className="w-full mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Canvas Container */}
        <div className="xl:col-span-2 space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div ref={containerRef} className="w-full">
                <div className="flex justify-center">
                  <div
                    ref={canvasRef}
                    className="relative border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden"
                    style={{
                      width: scaledCanvasConfig.width,
                      height: scaledCanvasConfig.height,
                      backgroundImage: bgImage
                        ? `url(${bgImage})`
                        : `linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)`,
                      backgroundSize: bgImage ? "cover" : "auto",
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
                        className="absolute cursor-pointer transition-all duration-200 hover:scale-105"
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

                {/* Selection Info */}
                {selectedTables.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      Selected Tables:{" "}
                      {selectedTables
                        .map((tableId) => {
                          const table = tables.find((t) => t.id === tableId);
                          return table?.tableNumber;
                        })
                        .join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Status Legend */}
          <Card>
            <CardHeader>
              <CardTitle>Legend</CardTitle>
            </CardHeader>
            <CardContent className="">
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
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Customers ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  isSelected={selectedUser === user.id}
                  onSelect={setSelectedUser}
                  assignedTables={getUserAssignedTables(user.id)}
                />
              ))}
            </CardContent>
          </Card>

          {/* Assignment Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Table Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedUser && selectedTables.length > 0 ? (
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800">
                      Assign Table(s){" "}
                      {selectedTables
                        .map((tableId) => {
                          const table = tables.find((t) => t.id === tableId);
                          return table?.tableNumber;
                        })
                        .join(", ")}{" "}
                      to {users.find((u) => u.id === selectedUser)?.name}
                    </p>
                  </div>
                  <Button onClick={assignTablesToUser} className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Confirm Assignment
                  </Button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Select a customer and table(s) to assign
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Controls */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
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
                variant="destructive"
                className="w-full"
                onClick={clearAllAssignments}
              >
                Clear All Assignments
              </Button>
            </CardContent>
          </Card>

          {/* Table Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Table Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedTables.length === 1 ? (
                (() => {
                  const table = tables.find((t) => t.id === selectedTables[0]);
                  const assignment = tableAssignments[selectedTables[0]];
                  return (
                    <div className="space-y-4">
                      <div>
                        <Label>Table {table?.tableNumber}</Label>
                        <p className="text-sm text-gray-600">
                          Capacity: {table?.capacity} people
                        </p>
                        {assignment && (
                          <p className="text-sm text-blue-600">
                            Assigned to: {assignment.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label>Status</Label>
                        <Select
                          value={table?.tableStatus}
                          onValueChange={(value) =>
                            updateTableStatus(selectedTables[0], value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(TABLE_STATUSES).map(
                              ([status, config]) => (
                                <SelectItem key={status} value={status}>
                                  {config.label}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <Badge
                        className={`${TABLE_STATUSES[table?.tableStatus]?.color} ${TABLE_STATUSES[table?.tableStatus]?.badgeTextColor}`}
                      >
                        {TABLE_STATUSES[table?.tableStatus]?.label}
                      </Badge>
                    </div>
                  );
                })()
              ) : (
                <p className="text-gray-500">
                  Select a single table to modify its status
                </p>
              )}
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Available</p>
                  <p className="font-semibold text-green-600">
                    {tables.filter((t) => t.tableStatus === "available").length}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Occupied</p>
                  <p className="font-semibold text-red-600">
                    {tables.filter((t) => t.tableStatus === "occupied").length}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Assigned</p>
                  <p className="font-semibold text-blue-600">
                    {Object.keys(tableAssignments).length}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Waiting</p>
                  <p className="font-semibold text-yellow-600">
                    {users.filter((u) => u.status === "waiting").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantTableManager;
