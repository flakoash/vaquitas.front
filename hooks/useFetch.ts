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
  const [storageUser, , , isUserLoaded] = useAsyncStorage("user_id");
  const [currentUser, setCurrentUser] = useState({
    id: null,
    username: null,
    token: null,
  });
  useEffect(() => {
    if (isUserLoaded) setCurrentUser(JSON.parse(storageUser as string));
  }, [isUserLoaded]);

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
    if (url !== "" && currentUser.token !== null) {
      const requestOptions: LooseObject = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser.token,
        },
      };
      fetchData(requestOptions);
    }
    return () => {
      url = "";
    };
  }, [url, currentUser.token, refresh]);

  return [data, status];
};

export default useFetch;
