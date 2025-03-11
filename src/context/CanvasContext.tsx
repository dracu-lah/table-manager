import React, { createContext, useContext, useReducer } from "react";

export interface CanvasConfig {
  aspectRatio: string;
  width: number;
  height: number;
}

export interface ElementPosition {
  x: number;
  y: number;
}

export interface ElementData {
  id: string;
  type: string;
  position: ElementPosition;
  rotation: number;
  width?: number;
  height?: number;
  color?: string;
  shape?: string;
  tableType?: string;
  tableNumber?: number;
  tableLabel?: string;
  tableStatus?: "available" | "occupied" | "reserved";
}

interface CanvasState {
  elements: ElementData[];
  canvasConfig: CanvasConfig;
  selectedElement: string | null;
  initialElements: ElementData[]; // For reset functionality
}

const initialState: CanvasState = {
  elements: [],
  canvasConfig: {
    aspectRatio: "1:1",
    width: 600,
    height: 600,
  },
  selectedElement: null,
  initialElements: [],
};

type CanvasAction =
  | { type: "ADD_ELEMENT"; payload: ElementData }
  | { type: "UPDATE_ELEMENT"; payload: ElementData }
  | { type: "REMOVE_ELEMENT"; payload: string }
  | { type: "SET_CANVAS_CONFIG"; payload: CanvasConfig }
  | { type: "SET_SELECTED_ELEMENT"; payload: string | null }
  | { type: "RESET_CANVAS" }
  | { type: "SET_INITIAL_ELEMENTS" };

const canvasReducer = (
  state: CanvasState,
  action: CanvasAction,
): CanvasState => {
  switch (action.type) {
    case "ADD_ELEMENT":
      return {
        ...state,
        elements: [...state.elements, action.payload],
      };
    case "UPDATE_ELEMENT":
      return {
        ...state,
        elements: state.elements.map((el) =>
          el.id === action.payload.id ? action.payload : el,
        ),
      };
    case "REMOVE_ELEMENT":
      return {
        ...state,
        elements: state.elements.filter((el) => el.id !== action.payload),
        selectedElement:
          state.selectedElement === action.payload
            ? null
            : state.selectedElement,
      };
    case "SET_CANVAS_CONFIG":
      return {
        ...state,
        canvasConfig: action.payload,
      };
    case "SET_SELECTED_ELEMENT":
      return {
        ...state,
        selectedElement: action.payload,
      };
    case "RESET_CANVAS":
      return {
        ...state,
        elements: [...state.initialElements],
        selectedElement: null,
      };
    case "SET_INITIAL_ELEMENTS":
      return {
        ...state,
        initialElements: [...state.elements],
      };
    default:
      return state;
  }
};

const CanvasContext = createContext<{
  state: CanvasState;
  dispatch: React.Dispatch<CanvasAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const CanvasProvider: React.FC<{
  children: React.ReactNode;
  onTableUpdate?: (tableData: ElementData) => void;
}> = ({ children, onTableUpdate }) => {
  const [state, dispatch] = useReducer(canvasReducer, initialState);

  // Load from localStorage on init
  React.useEffect(() => {
    const savedState = localStorage.getItem("tableLayoutState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);

        // Load elements
        if (parsedState.elements && parsedState.elements.length > 0) {
          parsedState.elements.forEach((element: ElementData) => {
            dispatch({ type: "ADD_ELEMENT", payload: element });
          });
        }

        // Save as initial state for reset functionality
        setTimeout(() => {
          dispatch({ type: "SET_INITIAL_ELEMENTS" });
        }, 100);
      } catch (error) {
        console.error("Error loading state from localStorage", error);
      }
    }
  }, []);

  // Save to localStorage on state change
  React.useEffect(() => {
    if (state.elements.length > 0) {
      localStorage.setItem(
        "tableLayoutState",
        JSON.stringify({
          elements: state.elements,
        }),
      );
    }
  }, [state.elements]);

  // Call onTableUpdate prop when a table element is updated
  React.useEffect(() => {
    if (onTableUpdate) {
      const tableElements = state.elements.filter((el) => el.type === "table");
      tableElements.forEach((table) => {
        onTableUpdate(table);
      });
    }
  }, [state.elements, onTableUpdate]);

  return (
    <CanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
