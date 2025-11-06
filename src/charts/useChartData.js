import { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Generic data fetching hook for charts
 * - endpoint: string | (params) => Promise<any>
 * - method: GET | POST | ...
 * - headers: object
 * - params: query params object (for GET) or body (for non-GET)
 * - transform: (response) => FusionCharts dataSource
 * - deps: dependency array to refetch
 */
export function useChartData({ endpoint, method = 'GET', headers, params, transform, deps = [], enabled = true, pollInterval = 0, onSuccess, onError, timeout }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const abortRef = useRef();
  const timerRef = useRef();

  const urlWithQuery = useMemo(() => {
    if (typeof endpoint !== 'string' || method !== 'GET' || !params) return endpoint;
    const url = new URL(endpoint, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    Object.entries(params || {}).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
    return url.toString();
  }, [endpoint, method, params]);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      if (!enabled) return;
      setLoading(true);
      setError(null);
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        let resp;
        if (typeof endpoint === 'function') {
          resp = await endpoint({ method, headers, params, signal: controller.signal });
        } else {
          const fetchInit = {
            method,
            headers: headers || { 'Content-Type': 'application/json' },
            signal: controller.signal,
          };
          if (method !== 'GET' && params) fetchInit.body = JSON.stringify(params);
          const r = await fetch(urlWithQuery, { ...fetchInit, ...(timeout ? { signal: controller.signal } : {}) });
          resp = await r.json();
        }
        const ds = typeof transform === 'function' ? transform(resp) : resp;
        if (isMounted) {
          setDataSource(ds);
          onSuccess?.(ds);
        }
      } catch (e) {
        if (isMounted && e.name !== 'AbortError') {
          setError(e);
          onError?.(e);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    run();
    if (pollInterval > 0 && enabled) {
      timerRef.current = setInterval(run, pollInterval);
    }
    return () => {
      isMounted = false;
      if (abortRef.current) abortRef.current.abort();
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlWithQuery, method, JSON.stringify(headers || {}), JSON.stringify(params || {}), enabled, pollInterval, ...deps]);

  return { loading, error, dataSource };
}


