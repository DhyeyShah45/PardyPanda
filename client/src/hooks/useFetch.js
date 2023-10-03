import { useUserContext } from "../context/userContext";

const { useState, useEffect } = require("react");

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { token } = useUserContext();

  const getData = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const values = await response.json();
      if (!response.ok) {
        setError(values.error);
      } else {
        setIsLoading(false);
        setError(null);
        setData(values);
      }
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    getData(url);
  }, []);
  return { data, isLoading, error, getData };
};

export default useFetch;
