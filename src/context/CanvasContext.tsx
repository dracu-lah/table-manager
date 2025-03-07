import React, { createContext, useContext, useReducer } from "react";
import { ElementData, CanvasConfig } from "../types";

interface Canvas {
  id: string;
  name: string;
  config: CanvasConfig;
}

interface CanvasState {
  elements: ElementData[];
  canvases: Canvas[];
  currentCanvasId: string;
  canvasConfig: CanvasConfig;
  selectedElement: string | null;
}

// Create a default canvas
const defaultCanvasId = "default";
const initialState: CanvasState = {
  elements: [],
  canvases: [
    {
      id: defaultCanvasId,
      name: "Main Floor",
      config: {
        aspectRatio: "1:1",
        width: 600,
        height: 600,
      },
    },
  ],
  currentCanvasId: defaultCanvasId,
  canvasConfig: {
    aspectRatio: "1:1",
    width: 600,
    height: 600,
  },
  selectedElement: null,
};

type CanvasAction =
  | { type: "ADD_ELEMENT"; payload: ElementData }
  | { type: "UPDATE_ELEMENT"; payload: ElementData }
  | { type: "REMOVE_ELEMENT"; payload: string }
  | { type: "SET_CANVAS_CONFIG"; payload: CanvasConfig }
  | { type: "SET_SELECTED_ELEMENT"; payload: string | null }
  | { type: "ADD_CANVAS"; payload: Canvas }
  | { type: "REMOVE_CANVAS"; payload: string }
  | { type: "SET_CURRENT_CANVAS"; payload: string };

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
      // Update config for the current canvas
      return {
        ...state,
        canvasConfig: action.payload,
        canvases: state.canvases.map((canvas) =>
          canvas.id === state.currentCanvasId
            ? { ...canvas, config: action.payload }
            : canvas,
        ),
      };
    case "SET_SELECTED_ELEMENT":
      return {
        ...state,
        selectedElement: action.payload,
      };
    case "ADD_CANVAS":
      return {
        ...state,
        canvases: [...state.canvases, action.payload],
      };
    case "REMOVE_CANVAS":
      // Don't allow removing the last canvas
      if (state.canvases.length <= 1) {
        return state;
      }
      return {
        ...state,
        canvases: state.canvases.filter(
          (canvas) => canvas.id !== action.payload,
        ),
        // Remove elements belonging to the deleted canvas
        elements: state.elements.filter((el) => el.canvasId !== action.payload),
        // Reset selected element if it belonged to the deleted canvas
        selectedElement:
          state.selectedElement &&
          state.elements.find((el) => el.id === state.selectedElement)
            ?.canvasId === action.payload
            ? null
            : state.selectedElement,
      };
    case "SET_CURRENT_CANVAS":
      const targetCanvas = state.canvases.find(
        (canvas) => canvas.id === action.payload,
      );
      if (!targetCanvas) return state;

      return {
        ...state,
        currentCanvasId: action.payload,
        canvasConfig: targetCanvas.config,
        // Clear the selected element when switching canvases
        selectedElement: null,
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

export const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(canvasReducer, initialState);

  // Load from localStorage on init
  React.useEffect(() => {
    const savedState = localStorage.getItem("canvasState");
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);

        // Load canvases first
        if (parsedState.canvases && parsedState.canvases.length > 0) {
          // Clear any existing canvases first
          parsedState.canvases.forEach((canvas: Canvas) => {
            dispatch({ type: "ADD_CANVAS", payload: canvas });
          });

          // Set the current canvas
          if (parsedState.currentCanvasId) {
            dispatch({
              type: "SET_CURRENT_CANVAS",
              payload: parsedState.currentCanvasId,
            });
          }
        }

        // Then load elements
        if (parsedState.elements && parsedState.elements.length > 0) {
          parsedState.elements.forEach((element: ElementData) => {
            // Make sure each element has a canvasId
            const elementWithCanvas = {
              ...element,
              canvasId: element.canvasId || defaultCanvasId,
            };
            dispatch({ type: "ADD_ELEMENT", payload: elementWithCanvas });
          });
        }
      } catch (error) {
        console.error("Error loading state from localStorage", error);
      }
    }
  }, []);

  // Save to localStorage on state change
  React.useEffect(() => {
    localStorage.setItem(
      "canvasState",
      JSON.stringify({
        elements: state.elements,
        canvases: state.canvases,
        currentCanvasId: state.currentCanvasId,
      }),
    );
  }, [state.elements, state.canvases, state.currentCanvasId]);

  return (
    <CanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
