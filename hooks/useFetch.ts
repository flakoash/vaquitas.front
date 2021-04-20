import { useEffect, useState } from "react";

const useFetch = (url: string, refresh: number): [any[] | null, number] => {
  interface LooseObject {
    [key: string]: any;
  }
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(0);

  const requestOptions: LooseObject = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const fetchData = async () => {
    fetch(url, requestOptions)
      .then((response) => {
        setStatus(response.status);
        return response.json();
      })
      .then((responseJson) => {
        setData(responseJson);
      })
      .catch((error) => {
        console.log(error);
        setStatus(error.response.status);
      });
  };
  useEffect(() => {
    if (url !== "") fetchData();
    return () => {
      url = "";
    };
  }, [url, refresh]);

  return [data, status];
};

export default useFetch;
