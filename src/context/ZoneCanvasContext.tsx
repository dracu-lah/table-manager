import React, { createContext, useContext, useReducer, useEffect } from "react";
import { ElementData } from "@/types";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { GetCanvasAPI, UpdateCanvasAPI } from "@/services/api";

// Initialize QueryClient
const queryClient = new QueryClient();

export interface CanvasConfig {
  outletId?: string; // This might come from your URL params or a global context
  zoneId?: string; // This might come from your URL params or a global context
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
  restaurantId?: string; // Added based on API response
  zonesId?: string; // Added based on API response (API uses zonesId not zoneId in canvasConfig)
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
  | { type: "LOAD_STATE"; payload: CanvasState };

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
      return {
        ...state,
        canvasConfig: { ...state.canvasConfig, ...action.payload },
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
          outletId: state.canvasConfig.outletId, // Preserve propertyId and zoneId on clear
          zoneId: state.canvasConfig.zoneId,
          restaurantId: state.canvasConfig.restaurantId,
          zonesId: state.canvasConfig.zonesId,
        },
      };
    case "SET_INITIAL_ELEMENTS":
      return { ...state, initialElements: [...state.elements] };
    default:
      return state;
  }
};

const ZoneCanvasContext = createContext<{
  state: CanvasState;
  dispatch: React.Dispatch<CanvasAction>;
  saveCanvas: (data: CanvasState) => void;
  isLoadingCanvas: boolean;
  isSavingCanvas: boolean;
  canvasError: Error | null;
} | null>(null);

export const ZoneCanvasProvider: React.FC<{
  children: React.ReactNode;
  outletId: string;
  zoneId: string;
  onTableUpdate?: (table: ElementData) => void;
}> = ({ children, outletId, zoneId, onTableUpdate }) => {
  const [state, dispatch] = useReducer(canvasReducer, getInitialState());

  // Fetch canvas data using useQuery
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["canvasLayout", zoneId],
    queryFn: () => GetCanvasAPI({ id: zoneId }),
    enabled: !!zoneId, // Only run the query if zoneId is available
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
  });

  // Update canvas state when data is successfully fetched
  useEffect(() => {
    if (data) {
      // Map the API response structure to CanvasState
      const loadedState: CanvasState = {
        elements: data.data.elements || [],
        canvasConfig: {
          ...getInitialState().canvasConfig, // Start with defaults
          ...data.data.canvasConfig, // Overlay API data
          outletId: outletId, // Ensure propertyId is set in config
          zoneId: zoneId, // Ensure zoneId is set in config
        },
        selectedElement: data.data.selectedElement || null,
        initialElements: data.data.initialElements || [],
      };
      dispatch({ type: "LOAD_STATE", payload: loadedState });
      // Set initial elements after loading
      setTimeout(() => {
        dispatch({ type: "SET_INITIAL_ELEMENTS" });
      }, 50);
    }
  }, [data, outletId, zoneId]);

  // Use useMutation for saving canvas data
  const { mutateAsync: saveCanvasMutation, isPending: isSaving } = useMutation({
    mutationFn: (payload: {
      id: string;
      elements: ElementData[];
      canvasConfig: CanvasConfig;
      selectedElement: string | null;
      initialElements: ElementData[];
    }) => UpdateCanvasAPI(payload),
    onSuccess: () => {
      // Invalidate the query to refetch fresh data after a successful save
      queryClient.invalidateQueries({ queryKey: ["canvasLayout", zoneId] });
      console.log("Canvas saved successfully!");
    },
    onError: (err) => {
      console.error("Failed to save canvas:", err);
      // Optionally, dispatch an error state or show a notification
    },
  });

  // Function to trigger save
  const saveCanvas = async (stateToSave: CanvasState) => {
    // Construct the payload for the UpdateCanvasAPI based on the expected structure
    const payload = {
      id: zoneId, // The zoneId is part of the URL, not the body in your API signature for `params.id`
      elements: stateToSave.elements,
      canvasConfig: {
        ...stateToSave.canvasConfig,
        // Ensure restaurantId and zonesId are present if your backend expects them
        // These might be derived from outletId and zoneId passed to the provider,
        // or from the initially loaded canvasConfig.
        restaurantId: stateToSave.canvasConfig.restaurantId || outletId, // Example: map outletId to restaurantId
        zonesId: stateToSave.canvasConfig.zonesId || zoneId, // Example: map zoneId to zonesId
      },
      selectedElement: stateToSave.selectedElement,
      initialElements: stateToSave.initialElements,
    };
    await saveCanvasMutation(payload);
  };

  // Effect to call onTableUpdate when elements change
  useEffect(() => {
    if (onTableUpdate) {
      state.elements
        .filter((el) => el.type === "table")
        .forEach((table) => onTableUpdate(table));
    }
  }, [state.elements, onTableUpdate]);

  // Combine loading and saving states for a more general `isLoadingCanvas`
  const isLoadingCanvas = isLoading;
  const isSavingCanvas = isSaving;
  const canvasError = isError ? error : null;

  return (
    <ZoneCanvasContext.Provider
      value={{
        state,
        dispatch,
        saveCanvas,
        isLoadingCanvas,
        isSavingCanvas,
        canvasError,
      }}
    >
      {children}
    </ZoneCanvasContext.Provider>
  );
};

// Wrapper component to provide QueryClient
export const AppCanvasProvider: React.FC<{
  children: React.ReactNode;
  outletId: string;
  zoneId: string;
  onTableUpdate?: (table: ElementData) => void;
}> = ({ children, outletId, zoneId, onTableUpdate }) => (
  <QueryClientProvider client={queryClient}>
    <ZoneCanvasProvider
      outletId={outletId}
      zoneId={zoneId}
      onTableUpdate={onTableUpdate}
    >
      {children}
    </ZoneCanvasProvider>
  </QueryClientProvider>
);

export const useZoneCanvas = () => {
  const context = useContext(ZoneCanvasContext);
  if (!context) {
    throw new Error("useZoneCanvas must be used within an ZoneCanvasProvider");
  }
  return context;
};
