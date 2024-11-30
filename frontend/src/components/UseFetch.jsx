import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useFetch = (url) => {
  const [Data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Assuming user object contains the token

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          signal: abortCont.signal,
          headers: {
            Authorization: `Bearer ${user?.token}`, // Include the token in the request
          },
        });

        if (!response.ok) {
          throw new Error("An error occurred while fetching the data");
        }

        const data = await response.json();
        setData(data);
        setIsPending(false);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      }
    };

    setTimeout(fetchData, 1000);

    return () => abortCont.abort();
  }, [url, user?.token]);

  return { Data, isPending, error };
};

export default useFetch;
