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
