import { useEffect, useState } from "react";

const useFetch = (
  url: string,
  method = "GET",
  body: any = null,
  headers = { "Content-Type": "application/json" }
): [any[] | null, number] => {
  interface LooseObject {
    [key: string]: any;
  }
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(0);

  const requestOptions: LooseObject = {
    method: method,
    headers: headers,
  };

  if (method !== "GET" && method !== "HEAD")
    requestOptions["body"] = JSON.stringify(body);

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
  }, [url]);

  return [data, status];
};

export default useFetch;
