import React, { useState } from "react";
import { StyleSheet, View, Linking } from "react-native";
import { Text } from "react-native-elements";
import Timer from "../components/Timer";
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
      <View style={styles.timerContainer}>
        <Timer style={styles.timer} start={enabled} />
      </View>
      <TrackerToggle
        onToggle={onToggle}
        accuracy={TrackerToggle.Accuracy.BestForNavigation}
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
    height: "100%"
  },
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  timer: {
    fontSize: 48
  },
  trackerButton: {
    width: "100%",
    height: 80,
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  trackerButtonText: {
    color: "#ffffff",
    fontSize: 18
  }
});
