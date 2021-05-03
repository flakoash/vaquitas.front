import { useEffect, useState } from "react";
import useAsyncStorage from "./useAsyncStorage";

const useFetch = (
  url: string,
  refresh: number,
  useAuth: boolean = false
): [any[] | null, number] => {
  interface LooseObject {
    [key: string]: any;
  }
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(0);
  const [token, _, __, tokenLoaded] = useAsyncStorage("token");

  const fetchData = async (requestOptions: LooseObject) => {
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
    if (url !== "" && token !== null) {
      const requestOptions: LooseObject = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      fetchData(requestOptions);
    }
    return () => {
      url = "";
    };
  }, [url, token, refresh]);

  return [data, status];
};

export default useFetch;
