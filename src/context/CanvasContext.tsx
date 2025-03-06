import React, { createContext, useContext, useReducer } from "react";
import { ElementData, CanvasConfig } from "../types";

interface CanvasState {
  elements: ElementData[];
  canvasConfig: CanvasConfig;
  selectedElement: string | null;
}

const initialState: CanvasState = {
  elements: [],
  canvasConfig: {
    aspectRatio: "1:1",
    width: 800,
    height: 800,
  },
  selectedElement: null,
};

type CanvasAction =
  | { type: "ADD_ELEMENT"; payload: ElementData }
  | { type: "UPDATE_ELEMENT"; payload: ElementData }
  | { type: "REMOVE_ELEMENT"; payload: string }
  | { type: "SET_CANVAS_CONFIG"; payload: CanvasConfig }
  | { type: "SET_SELECTED_ELEMENT"; payload: string | null };

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
        Object.keys(parsedState).forEach((key) => {
          if (key === "elements") {
            parsedState.elements.forEach((element: ElementData) => {
              dispatch({ type: "ADD_ELEMENT", payload: element });
            });
          } else if (key === "canvasConfig") {
            dispatch({
              type: "SET_CANVAS_CONFIG",
              payload: parsedState.canvasConfig,
            });
          }
        });
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
        canvasConfig: state.canvasConfig,
      }),
    );
  }, [state.elements, state.canvasConfig]);

  return (
    <CanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
