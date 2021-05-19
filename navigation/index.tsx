import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, Pressable, View } from "react-native";
import Colors from "../constants/Colors";
import GroupScreen from "../screens/GroupScreen";
import GroupsListScreen from "../screens/GroupsListScreen";
import { Octicons, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import Login from "../screens/login";
import Register from "../screens/Register";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      // initialRouteName="MainTab"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
        },
      }}
    >
      {/* <Stack.Screen name="Root" component={BottomTabNavigator} /> */}
      <Stack.Screen
        name="Root"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MainTab"
        component={GroupsListScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />

      <Stack.Screen
        name="Group"
        component={GroupScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
