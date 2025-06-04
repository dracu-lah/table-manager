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
import getTableIcon from "./getTableIcon";

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
  cleaning: {
    color: "bg-blue-600",
    textColor: "text-blue-600",
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
  "available-soon": {
    color: "bg-amber-500",
    textColor: "text-amber-500",
    label: "Available Soon",
    badgeTextColor: "text-white",
  },
};

// Table Icon Component with Switch Case
const TableIcon = ({ tableType, status, width, height, scale = 1 }) => {
  const IconComponent = getTableIcon(tableType);
  const textColor = TABLE_STATUSES[status]?.textColor || "text-gray-600";

  if (!IconComponent) {
    return (
      <div
        className={`${textColor} border-2 border-gray-300 rounded-md flex items-center justify-center`}
        style={{ width: `${width * scale}px`, height: `${height * scale}px` }}
      />
    );
  }

  return (
    <IconComponent
      className={`w-full h-full ${textColor}`}
      style={{ width: `${width * scale}px`, height: `${height * scale}px` }}
    />
  );
};

const RestaurantTableLayout = () => {
  const canvasRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState(1);

  // Original canvas dimensions
  const originalCanvasConfig = {
    width: 800,
    height: 493.7573616018846,
    aspectRatio: "849:524",
  };

  const [elements, setElements] = useState([
    {
      id: "4af13f9f-45a5-4848-bd0b-077253508890",
      type: "table",
      tableType: "square-4",
      tableNumber: 1,
      tableLabel: "",
      tableStatus: "available",
      position: { x: 223.97380743547745, y: 56.24417462532478 },
      rotation: 0,
      width: 86.4,
      height: 57.6,
      shape: "rounded-md",
    },
    {
      id: "4bf13f9f-45a5-4848-bd0b-077253508890",
      type: "table",
      tableType: "round-4",
      tableNumber: 2,
      tableLabel: "",
      tableStatus: "occupied",
      position: { x: 400, y: 200 },
      rotation: 0,
      width: 86.4,
      height: 57.6,
      shape: "rounded-md",
    },
    {
      id: "5cf13f9f-45a5-4848-bd0b-077253508890",
      type: "table",
      tableType: "rectangle-6",
      tableNumber: 3,
      tableLabel: "",
      tableStatus: "reserved",
      position: { x: 150, y: 300 },
      rotation: 0,
      width: 120,
      height: 60,
      shape: "rounded-md",
    },
  ]);

  const [cornerLabels, setCornerLabels] = useState({
    top: ["Beach View", "Window View", "", ""],
    right: ["Garden View", "", "", ""],
    bottom: ["", "", "Patio View", ""],
    left: ["", "Kitchen View", "", ""],
  });

  const [selectedTable, setSelectedTable] = useState(null);

  // Calculate responsive scale
  useEffect(() => {
    const updateScale = () => {
      if (canvasRef.current) {
        const containerWidth = canvasRef.current.parentElement.clientWidth;
        const availableWidth = containerWidth - 32; // Account for padding
        const scale = Math.min(1, availableWidth / originalCanvasConfig.width);
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
    aspectRatio: originalCanvasConfig.aspectRatio,
  };

  const updateTableStatus = (tableId, newStatus) => {
    setElements((prev) =>
      prev.map((element) =>
        element.id === tableId
          ? {
              ...element,
              tableStatus: newStatus,
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
                className={`${config.color} ${config.badgeTextColor}`}
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
              <div
                className="flex justify-between mb-2"
                style={{
                  marginLeft: `${32 * canvasScale}px`,
                  marginRight: `${32 * canvasScale}px`,
                }}
              >
                {cornerLabels.top.map((label, index) => (
                  <div
                    key={`top-${index}`}
                    className="text-xs bg-gray-200 px-2 py-1 rounded text-center"
                    style={{
                      minWidth: `${80 * canvasScale}px`,
                      fontSize: `${12 * canvasScale}px`,
                    }}
                  >
                    {label || `Top ${index + 1}`}
                  </div>
                ))}
              </div>

              <div className="flex">
                {/* Left Labels */}
                <div
                  className="flex flex-col justify-between mr-2"
                  style={{ height: scaledCanvasConfig.height }}
                >
                  {cornerLabels.left.map((label, index) => (
                    <div
                      key={`left-${index}`}
                      className="text-xs bg-gray-200 px-2 py-1 rounded mb-2 text-center flex items-center justify-center"
                      style={{
                        writingMode: "vertical-rl",
                        minHeight: `${60 * canvasScale}px`,
                        fontSize: `${12 * canvasScale}px`,
                      }}
                    >
                      {label || `L${index + 1}`}
                    </div>
                  ))}
                </div>

                {/* Main Canvas */}
                <div
                  ref={canvasRef}
                  className="relative border-2 border-gray-300 bg-gray-50 overflow-hidden"
                  style={{
                    width: scaledCanvasConfig.width,
                    height: scaledCanvasConfig.height,
                    minWidth: scaledCanvasConfig.width,
                    minHeight: scaledCanvasConfig.height,
                    backgroundImage:
                      "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Grid pattern for visual reference */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, #000 1px, transparent 1px),
                        linear-gradient(to bottom, #000 1px, transparent 1px)
                      `,
                      backgroundSize: `${50 * canvasScale}px ${50 * canvasScale}px`,
                    }}
                  />

                  {/* Tables */}
                  {elements.map((element) => (
                    <div
                      key={element.id}
                      className="absolute cursor-pointer transition-all duration-200 hover:scale-105"
                      style={{
                        left: `${element.position.x * canvasScale}px`,
                        top: `${element.position.y * canvasScale}px`,
                        transform: `rotate(${element.rotation}deg)`,
                      }}
                      onClick={() => setSelectedTable(element)}
                    >
                      <div className="relative">
                        <TableIcon
                          tableType={element.tableType}
                          status={element.tableStatus}
                          width={element.width}
                          height={element.height}
                          scale={canvasScale}
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            fontSize: `${14 * canvasScale}px`,
                          }}
                        >
                          <span className="text-white font-bold drop-shadow-lg">
                            T-{element.tableNumber}
                          </span>
                        </div>
                        {selectedTable?.id === element.id && (
                          <div
                            className="absolute -top-1 right-1 bg-blue-500 rounded-full border-2 border-white"
                            style={{
                              width: `${16 * canvasScale}px`,
                              height: `${16 * canvasScale}px`,
                            }}
                          ></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Labels */}
                <div
                  className="flex flex-col justify-between ml-2"
                  style={{ height: scaledCanvasConfig.height }}
                >
                  {cornerLabels.right.map((label, index) => (
                    <div
                      key={`right-${index}`}
                      className="text-xs bg-gray-200 px-2 py-1 rounded mb-2 text-center flex items-center justify-center"
                      style={{
                        writingMode: "vertical-rl",
                        minHeight: `${60 * canvasScale}px`,
                        fontSize: `${12 * canvasScale}px`,
                      }}
                    >
                      {label || `R${index + 1}`}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Labels */}
              <div
                className="flex justify-between mt-2"
                style={{
                  marginLeft: `${32 * canvasScale}px`,
                  marginRight: `${32 * canvasScale}px`,
                }}
              >
                {cornerLabels.bottom.map((label, index) => (
                  <div
                    key={`bottom-${index}`}
                    className="text-xs bg-gray-200 px-2 py-1 rounded text-center"
                    style={{
                      minWidth: `${80 * canvasScale}px`,
                      fontSize: `${12 * canvasScale}px`,
                    }}
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
          {/* Scale Info */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-gray-600">
                <p>Canvas Scale: {(canvasScale * 100).toFixed(0)}%</p>
                <p>
                  Dimensions: {Math.round(scaledCanvasConfig.width)} ×{" "}
                  {Math.round(scaledCanvasConfig.height)}
                </p>
              </div>
            </CardContent>
          </Card>

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
                      className={`${TABLE_STATUSES[selectedTable.tableStatus].color} ${TABLE_STATUSES[selectedTable.tableStatus].badgeTextColor}`}
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
