import Constants from "expo-constants";
import { Platform } from "react-native";

const envVars = {
  dev: {
    // backendApiUrl: "http://192.168.56.1:8080/api",
    backendApiUrl: "https://vaquitas.herokuapp.com/api",
  },
  prod: {
    backendApiUrl: "https://vaquitas.herokuapp.com/api",
  },
};

const ENV = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return envVars.dev;
  } else if (env === "prod") {
    return envVars.prod;
  }
  return envVars.dev;
};
export default ENV;
