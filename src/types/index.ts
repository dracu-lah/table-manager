export type ElementType = "table" | "window" | "door" | "separator";
export type TableType = "type-1" | "type-2" | "type-3";

export interface Position {
  x: number;
  y: number;
}

export interface CanvasConfig {
  aspectRatio: string;
  width: number;
  height: number;
}

export interface CanvasState {
  elements: ElementData[];
  selectedElement: string | null;
  canvasConfig: CanvasConfig;
}

export interface ElementData {
  id: string;
  type: string;
  position: { x: number; y: number };
  rotation: number;
  tableNumber?: number;
  tableLabel?: string;
  tableType?: string;
  label?: string;
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
