import React from "react";
import { Icon } from "react-native-elements";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import TrackerScreen from "./TrackerScreen";
import AccountScreen from "./AccountScreen";

const Tab = createMaterialBottomTabNavigator();

/**
 * Component for the Home screen, which navigates
 * between the tracking and sccount screens.
 *
 * @component
 */
export default function HomeScreen() {
  return (
    <Tab.Navigator
      shifting
      screenOptions={({ route }) => ({
        // eslint-disable-next-line react/prop-types
        tabBarIcon({ color, size }) {
          let iconName;

          if (route.name === "Tracker") {
            iconName = "track-changes";
          } else if (route.name === "Account") {
            iconName = "account-circle";
          }

          return <Icon type="material" name={iconName} color={color} size={size}/>;
        }
      })}
    >
      <Tab.Screen options={{ tabBarColor: "#127bd6" }} name="Tracker" component={TrackerScreen} />
      <Tab.Screen options={{ tabBarColor: "purple" }} name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
