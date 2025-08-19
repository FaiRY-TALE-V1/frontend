import { useState, useCallback } from "react";
import { ErrorReporter, getUserFriendlyErrorMessage } from "../utils/errorHandler";

interface AsyncOperationState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

interface UseAsyncOperationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  logContext?: string;
}

export const useAsyncOperation = <T = any>(
  options: UseAsyncOperationOptions = {}
) => {
  const { onSuccess, onError, logContext } = options;
  
  const [state, setState] = useState<AsyncOperationState<T>>({
    data: null,
    isLoading: false,
    error: null,
    isSuccess: false,
  });

  const execute = useCallback(async (asyncFn: () => Promise<T>) => {
    setState({
      data: null,
      isLoading: true,
      error: null,
      isSuccess: false,
    });

    try {
      const result = await asyncFn();
      
      setState({
        data: result,
        isLoading: false,
        error: null,
        isSuccess: true,
      });

      onSuccess?.(result);
      return result;
    } catch (error) {
      const errorMessage = getUserFriendlyErrorMessage(error);
      
      setState({
        data: null,
        isLoading: false,
        error: errorMessage,
        isSuccess: false,
      });

      ErrorReporter.report(error, logContext);
      onError?.(errorMessage);
      throw error;
    }
  }, [onSuccess, onError, logContext]);

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
      isSuccess: false,
    });
  }, []);

  const setError = useCallback((error: string) => {
    setState(prev => ({
      ...prev,
      error,
      isLoading: false,
      isSuccess: false,
    }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setError,
  };
};