import React from "react";
import { Icon } from "react-native-elements";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import TrackerScreen from "./TrackerScreen";
import SettingsScreen from "./SettingsScreen";

const Tab = createMaterialBottomTabNavigator();

/**
 * Component for the Home screen, which navigates
 * between the tracking and settings screens.
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
            iconName = "globe";
          } else if (route.name === "Settings") {
            iconName = "cog";
          }

          return <Icon type="font-awesome-5" name={iconName} color={color} size={size}/>;
        }
      })}
    >
      <Tab.Screen options={{ tabBarColor: "#127bd6" }} name="Tracker" component={TrackerScreen} />
      <Tab.Screen options={{ tabBarColor: "purple" }} name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
