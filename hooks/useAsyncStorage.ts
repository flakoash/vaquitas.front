import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (key: string) => {
  const [storageItem, setStorageItem] = useState<null | string>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  function updateStorageItem(data: string) {
    AsyncStorage.setItem(key, data);
    setStorageItem(data);
    return data;
  }

  function clearStorageItem() {
    AsyncStorage.removeItem(key);
    setStorageItem(null);
  }

  useEffect(() => {
    let isMounted = true;
    AsyncStorage.getItem(key).then((data) => {
      if (isMounted) {
        setStorageItem(data);
        setIsLoaded(true);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return [storageItem, updateStorageItem, clearStorageItem, isLoaded] as const;
};
