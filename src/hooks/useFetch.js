import { useState, useEffect, useCallback } from "react";
 
export const useFetch = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
 
    try {
      const response = await apiFunction();
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while fetching the data");
    } finally {
      setLoading(false);
    }
  }, dependencies);
 
  useEffect(() => {
    fetchData();
  }, [fetchData]);
 
  return { data, loading, error, refetch: fetchData };
};