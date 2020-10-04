import React, { useState } from "react";
import { StyleSheet, View, Linking } from "react-native";
import { Text } from "react-native-elements";
import TrackerToggle from "../components/TrackerToggle";

/**
 * Component for the tracking screen.
 *
 * @component
 */
export default function TrackerScreen() {
  const [enabled, setEnabled] = useState(false);

  const onToggle = e => setEnabled(e);

  return (
    <View style={styles.container}>
      <TrackerToggle
        onToggle={onToggle}
        accuracy={TrackerToggle.Accuracy.Highest}
        distanceInterval={1}
        notificationTitle="Location Tracking"
        notificationBody="Expektus is tracking your location."
        style={[styles.trackerButton, { backgroundColor: enabled ? "tomato" : "forestgreen" }]}
      >
          <Text style={styles.trackerButtonText}>
            { enabled ? "Disable" : "Enable" }
          </Text>
      </TrackerToggle>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    padding: 16
  },
  trackerButton: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30
  },
  trackerButtonText: {
    color: "#ffffff",
    fontSize: 18
  }
});
