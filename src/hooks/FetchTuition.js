import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const PAGE_SIZE = 10;

const useFetchTuitions = (page = 1) => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchTuitions = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await apiClient.get(`/tuitions/?page=${page}`);
        const data = response.data;
        setTuitions(data.results || []);
        setTotalCount(data.count || 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTuitions();
  }, [page]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return { tuitions, loading, error, totalCount, totalPages };
};

export default useFetchTuitions;
