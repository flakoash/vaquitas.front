import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, View } from "react-native";
import Colors from "../constants/Colors";
import GroupScreen from "../screens/GroupScreen";
import GroupsListScreen from "../screens/GroupsListScreen";
import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

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
        component={GroupsListScreen}
        options={{
          title: "🐮's App!",
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                width: 55,
                justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              <Octicons name="search" size={22} />
              <MaterialCommunityIcons name="dots-vertical" size={22} />
            </View>
          ),
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
        options={({ route }) => ({
          title: route.params !== undefined ? route.params.name : "",
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                width: 55,
                justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              <Octicons name="search" size={22} />
              <MaterialCommunityIcons name="dots-vertical" size={22} />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
