import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { AppState, ChildProfile, ThemeValue, CompleteStoryResponse } from "../types";

// Action Types
type AppAction =
  | { type: "SET_CHILD_PROFILE"; payload: ChildProfile }
  | { type: "SET_SELECTED_THEME"; payload: ThemeValue }
  | { type: "SET_CURRENT_STORY"; payload: CompleteStoryResponse }
  | { type: "SET_CURRENT_SCENE"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | undefined }
  | { type: "RESET_STATE" }
  | { type: "CLEAR_ERROR" };

// Initial State
const initialState: AppState = {
  currentScene: 0,
  isLoading: false,
  error: undefined,
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_CHILD_PROFILE":
      return {
        ...state,
        childProfile: action.payload,
        error: undefined,
      };
    case "SET_SELECTED_THEME":
      return {
        ...state,
        selectedTheme: action.payload,
        error: undefined,
      };
    case "SET_CURRENT_STORY":
      return {
        ...state,
        currentStory: action.payload,
        currentScene: 0,
        isLoading: false,
        error: undefined,
      };
    case "SET_CURRENT_SCENE":
      return {
        ...state,
        currentScene: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
        error: action.payload ? undefined : state.error,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: undefined,
      };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

// Context Type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  setChildProfile: (profile: ChildProfile) => void;
  setSelectedTheme: (theme: ThemeValue) => void;
  setCurrentStory: (story: CompleteStoryResponse) => void;
  setCurrentScene: (scene: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | undefined) => void;
  clearError: () => void;
  resetState: () => void;
  // Computed values
  hasProfile: boolean;
  hasTheme: boolean;
  hasStory: boolean;
  canProceedToTheme: boolean;
  canProceedToStory: boolean;
}

// Create Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider Component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Helper functions
  const setChildProfile = (profile: ChildProfile) => {
    dispatch({ type: "SET_CHILD_PROFILE", payload: profile });
  };

  const setSelectedTheme = (theme: ThemeValue) => {
    dispatch({ type: "SET_SELECTED_THEME", payload: theme });
  };

  const setCurrentStory = (story: CompleteStoryResponse) => {
    dispatch({ type: "SET_CURRENT_STORY", payload: story });
  };

  const setCurrentScene = (scene: number) => {
    dispatch({ type: "SET_CURRENT_SCENE", payload: scene });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  const setError = (error: string | undefined) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const resetState = () => {
    dispatch({ type: "RESET_STATE" });
  };

  // Computed values
  const hasProfile = Boolean(state.childProfile && state.childProfile.name);
  const hasTheme = Boolean(state.selectedTheme);
  const hasStory = Boolean(state.currentStory);
  const canProceedToTheme = hasProfile;
  const canProceedToStory = hasProfile && hasTheme;

  const value: AppContextType = {
    state,
    dispatch,
    setChildProfile,
    setSelectedTheme,
    setCurrentStory,
    setCurrentScene,
    setLoading,
    setError,
    clearError,
    resetState,
    hasProfile,
    hasTheme,
    hasStory,
    canProceedToTheme,
    canProceedToStory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom Hook
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};