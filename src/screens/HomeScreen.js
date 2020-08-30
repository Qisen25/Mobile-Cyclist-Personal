import React from "react";
import { Icon } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TrackerScreen from "./TrackerScreen";
import SettingsScreen from "./SettingsScreen";

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon({ color, size }) {
          let iconName;

          if (route.name === "Tracker") {
            iconName = "globe";
          } else if (route.name === "Settings") {
            iconName = "cog"
          }

          return <Icon type="font-awesome-5" name={iconName} color={color} size={size}/>
        }
      })}
      tabBarOptions={{
        activeTintColor: "#127bd6",
        inactiveTintColor: "gray"
      }}
    >
      <Tab.Screen name="Tracker" component={TrackerScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}