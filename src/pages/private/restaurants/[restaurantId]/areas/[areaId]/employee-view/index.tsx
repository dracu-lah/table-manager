import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, EyeOff } from "lucide-react";

import TableRenderer from "./TableRenderer";
import UserAccordion from "./UserAccordion";
import SelectionPanel from "./SelectionPanel";
import { MOCK_USERS, MOCK_TABLES, TABLE_STATUSES } from "./constants";

// Main Component
const RestaurantTableManager = () => {
  const containerRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState(1);

  // State management
  const [users, setUsers] = useState(MOCK_USERS);
  const [tables, setTables] = useState(MOCK_TABLES);
  const [selectedTables, setSelectedTables] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tableAssignments, setTableAssignments] = useState({});
  const [highlightedTables, setHighlightedTables] = useState([]);
  const [showSeatedHighlight, setShowSeatedHighlight] = useState(false);

  // Calculate responsive scale
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const availableWidth = containerWidth - 40; // Account for padding/margins
        const maxScale = Math.min(1.2, availableWidth / 800);
        const scale = Math.max(0.4, maxScale); // Ensure minimum scale
        setCanvasScale(scale);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Table selection handler
  const handleTableSelect = (tableId) => {
    const table = tables.find((t) => t.id === tableId);
    // Only allow selection of 'available' tables
    if (!table || table.tableStatus !== "available") return;

    setSelectedTables((prev) => {
      if (prev.includes(tableId)) {
        return prev.filter((id) => id !== tableId);
      } else {
        return [...prev, tableId];
      }
    });
    // Clear any active seated table highlighting when selecting new tables
    setShowSeatedHighlight(false);
    setHighlightedTables([]);
  };

  // User selection handler for seating
  const handleSeatUser = (user) => {
    if (user.status !== "waiting" && user.status !== "confirmed") return;
    setSelectedUser(user);
    // Clear any active seated table highlighting when selecting a user
    setShowSeatedHighlight(false);
    setHighlightedTables([]);
  };

  // Show seated tables for a user
  const handleShowSeatedTables = (user) => {
    const userTables = Object.entries(tableAssignments)
      .filter(([_, assignedUser]) => assignedUser?.id === user.id)
      .map(([tableId, _]) => tableId);

    setHighlightedTables(userTables);
    setShowSeatedHighlight(true);
    setSelectedTables([]); // Clear table selection when highlighting
    setSelectedUser(null); // Clear user selection when highlighting
  };

  // Confirm seating
  const handleConfirmSeating = () => {
    if (!selectedUser || selectedTables.length === 0) {
      console.warn("Cannot confirm seating: No user or tables selected.");
      return;
    }

    const newAssignments = { ...tableAssignments };
    const tablesToUpdateStatus = new Set();

    // 1. Unassign user from any previously assigned tables
    // and revert those tables to 'available' if no other user is assigned
    Object.entries(newAssignments).forEach(([tableId, assignedUser]) => {
      if (assignedUser?.id === selectedUser.id) {
        delete newAssignments[tableId];
        tablesToUpdateStatus.add(tableId); // Mark for status update
      }
    });

    // 2. Assign the user to the newly selected tables
    selectedTables.forEach((tableId) => {
      newAssignments[tableId] = selectedUser;
      tablesToUpdateStatus.add(tableId); // Mark for status update
    });

    setTableAssignments(newAssignments);

    // 3. Update table statuses based on new assignments
    setTables((prevTables) =>
      prevTables.map((table) => {
        if (tablesToUpdateStatus.has(table.id)) {
          return {
            ...table,
            tableStatus: newAssignments[table.id] ? "seated" : "available",
          };
        }
        return table;
      }),
    );

    // 4. Update user status to 'seated'
    setUsers((prevUsers) =>
      prevUsers.map((user) => ({
        ...user,
        status: user.id === selectedUser.id ? "seated" : user.status,
      })),
    );

    // 5. Clear selections
    setSelectedTables([]);
    setSelectedUser(null);
  };

  // Cancel selection
  const handleCancelSelection = () => {
    setSelectedTables([]);
    setSelectedUser(null);
    setShowSeatedHighlight(false);
    setHighlightedTables([]);
  };

  // Cancel user reservation
  const handleCancelUser = (user) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: "cancelled" } : u)),
    );

    // Remove table assignments
    const newAssignments = { ...tableAssignments };
    const tablesToUpdateStatus = new Set();

    Object.keys(newAssignments).forEach((tableId) => {
      if (newAssignments[tableId]?.id === user.id) {
        delete newAssignments[tableId];
        tablesToUpdateStatus.add(tableId);
      }
    });
    setTableAssignments(newAssignments);

    // Update table statuses (if a table is no longer assigned, set to available)
    setTables((prevTables) =>
      prevTables.map((table) => {
        if (tablesToUpdateStatus.has(table.id)) {
          return {
            ...table,
            tableStatus: newAssignments[table.id] ? "seated" : "available",
          };
        }
        return table;
      }),
    );

    // If the cancelled user was selected, clear selection
    if (selectedUser?.id === user.id) {
      handleCancelSelection();
    }
  };

  // Unseat user
  const handleUnseatUser = (user) => {
    const newAssignments = { ...tableAssignments };
    const tablesToUpdateStatus = new Set();

    Object.keys(newAssignments).forEach((tableId) => {
      if (newAssignments[tableId]?.id === user.id) {
        delete newAssignments[tableId];
        tablesToUpdateStatus.add(tableId);
      }
    });
    setTableAssignments(newAssignments);

    setTables((prevTables) =>
      prevTables.map((table) => {
        if (tablesToUpdateStatus.has(table.id)) {
          return {
            ...table,
            tableStatus: newAssignments[table.id] ? "seated" : "available",
          };
        }
        return table;
      }),
    );

    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === user.id ? { ...u, status: "confirmed" } : u,
      ),
    );

    // If the unseated user was selected, clear selection
    if (selectedUser?.id === user.id) {
      handleCancelSelection();
    }
  };

  // Get seated tables for a user
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
        {/* Table Layout */}
        <div className="xl:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Restaurant Layout
                {showSeatedHighlight && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowSeatedHighlight(false);
                      setHighlightedTables([]);
                    }}
                  >
                    <EyeOff size={14} className="mr-1" />
                    Hide Highlight
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div ref={containerRef} className="w-full">
                <TableRenderer
                  tables={tables}
                  selectedTables={selectedTables}
                  highlightedTables={highlightedTables}
                  tableAssignments={tableAssignments}
                  canvasScale={canvasScale}
                  onTableSelect={handleTableSelect}
                  showSeatedHighlight={showSeatedHighlight}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <h4 className="text-lg font-semibold">Legend</h4>
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

          <SelectionPanel
            selectedTables={selectedTables}
            selectedUser={selectedUser}
            tables={tables}
            onConfirmSeating={handleConfirmSeating}
            onCancelSelection={handleCancelSelection}
          />
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
                onShowSeatedTables={handleShowSeatedTables}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Statistics */}
      {/* <Card> */}
      {/*   <CardHeader> */}
      {/*     <CardTitle>Statistics</CardTitle> */}
      {/*   </CardHeader> */}
      {/*   <CardContent> */}
      {/*     <div className="grid grid-cols-4 text-center gap-6"> */}
      {/*       <div> */}
      {/*         <p className="text-gray-500 text-base mb-2">Available Tables</p> */}
      {/*         <p className="font-semibold text-green-600"> */}
      {/*           {tables.filter((t) => t.tableStatus === "available").length} */}
      {/*         </p> */}
      {/*       </div> */}
      {/*       <div> */}
      {/*         <p className="text-gray-500 text-base mb-2">Seated Guests</p> */}
      {/*         <p className="font-semibold text-blue-600"> */}
      {/* Count unique users who are "seated" by looking at tableAssignments */}
      {/*           {new Set(Object.values(tableAssignments).map((a) => a.id)).size} */}
      {/*         </p> */}
      {/*       </div> */}
      {/*       <div> */}
      {/*         <p className="text-gray-500 text-base mb-2">Waiting Guests</p> */}
      {/*         <p className="font-semibold text-yellow-600"> */}
      {/*           {users.filter((u) => u.status === "waiting").length} */}
      {/*         </p> */}
      {/*       </div> */}
      {/*       <div> */}
      {/*         <p className="text-gray-500 text-base mb-2">Cancelled</p> */}
      {/*         <p className="font-semibold text-red-600"> */}
      {/*           {users.filter((u) => u.status === "cancelled").length} */}
      {/*         </p> */}
      {/*       </div> */}
      {/*     </div> */}
      {/*   </CardContent> */}
      {/* </Card> */}
    </div>
  );
};

export default RestaurantTableManager;
