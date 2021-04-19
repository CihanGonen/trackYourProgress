import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/" + url,
    })
      .then((res) => {
        if (res.status !== 200) {
          throw Error("could not get the data");
        }
        const data = res.data;
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("axios aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
  });

  return { data, isPending, error };
};

export default useAxios;
