// context/AreaCanvasContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { ElementData } from "@/types";

// Interfaces remain the same...
export interface CanvasConfig {
  aspectRatio: string;
  width: number;
  height: number;
  layoutImage?: string;
  // Add cornerLabels to CanvasConfig
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
  | { type: "SET_CANVAS_IMAGE_CONFIG"; payload: string | null } // This action is still useful for immediate image updates
  | { type: "SET_SELECTED_ELEMENT"; payload: string | null }
  | { type: "RESET_CANVAS" }
  | { type: "CLEAR_CANVAS" } // New action to clear elements and canvas config
  | { type: "SET_INITIAL_ELEMENTS" }
  | { type: "LOAD_STATE"; payload: CanvasState }; // New action to load state from storage

const canvasReducer = (
  state: CanvasState,
  action: CanvasAction,
): CanvasState => {
  switch (action.type) {
    case "LOAD_STATE":
      // When loading, directly set the state from the payload
      return action.payload;
    case "ADD_ELEMENT":
      // Check if an element with the same ID already exists
      if (state.elements.some((el) => el.id === action.payload.id)) {
        console.warn(
          `Attempted to add element with duplicate ID: ${action.payload.id}`,
        );
        return state; // Return current state without adding
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
    case "SET_CANVAS_IMAGE_CONFIG":
      // Update only the layoutImage property of canvasConfig
      return {
        ...state,
        canvasConfig: {
          ...state.canvasConfig,
          layoutImage: action.payload || undefined, // Use undefined if null to avoid saving ""
        },
      };
    case "SET_SELECTED_ELEMENT":
      return { ...state, selectedElement: action.payload };
    case "RESET_CANVAS":
      return {
        ...state,
        elements: [...state.initialElements],
        selectedElement: null,
        canvasConfig: {
          ...state.canvasConfig,
          layoutImage: undefined, // Reset layout image on reset
          cornerLabels: {
            // Reset corner labels on reset
            top: ["", "", "", ""],
            right: ["", "", "", ""],
            bottom: ["", "", "", ""],
            left: ["", "", "", ""],
          },
        },
      };
    case "CLEAR_CANVAS":
      return {
        ...getInitialState(), // Return the initial state, effectively clearing everything
        canvasConfig: {
          ...getInitialState().canvasConfig,
          width: state.canvasConfig.width, // Keep the current width
          height: state.canvasConfig.height, // Keep the current height
        },
      };
    case "SET_INITIAL_ELEMENTS":
      return { ...state, initialElements: [...state.elements] };
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
        // Dispatch a new action to load the entire state
        dispatch({ type: "LOAD_STATE", payload: parsed });
        // After loading, set the initial elements
        setTimeout(() => {
          dispatch({ type: "SET_INITIAL_ELEMENTS" });
        }, 100);
      } catch (err) {
        console.error("Failed to load saved canvas state:", err);
        // Optionally, reset to initial state if loading fails
        // dispatch({ type: "RESET_CANVAS" });
      }
    }
  }, [storageKey]); // Depend on storageKey

  // Save state to local storage whenever state changes
  useEffect(() => {
    // Only save if elements or canvasConfig have been populated from initial load or changes
    if (
      state.elements.length > 0 ||
      state.canvasConfig.layoutImage ||
      state.canvasConfig.cornerLabels
    ) {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } else {
      // If state is essentially empty, remove the item from local storage
      localStorage.removeItem(storageKey);
    }
  }, [state, storageKey]); // Depend on the entire state and storageKey

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
