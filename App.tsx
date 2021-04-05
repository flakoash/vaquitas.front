import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useAsyncStorage from "./hooks/useAsyncStorage";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [
    storageUser,
    updateStorageUser,
    clearStorageUser,
    isStorageUserLoaded,
  ] = useAsyncStorage("user_id");

  if (!isLoadingComplete) {
    return null;
  } else {
    if (isStorageUserLoaded && storageUser === null) {
      const testUser = { id: "1", name: "Current user" };
      updateStorageUser(JSON.stringify(testUser));
    }
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
