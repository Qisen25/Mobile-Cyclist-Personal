import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import TrackerToggle from "../components/TrackerToggle";

/**
 * Component for the tracking screen.
 * 
 * @component
 */
export default function TrackerScreen() {
  const [enabled, setEnabled] = useState(false);

  const onToggle = (enabled) => setEnabled(enabled);

  console.log(enabled);

  return (
    <View style={styles.container}>
      <TrackerToggle
        onToggle={onToggle}
        accuracy={TrackerToggle.Accuracy.Highest}
        notificationTitle="Location Tracking"
        notificationBody="Expektus is tracking your location."
      >
        <View style={[styles.trackerButton, { backgroundColor: enabled ? "tomato" : "forestgreen" }]}>
          <Text style={styles.trackerButtonText}>
            { enabled ? "Disable" : "Enable" }
          </Text>
        </View>
      </TrackerToggle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end"
  },
  trackerButton: {
    height: 70,
    justifyContent: "center",
    alignItems: "center"
  },
  trackerButtonText: {
    color: "#ffffff",
    fontSize: 18,
  }
});