import React, { createContext, useContext, useReducer, useEffect } from "react";
import { ElementData } from "@/types";

export interface CanvasConfig {
  restaurantId?: string;
  areaId?: string;
  aspectRatio: string;
  width: number;
  height: number;
  layoutImage?: string;
  cornerLabels?: {
    top: string[];
    right: string[];
    bottom: string[];
    left: string[];
  };
}

export interface CanvasState {
  elements: ElementData[];
  canvasConfig: CanvasConfig;
  selectedElement: string | null;
  initialElements: ElementData[];
}

const getInitialState = (): CanvasState => ({
  elements: [],
  canvasConfig: {
    aspectRatio: "1:1",
    width: 800,
    height: 800,
    cornerLabels: {
      top: ["", "", "", ""],
      right: ["", "", "", ""],
      bottom: ["", "", "", ""],
      left: ["", "", "", ""],
    },
  },
  selectedElement: null,
  initialElements: [],
});

type CanvasAction =
  | { type: "ADD_ELEMENT"; payload: ElementData }
  | { type: "UPDATE_ELEMENT"; payload: ElementData }
  | { type: "REMOVE_ELEMENT"; payload: string }
  | { type: "SET_CANVAS_CONFIG"; payload: CanvasConfig }
  | { type: "SET_SELECTED_ELEMENT"; payload: string | null }
  | { type: "RESET_CANVAS" }
  | { type: "CLEAR_CANVAS" }
  | { type: "SET_INITIAL_ELEMENTS" }
  | { type: "LOAD_STATE"; payload: CanvasState }
  | { type: "SAVE_STATE"; payload: CanvasState }; // New action to explicitly save state

const canvasReducer = (
  state: CanvasState,
  action: CanvasAction,
): CanvasState => {
  switch (action.type) {
    case "LOAD_STATE":
      return action.payload;
    case "ADD_ELEMENT":
      if (state.elements.some((el) => el.id === action.payload.id)) {
        console.warn(
          `Attempted to add element with duplicate ID: ${action.payload.id}`,
        );
        return state;
      }
      return { ...state, elements: [...state.elements, action.payload] };
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
      return { ...state, canvasConfig: action.payload };
    case "SET_SELECTED_ELEMENT":
      return { ...state, selectedElement: action.payload };
    case "RESET_CANVAS":
      return {
        ...state,
        elements: [...state.initialElements],
        selectedElement: null,
        canvasConfig: {
          ...state.canvasConfig,
          layoutImage: undefined,
          cornerLabels: {
            top: ["", "", "", ""],
            right: ["", "", "", ""],
            bottom: ["", "", "", ""],
            left: ["", "", "", ""],
          },
        },
      };
    case "CLEAR_CANVAS":
      return {
        ...getInitialState(),
        canvasConfig: {
          ...getInitialState().canvasConfig,
          width: state.canvasConfig.width,
          height: state.canvasConfig.height,
        },
      };
    case "SET_INITIAL_ELEMENTS":
      return { ...state, initialElements: [...state.elements] };
    case "SAVE_STATE":
      // Handle saving to local storage here
      const storageKey = `tableLayoutState_${action.payload.canvasConfig.restaurantId}_${action.payload.canvasConfig.areaId}`; // Assuming restaurantId and areaId are part of canvasConfig for simplicity here, adjust as needed.
      localStorage.setItem(storageKey, JSON.stringify(action.payload));
      return state; // Saving doesn't change the current state
    default:
      return state;
  }
};

const AreaCanvasContext = createContext<{
  state: CanvasState;
  dispatch: React.Dispatch<CanvasAction>;
} | null>(null);

export const AreaCanvasProvider: React.FC<{
  children: React.ReactNode;
  restaurantId: string;
  areaId: string;
  onTableUpdate?: (table: ElementData) => void;
}> = ({ children, restaurantId, areaId, onTableUpdate }) => {
  const storageKey = `tableLayoutState_${restaurantId}_${areaId}`;
  const [state, dispatch] = useReducer(canvasReducer, getInitialState());

  // Load state from local storage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        dispatch({ type: "LOAD_STATE", payload: parsed });
        // Set initial elements after loading
        setTimeout(() => {
          dispatch({ type: "SET_INITIAL_ELEMENTS" });
        }, 50);
      } catch (err) {
        console.error("Failed to load saved canvas state:", err);
        // If loading fails, still set initial elements to the default empty state
        dispatch({ type: "SET_INITIAL_ELEMENTS" });
      }
    } else {
      // If no saved state, set initial elements to the default empty state
      dispatch({ type: "SET_INITIAL_ELEMENTS" });
    }
  }, [storageKey]);

  // Effect to call onTableUpdate when elements change
  useEffect(() => {
    if (onTableUpdate) {
      state.elements
        .filter((el) => el.type === "table")
        .forEach((table) => onTableUpdate(table));
    }
  }, [state.elements, onTableUpdate]);

  return (
    <AreaCanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </AreaCanvasContext.Provider>
  );
};

export const useAreaCanvas = () => {
  const context = useContext(AreaCanvasContext);
  if (!context) {
    throw new Error("useAreaCanvas must be used within an AreaCanvasProvider");
  }
  return context;
};
