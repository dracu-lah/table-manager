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
  id: string;
  tableStatus: "available" | "occupied" | "reserved" | string;
  type: "table" | "window" | "door" | "separator" | string;
  position: Position;
  rotation: number;
  tableNumber?: number;
  tableLabel?: string;
  tableType?: "round" | "square" | "rectangular" | "oval" | string;
  width?: number;
  height?: number;
  color?: string;
  shape?: string;
  canvasId?: string;
}
