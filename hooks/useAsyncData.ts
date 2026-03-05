import { useState, useCallback, useEffect, useRef } from 'react';
import { LoadingState, ApiError } from '@/types';

interface AsyncDataOptions {
  immediate?: boolean;
}

interface UseAsyncDataReturn<T, Args extends any[]> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
  state: LoadingState;
  execute: (...args: Args) => Promise<T | null>;
  setData: (data: T | null) => void;
}

/**
 * A universal hook for handling asynchronous operations with standardized states.
 * Now supports immediate execution via options.
 */
export function useAsyncData<T, Args extends any[]>(
  asyncFunction: (...args: Args) => Promise<T | null>,
  options: AsyncDataOptions = {}
): UseAsyncDataReturn<T, Args> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [state, setState] = useState<LoadingState>('idle');
  
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const execute = useCallback(
    async (...args: Args): Promise<T | null> => {
      setLoading(true);
      setState('loading');
      setError(null);

      try {
        const result = await asyncFunction(...args);
        setData(result);
        setState('success');
        return result;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred';
        const code = err && typeof err === 'object' && 'code' in err ? String((err as { code?: string }).code) : undefined;
        setError({ message, code });
        setState('error');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  );

  useEffect(() => {
    if (optionsRef.current.immediate) {
      void (execute as () => Promise<T | null>)();
    }
  }, [execute]);

  return {
    data,
    loading,
    error,
    state,
    execute,
    setData,
  };
}
