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
import { RoomLayouts } from "@/utils/assets";

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

// Table Icon Component
const TableIcon = ({ tableType, status, width, height, scale = 1 }) => {
  const IconComponent = getTableIcon(tableType);
  const statusConfig = TABLE_STATUSES[status] || TABLE_STATUSES.available;

  if (!IconComponent) {
    return (
      <div
        className={`${statusConfig.textColor} border-2 border-gray-300 rounded-md flex items-center justify-center`}
        style={{ width: `${width * scale}px`, height: `${height * scale}px` }}
      />
    );
  }

  return (
    <IconComponent
      className={`w-full h-full ${statusConfig.textColor} border-current  bg-opacity-80`}
      style={{ width: `${width * scale}px`, height: `${height * scale}px` }}
    />
  );
};

const RestaurantTableLayout = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasScale, setCanvasScale] = useState(1);

  // Original canvas dimensions
  const originalCanvasConfig = {
    width: 800,
    height: 494,
    aspectRatio: "800:494",
  };

  const [elements, setElements] = useState([
    {
      id: "4af13f9f-45a5-4848-bd0b-077253508890",
      type: "table",
      tableType: "square-4",
      tableNumber: 1,
      tableLabel: "",
      tableStatus: "available",
      position: { x: 224, y: 56 },
      rotation: 0,
      width: 86,
      height: 58,
      shape: "rounded-md",
    },
    {
      id: "4bf13f9f-45a5-4848-bd0b-077253508890",
      type: "table",
      tableType: "round-6",
      tableNumber: 2,
      tableLabel: "",
      tableStatus: "occupied",
      position: { x: 400, y: 218 },
      rotation: 0,
      width: 86,
      height: 58,
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
  const [backgroundImage, setBackgroundImage] = useState(
    RoomLayouts.RoomLayout1,
  );

  // Calculate responsive scale
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const availableWidth = containerWidth - 100; // Account for labels and padding
        const maxScale = Math.min(
          1.2,
          availableWidth / originalCanvasConfig.width,
        );
        const scale = Math.max(0.3, maxScale);
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
    <div className="w-full  mx-auto p-4 space-y-6">
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

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Canvas Container with Corner Labels */}
        <div className="xl:col-span-3">
          <Card>
            <CardContent className="pt-6">
              <div ref={containerRef} className="w-full">
                {/* Top Labels */}
                <div
                  className="flex justify-between mb-2 px-8"
                  style={{
                    width: scaledCanvasConfig.width + 64,
                    margin: "0 auto",
                  }}
                >
                  {cornerLabels.top.map((label, index) => (
                    <div
                      key={`top-${index}`}
                      className="text-xs bg-gray-200 px-2 py-1 mb-2 rounded text-center flex-shrink-0"
                      style={{
                        minWidth: `${Math.max(60, 80 * canvasScale)}px`,
                        fontSize: `${Math.max(10, 12 * canvasScale)}px`,
                      }}
                    >
                      {label || `Top ${index + 1}`}
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <div className="flex items-start">
                    {/* Left Labels */}
                    <div
                      className="flex flex-col justify-between mr-2 flex-shrink-0"
                      style={{ height: scaledCanvasConfig.height }}
                    >
                      {cornerLabels.left.map((label, index) => (
                        <div
                          key={`left-${index}`}
                          className="text-xs bg-gray-200 px-2 py-1 rounded mb-2 text-center flex items-center justify-center"
                          style={{
                            writingMode: "vertical-rl",
                            minHeight: `${Math.max(40, 60 * canvasScale)}px`,
                            fontSize: `${Math.max(10, 12 * canvasScale)}px`,
                            width: "32px",
                          }}
                        >
                          {label || `L${index + 1}`}
                        </div>
                      ))}
                    </div>

                    {/* Main Canvas */}
                    <div
                      ref={canvasRef}
                      className="relative border-2 border-gray-300 bg-gray-50 overflow-hidden flex-shrink-0"
                      style={{
                        width: scaledCanvasConfig.width,
                        height: scaledCanvasConfig.height,
                        backgroundImage: backgroundImage
                          ? `url(${backgroundImage})`
                          : `linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)`,
                        backgroundSize: backgroundImage ? "cover" : "auto",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {/* Grid pattern for visual reference - only show when no background image */}
                      {!backgroundImage && (
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{
                            backgroundImage: `
                              linear-gradient(to right, #666 1px, transparent 1px),
                              linear-gradient(to bottom, #666 1px, transparent 1px)
                            `,
                            backgroundSize: `${Math.max(20, 40 * canvasScale)}px ${Math.max(20, 40 * canvasScale)}px`,
                          }}
                        />
                      )}

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
                              className="absolute inset-0 flex items-center justify-center pointer-events-none"
                              style={{
                                fontSize: `${Math.max(10, 14 * canvasScale)}px`,
                              }}
                            >
                              <span className="text-gray-800 font-bold drop-shadow-sm">
                                T-{element.tableNumber}
                              </span>
                            </div>
                            {selectedTable?.id === element.id && (
                              <div
                                className="absolute -top-1 -right-1 bg-blue-500 rounded-full border-2 border-white"
                                style={{
                                  width: `${Math.max(12, 16 * canvasScale)}px`,
                                  height: `${Math.max(12, 16 * canvasScale)}px`,
                                }}
                              ></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Labels */}
                    <div
                      className="flex flex-col justify-between ml-2 flex-shrink-0"
                      style={{ height: scaledCanvasConfig.height }}
                    >
                      {cornerLabels.right.map((label, index) => (
                        <div
                          key={`right-${index}`}
                          className="text-xs bg-gray-200 px-2 py-1 rounded mb-2 text-center flex items-center justify-center"
                          style={{
                            writingMode: "vertical-rl",
                            minHeight: `${Math.max(40, 60 * canvasScale)}px`,
                            fontSize: `${Math.max(10, 12 * canvasScale)}px`,
                            width: "32px",
                          }}
                        >
                          {label || `R${index + 1}`}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Labels */}
                <div
                  className="flex justify-between mt-2 px-8"
                  style={{
                    width: scaledCanvasConfig.width + 64,
                    margin: "0 auto",
                  }}
                >
                  {cornerLabels.bottom.map((label, index) => (
                    <div
                      key={`bottom-${index}`}
                      className="text-xs mt-2 bg-gray-200 px-2 py-1 rounded text-center flex-shrink-0"
                      style={{
                        minWidth: `${Math.max(60, 80 * canvasScale)}px`,
                        fontSize: `${Math.max(10, 12 * canvasScale)}px`,
                      }}
                    >
                      {label || `Bottom ${index + 1}`}
                    </div>
                  ))}
                </div>
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

          {/* Background Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Background</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="background-upload">
                  Upload Background Image
                </Label>
                <Input
                  id="background-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) =>
                        setBackgroundImage(e.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="mt-1"
                />
              </div>
              {backgroundImage && (
                <Button
                  variant="outline"
                  onClick={() => setBackgroundImage(null)}
                  className="w-full"
                >
                  Remove Background
                </Button>
              )}
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
