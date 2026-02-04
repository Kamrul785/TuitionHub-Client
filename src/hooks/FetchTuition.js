import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useFetchTuitions = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchTuitions = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/tuitions/");
        const data = await response.data.results;
        setTuitions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTuitions();
  }, []);
  return { tuitions, loading, error };
};

export default useFetchTuitions;
