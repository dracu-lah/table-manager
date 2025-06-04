import React, { useState } from "react";
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

import RoomLayout1 from "@/assets/room-layouts/layout-1.png";
import { TableIcons as Tables } from "@/utils/assets";

const TableIcons = {
  "hexagon-6": Tables.TableHexagon6Icon,
  "oval-6": Tables.TableOval6Icon,
  "oval-8": Tables.TableOval8Icon,
  "rectangle-2": Tables.TableRectangle2Icon,
  "rectangle-4": Tables.TableRectangle4Icon,
  "rectangle-6": Tables.TableRectangle6Icon,
  "rectangle-8": Tables.TableRectangle8Icon,
  "round-3": Tables.TableRound3Icon,
  "round-6": Tables.TableRound6Icon,
  "round-8": Tables.TableRound8Icon,
  "round-9": Tables.TableRound9Icon,
  "round-10": Tables.TableRound10Icon,
  "square-4": Tables.TableSquare4Icon,
};

// Table status configurations
const TABLE_STATUSES = {
  available: {
    color: "bg-green-600",
    label: "Available",
    textColor: "text-white",
  },
  occupied: { color: "bg-red-600", label: "Occupied", textColor: "text-white" },
  cleaning: {
    color: "bg-blue-600",
    label: "Cleaning",
    textColor: "text-white",
  },
  reserved: {
    color: "bg-purple-600",
    label: "Reserved",
    textColor: "text-white",
  },
  maintenance: {
    color: "bg-gray-600",
    label: "Maintenance",
    textColor: "text-white",
  },
  "available-soon": {
    color: "bg-amber-500",
    label: "Available Soon",
    textColor: "text-white",
  },
};

// Table Icon Component
const TableIcon = ({ tableType, color, width, height }) => {
  const IconComponent = TableIcons[tableType];

  if (!IconComponent) {
    return (
      <div
        className={`${color} border-2 border-gray-300 rounded-md flex items-center justify-center`}
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    );
  }

  return (
    <div
      className={`${color} p-1 rounded-md`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <IconComponent
        className="w-full h-full text-white"
        style={{ filter: "brightness(0) invert(1)" }}
      />
    </div>
  );
};

const RestaurantTableLayout = () => {
  const [elements, setElements] = useState([
    {
      id: "4af13f9f-45a5-4848-bd0b-077253508890",
      type: "table",
      tableType: "rectangle-6",
      tableNumber: 1,
      tableLabel: "",
      tableStatus: "available",
      position: { x: 223.97380743547745, y: 56.24417462532478 },
      rotation: 0,
      width: 86.4,
      height: 57.6,
      color: "bg-green-600",
      shape: "rounded-md",
    },
    {
      id: "25e172be-1163-4e23-8264-7bfda817a177",
      type: "table",
      tableType: "round-6",
      tableNumber: 2,
      tableLabel: "",
      tableStatus: "available",
      position: { x: 638.4675183506878, y: 45.91232063489896 },
      rotation: 0,
      width: 64.8,
      height: 64.8,
      color: "bg-amber-700",
      shape: "rounded-full",
    },
  ]);

  const [cornerLabels, setCornerLabels] = useState({
    top: ["Beach View", "Window View", "", ""],
    right: ["Garden View", "", "", ""],
    bottom: ["", "", "Patio View", ""],
    left: ["", "Kitchen View", "", ""],
  });

  const [selectedTable, setSelectedTable] = useState(null);

  const canvasConfig = {
    width: 800,
    height: 493.7573616018846,
    aspectRatio: "849:524",
  };

  const updateTableStatus = (tableId, newStatus) => {
    setElements((prev) =>
      prev.map((element) =>
        element.id === tableId
          ? {
              ...element,
              tableStatus: newStatus,
              color: TABLE_STATUSES[newStatus].color,
            }
          : element,
      ),
    );
  };

  const updateCornerLabel = (corner, index, value) => {
    setCornerLabels((prev) => ({
      ...prev,
      [corner]: prev[corner].map((label, i) => (i === index ? value : label)),
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Table Layout Manager</CardTitle>
        </CardHeader>
      </Card>

      {/* Status Legend */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(TABLE_STATUSES).map(([status, config]) => (
              <Badge
                key={status}
                className={`${config.color} ${config.textColor}`}
              >
                {config.label}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Canvas Container with Corner Labels */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              {/* Top Labels */}
              <div className="flex justify-between mb-2">
                {cornerLabels.top.map((label, index) => (
                  <div
                    key={`top-${index}`}
                    className="text-xs bg-blue-100 px-2 py-1 rounded min-w-[80px] text-center"
                  >
                    {label || `Top ${index + 1}`}
                  </div>
                ))}
              </div>

              <div className="flex">
                {/* Left Labels */}
                <div
                  className="flex flex-col justify-between mr-2 h-full"
                  style={{ height: canvasConfig.height }}
                >
                  {cornerLabels.left.map((label, index) => (
                    <div
                      key={`left-${index}`}
                      className="text-xs bg-blue-100 px-2 py-1 rounded mb-2 writing-mode-vertical text-center min-h-[60px] flex items-center justify-center"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      {label || `L${index + 1}`}
                    </div>
                  ))}
                </div>

                {/* Main Canvas */}
                <div
                  className="relative border-2 border-gray-300 bg-gray-50 overflow-hidden flex-1"
                  style={{
                    width: canvasConfig.width,
                    height: canvasConfig.height,
                    maxWidth: "100%",
                    aspectRatio: canvasConfig.aspectRatio,
                    backgroundImage: `url(${RoomLayout1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Tables */}
                  {elements.map((element) => (
                    <div
                      key={element.id}
                      className="absolute cursor-pointer transition-all duration-200 hover:scale-105"
                      style={{
                        left: `${element.position.x}px`,
                        top: `${element.position.y}px`,
                        transform: `rotate(${element.rotation}deg)`,
                      }}
                      onClick={() => setSelectedTable(element)}
                    >
                      <div className="relative">
                        <TableIcon
                          tableType={element.tableType}
                          color={element.color}
                          width={element.width}
                          height={element.height}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white font-bold text-sm drop-shadow-lg">
                            T-{element.tableNumber}
                          </span>
                        </div>
                        {selectedTable?.id === element.id && (
                          <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Labels */}
                <div
                  className="flex flex-col justify-between ml-2 h-full"
                  style={{ height: canvasConfig.height }}
                >
                  {cornerLabels.right.map((label, index) => (
                    <div
                      key={`right-${index}`}
                      className="text-xs bg-blue-100 px-2 py-1 rounded mb-2 writing-mode-vertical text-center min-h-[60px] flex items-center justify-center"
                      style={{ writingMode: "vertical-rl" }}
                    >
                      {label || `R${index + 1}`}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Labels */}
              <div className="flex justify-between mt-2">
                {cornerLabels.bottom.map((label, index) => (
                  <div
                    key={`bottom-${index}`}
                    className="text-xs bg-blue-100 px-2 py-1 rounded min-w-[80px] text-center"
                  >
                    {label || `Bottom ${index + 1}`}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Table Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Table Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedTable ? (
                <div className="space-y-4">
                  <div>
                    <Label>Table {selectedTable.tableNumber}</Label>
                    <p className="text-sm text-gray-600">
                      {selectedTable.tableType}
                    </p>
                  </div>

                  <div>
                    <Label>Status</Label>
                    <Select
                      value={selectedTable.tableStatus}
                      onValueChange={(value) =>
                        updateTableStatus(selectedTable.id, value)
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

                  <div className="pt-2">
                    <Badge
                      className={`${TABLE_STATUSES[selectedTable.tableStatus].color} ${TABLE_STATUSES[selectedTable.tableStatus].textColor}`}
                    >
                      {TABLE_STATUSES[selectedTable.tableStatus].label}
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">
                  Select a table to modify its status
                </p>
              )}
            </CardContent>
          </Card>

          {/* Corner Labels */}
          <Card>
            <CardHeader>
              <CardTitle>Corner Labels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(cornerLabels).map(([corner, labels]) => (
                <div key={corner} className="space-y-2">
                  <Label className="capitalize">{corner} Side</Label>
                  {labels.map((label, index) => (
                    <Input
                      key={`${corner}-${index}`}
                      placeholder={`${corner} corner ${index + 1}`}
                      value={label}
                      onChange={(e) =>
                        updateCornerLabel(corner, index, e.target.value)
                      }
                      className="text-sm"
                    />
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>

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
                  elements.forEach((el) =>
                    updateTableStatus(el.id, "available"),
                  )
                }
              >
                Set All Available
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  elements.forEach((el) => updateTableStatus(el.id, "cleaning"))
                }
              >
                Set All Cleaning
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantTableLayout;
