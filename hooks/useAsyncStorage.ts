import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default (
  key: string
) /*: [string | null, (data: string) => string, () => void, boolean]*/ => {
  const [storageItem, setStorageItem] = useState<null | string>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  async function getStorageItem() {
    const data = await AsyncStorage.getItem(key);
    setStorageItem(data);
    setIsLoaded(true);
  }

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
    getStorageItem();
  }, []);

  return [storageItem, updateStorageItem, clearStorageItem, isLoaded] as const;
};
