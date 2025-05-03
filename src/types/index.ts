export type ElementType = "table" | "window" | "door" | "separator";
export type TableType = "type-1" | "type-2" | "type-3";

export interface CanvasState {
  elements: ElementData[];
  selectedElement: string | null;
  canvasConfig: CanvasConfig;
}

export interface CanvasState {
  elements: ElementData[];
  selectedElement: string | null;
  canvasConfig: {
    aspectRatio: string;
    width: number;
    height: number;
  };
}

export type CanvasAction =
  | { type: "ADD_ELEMENT"; payload: ElementData }
  | { type: "UPDATE_ELEMENT"; payload: ElementData }
  | { type: "REMOVE_ELEMENT"; payload: string }
  | { type: "SET_SELECTED_ELEMENT"; payload: string | null }
  | {
      type: "SET_CANVAS_CONFIG";
      payload: { aspectRatio: string; width: number; height: number };
    };
export interface Position {
  x: number;
  y: number;
}

export interface CanvasConfig {
  aspectRatio: string;
  width: number;
  height: number;
}
export interface ElementData {
  customerId?: string;
  occupied?: boolean;
  id: string;
  tableStatus?: "available" | "occupied" | "reserved" | string;
  type: "table" | "window" | "door" | "separator" | string;
  position: Position;
  rotation: number;
  tableNumber?: number;
  tableLabel?: string;
  label?: string;
  tableType?: "round" | "square" | "rectangular" | "oval" | string;
  width?: number;
  height?: number;
  color?: string;
  shape?: string;
  canvasId?: string;
}

// src/types.ts
export interface Table {
  id: string;
  number: number;
  capacity: number;
  // Add positioning/layout information later for the canvas view
}

export interface Area {
  id: string;
  name: string;
  tables: Table[]; // Add tables array
}

export interface Restaurant {
  id: string;
  name: string;
  areas: Area[];
}

export const initialRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Green Spoon",
    areas: [
      { id: "a1", name: "Main Dining", tables: [] },
      { id: "a2", name: "Outdoor Patio", tables: [] },
    ],
  },
  {
    id: "2",
    name: "Pizza Haven",
    areas: [{ id: "a3", name: "Indoor Seating", tables: [] }],
  },
];
