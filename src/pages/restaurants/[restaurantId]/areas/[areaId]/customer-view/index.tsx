import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router"; // Import useParams
import { Canvas } from "@/components/canvas/Canvas";
import { Button } from "@/components/ui/button";
import { AreaCanvasProvider, useAreaCanvas } from "@/context/AreaCanvasContext"; // Import AreaCanvasProvider
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ElementData } from "@/types"; // Import ElementData

// Define TableStatus type based on your context
type TableStatus = "available" | "occupied" | "reserved";

// This is the main CustomerView component that will extract URL params and wrap
// the content with AreaCanvasProvider.
const CustomerViewPage: React.FC = () => {
  // Extract parameters from the URL
  const { restaurantId, areaId } = useParams<{
    restaurantId: string;
    areaId: string;
  }>();

  // Render the AreaCanvasProvider and its children
  // Pass the extracted restaurantId and areaId to the provider
  return (
    <AreaCanvasProvider
      restaurantId={restaurantId || "default-restaurant"}
      areaId={areaId || "default-area"}
    >
      {/* Render the inner content which will use the context */}
      <CustomerViewContent />
    </AreaCanvasProvider>
  );
};

// This component will contain the actual logic and UI of the Customer View
// It is now rendered inside the AreaCanvasProvider and can safely use useAreaCanvas.
const CustomerViewContent: React.FC = () => {
  const { state, dispatch } = useAreaCanvas();
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [filter, setFilter] = useState<
    "all" | "available" | "occupied" | "reserved"
  >("all");

  // Extract table elements from the context state
  const tables: ElementData[] = useMemo(() => {
    return state.elements.filter((el) => el.type === "table");
  }, [state.elements]);

  // Handle table click for reservation or viewing details
  const handleTableClick = (tableId: string) => {
    const table = tables.find((t) => t.id === tableId);
    if (table) {
      // In customer view, we only allow making a reservation if available.
      if (
        table.tableStatus === undefined ||
        table.tableStatus === "available"
      ) {
        setSelectedTableId(tableId);
        setIsReservationOpen(true);
      }
    }
  };

  // Handle reservation logic
  const handleReservation = () => {
    if (selectedTableId && customerName) {
      const tableElement = tables.find((el) => el.id === selectedTableId);
      if (tableElement) {
        const updatedElement: ElementData = {
          ...tableElement,
          tableStatus: "occupied" as TableStatus, // Set status directly
          customerId: customerName, // Store customer identifier
        };
        dispatch({ type: "UPDATE_ELEMENT", payload: updatedElement });
      }
    }
    // Reset state and close dialog
    setIsReservationOpen(false);
    setCustomerName("");
    setSelectedTableId(null);
  };

  // Filter tables based on selected status
  const filteredTables = useMemo(() => {
    return tables.filter((table) => {
      const status = table.tableStatus || "available"; // Default to available if status is undefined
      if (filter === "available") return status === "available";
      if (filter === "occupied") return status === "occupied";
      if (filter === "reserved") return status === "reserved";
      return true; // 'all' filter
    });
  }, [tables, filter]);

  // Prepare tableStatuses object for the Canvas component
  const tableStatusesForCanvas: any = useMemo(() => {
    return Object.fromEntries(
      tables.map((t) => [t.id, t.tableStatus || "available"]),
    );
  }, [tables]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Customer View</h1>
        <Button variant="outline" asChild>
          {/* Adjust the Link 'to' prop based on your routing setup */}
          <Link to="/">Back to Manager</Link>
        </Button>
      </div>

      <div className="flex items-center justify-center">
        {/* Pass tableStatuses to the Canvas component */}
        <Canvas isEditable={false} tableStatuses={tableStatusesForCanvas} />
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Table Status</h2>
          <div className="space-x-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "available" ? "default" : "outline"}
              onClick={() => setFilter("available")}
            >
              Available
            </Button>
            <Button
              variant={filter === "occupied" ? "default" : "outline"}
              onClick={() => setFilter("occupied")}
            >
              Occupied
            </Button>
            <Button
              variant={filter === "reserved" ? "default" : "outline"}
              onClick={() => setFilter("reserved")}
            >
              Reserved
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredTables.map((table) => {
            const status = table.tableStatus || "available";
            return (
              <div
                key={table.id}
                className={`p-4 border rounded-md cursor-pointer transition-colors duration-200 ${
                  status === "occupied"
                    ? "bg-red-100 border-red-300"
                    : status === "reserved"
                      ? "bg-yellow-100 border-yellow-300"
                      : "bg-green-100 border-green-300 hover:bg-green-200"
                } ${status !== "available" && "opacity-60 cursor-not-allowed"}`}
                onClick={() =>
                  status === "available" && handleTableClick(table.id)
                }
              >
                <h3 className="font-medium">
                  Table{" "}
                  {table.tableNumber || table.label || table.id.substring(0, 4)}
                </h3>
                <p>
                  Status: {status.charAt(0).toUpperCase() + status.slice(1)}
                </p>
                {(status === "occupied" || status === "reserved") &&
                  table.customerId && <p>Reserved by: {table.customerId}</p>}
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={isReservationOpen} onOpenChange={setIsReservationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Make a Reservation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Your Name</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <Button onClick={handleReservation} disabled={!customerName}>
              Reserve Table
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerViewPage;
