import { useEffect, useState } from "react";
import useAsyncStorage from "./useAsyncStorage";

const useFetchPost = (
  url: string,
  onSuccess: (status: number, response: any) => void,
  onError: (status: number, response: any) => void,
  useToken?: false
): [any[] | null, number, (method: string, body: any) => Promise<void>] => {
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

  const fetchData = async (method: string, body: any) => {
    const headers = useToken
      ? {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser.token,
        }
      : {
          "Content-Type": "application/json",
        };

    const requestOptions = {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    };

    setStatus(0);
    let statusCode = -1;
    console.log("fetching: " + url);
    fetch(url, requestOptions)
      .then((response) => {
        statusCode = response.status;
        const data = response.json();
        //setStatus(response.status);
        return Promise.all([statusCode, data]);
      })
      .then(([status, responseJson]) => {
        setData(responseJson);
        setStatus(status);
        onSuccess(status, responseJson);
      })
      .catch((error) => {
        console.log(error);
        setStatus(statusCode);
        onError(statusCode, error);
      });
  };

  return [data, status, fetchData];
};

export default useFetchPost;
