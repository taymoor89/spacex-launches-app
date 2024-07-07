import { useEffect, useState } from "react";

const useFetchData = ({ url }) => {
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      if (!url) {
        return;
      }
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Resource not found");
        }
        const data = await response.json();
        setData(data);
        setError("");
      } catch (e) {
        setError(e?.message || "something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return [loading, error, data];
};

export default useFetchData;
