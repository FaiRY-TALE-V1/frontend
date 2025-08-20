import { useState, useCallback } from "react";
import { useAppContext } from "../context/AppContext";

interface UseErrorHandlerReturn {
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
  handleError: (error: Error | string) => void;
  handleAsyncError: <T>(
    asyncFn: () => Promise<T>,
    errorMessage?: string
  ) => Promise<T | null>;
}

export const useErrorHandler = (): UseErrorHandlerReturn => {
  const [localError, setLocalError] = useState<string | null>(null);
  const { setError: setGlobalError, clearError: clearGlobalError } = useAppContext();

  const setError = useCallback((error: string | null) => {
    setLocalError(error);
    setGlobalError(error || undefined);
  }, [setGlobalError]);

  const clearError = useCallback(() => {
    setLocalError(null);
    clearGlobalError();
  }, [clearGlobalError]);

  const handleError = useCallback((error: Error | string) => {
    const errorMessage = error instanceof Error ? error.message : error;
    console.error("Error handled:", errorMessage);
    setError(errorMessage);
  }, [setError]);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    errorMessage?: string
  ): Promise<T | null> => {
    try {
      clearError();
      return await asyncFn();
    } catch (error) {
      const message = errorMessage || 
        (error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
      handleError(message);
      return null;
    }
  }, [clearError, handleError]);

  return {
    error: localError,
    setError,
    clearError,
    handleError,
    handleAsyncError,
  };
};