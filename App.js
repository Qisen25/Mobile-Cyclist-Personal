import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TrackingToggle from "./src/components/TrackerToggle";
import * as TaskManager from "expo-task-manager";

export default function App() {
  return (
    <View style={styles.container}>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});