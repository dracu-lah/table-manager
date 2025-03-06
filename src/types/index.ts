export type ElementType = "table" | "window" | "door" | "separator";
export type TableType = "type-1" | "type-2" | "type-3";

export interface Position {
  x: number;
  y: number;
}

export interface ElementData {
  id: string;
  type: ElementType;
  subType?: string;
  label: string;
  position: Position;
  rotation: number;
  occupied?: boolean;
  customerId?: string;
  tableNumber?: number;
}

export interface CanvasConfig {
  aspectRatio: string;
  width: number;
  height: number;
}
