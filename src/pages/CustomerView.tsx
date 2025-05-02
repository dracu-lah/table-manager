import React, { useState } from "react";
import { Link } from "react-router";
import { Canvas } from "../components/canvas/Canvas";
import { Button } from "../components/ui/button";
import { useCanvas } from "../context/CanvasContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const CustomerView: React.FC = () => {
  const { state, dispatch } = useCanvas();
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [filter, setFilter] = useState<"all" | "available" | "occupied">("all");

  const handleTableClick = (tableId: string) => {
    setSelectedTableId(tableId);
    setIsReservationOpen(true);
  };

  const handleReservation = () => {
    if (selectedTableId && customerName) {
      const tableElement = state.elements.find(
        (el) => el.id === selectedTableId,
      );
      if (tableElement) {
        const updatedElement = {
          ...tableElement,
          occupied: true,
          customerId: customerName,
        };
        dispatch({ type: "UPDATE_ELEMENT", payload: updatedElement });
      }
    }
    setIsReservationOpen(false);
    setCustomerName("");
  };

  const filteredTables = state.elements.filter((el) => {
    if (el.type !== "table") return false;
    if (filter === "available") return !el.occupied;
    if (filter === "occupied") return el.occupied;
    return true;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Customer View</h1>
        <Button variant="outline" asChild>
          <Link to="/">Back to Manager</Link>
        </Button>
      </div>

      <div className="flex items-center justify-center">
        <Canvas isEditable={false} />
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
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filteredTables.map((table) => (
            <div
              key={table.id}
              className={`p-4 border rounded-md cursor-pointer ${
                table.occupied
                  ? "bg-red-100 border-red-300"
                  : "bg-green-100 border-green-300"
              }`}
              onClick={() => !table.occupied && handleTableClick(table.id)}
            >
              <h3 className="font-medium">
                Table {table.tableNumber || table.label}
              </h3>
              <p>Status: {table.occupied ? "Occupied" : "Available"}</p>
              {table.occupied && <p>Reserved by: {table.customerId}</p>}
            </div>
          ))}
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
            <Button onClick={handleReservation}>Reserve Table</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerView;
