import { useEffect, useState } from "react";
import useAsyncStorage from "./useAsyncStorage";

const useFetchPost = (
  method: string,
  url: string,
  useToken?: boolean,
  onSuccess?: (status: number, response: any) => void,
  onError?: (status: number, response: any) => void
): [any[] | null, number, (body?: any) => void] => {
  interface LooseObject {
    [key: string]: any;
  }
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(0);
  const [body, setBody] = useState(undefined);
  const [send, setSend] = useState(false);

  const [storageUser, , , isUserLoaded] = useAsyncStorage("user_id");
  const [currentUser, setCurrentUser] = useState({
    id: null,
    username: null,
    token: null,
  });
  useEffect(() => {
    if (isUserLoaded) setCurrentUser(JSON.parse(storageUser as string));
  }, [isUserLoaded]);

  const fetchData = async () => {
    const headers = useToken
      ? {
          "Content-Type": "application/json",
          Authorization: "Bearer " + currentUser.token,
        }
      : {
          "Content-Type": "application/json",
        };

    const requestOptions =
      body !== undefined
        ? {
            method: method,
            headers: headers,
            body: JSON.stringify(body),
          }
        : {
            method: method,
            headers: headers,
          };
    console.log(requestOptions);
    setStatus(0);
    let statusCode = -1;
    console.log("fetching: " + url);
    fetch(url, requestOptions)
      .then((response) => {
        console.log(response.status);
        statusCode = response.status;
        const data = response.json();
        //setStatus(response.status);
        return Promise.all([statusCode, data]);
      })
      .then(([status, responseJson]) => {
        setSend(false);
        setData(responseJson);
        setStatus(status);
        onSuccess && onSuccess(status, responseJson);
      })
      .catch((error) => {
        setSend(false);
        console.log(error);
        setStatus(statusCode);
        onError && onError(statusCode, error);
      });
  };

  useEffect(() => {
    console.log(url);
    console.log(currentUser.token);
    console.log(send);
    if (
      send &&
      url !== "" &&
      (!useToken ||
        (useToken &&
          currentUser.token !== undefined &&
          currentUser.token !== null))
    )
      fetchData();
    return () => {};
  }, [url, currentUser.token, send]);

  const sendRequest = (body?: any) => {
    setBody(body);
    setSend(true);
  };

  return [data, status, sendRequest];
};

export default useFetchPost;
