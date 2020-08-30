import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, Pressable } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager"

const LOCATION_TASK = "background-location-task";

/**
 * Component for toggling background geolocation.
 *
 * @component
 */
export default function TrackerToggle(props) {
  const [enabled, setEnabled] = useState(false);

  const onPress = async () => {
    if (enabled) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK);

      setEnabled(false);
    } else {
      const { status } = await Location.requestPermissionsAsync();

      if (status === "granted") {
        await Location.startLocationUpdatesAsync(LOCATION_TASK, {
          accuracy: Location.Accuracy.Highest,
          foregroundService: {
            notificationTitle: props.notificationTitle,
            notificationBody: props.notificationBody
          }
        });

        setEnabled(true);
      }
    }
  };

  return (
    <Pressable onPress={onPress}>
      <Text>{enabled ? "Stop" : "Start"}</Text>
    </Pressable>
  );
}

TrackerToggle.propTypes = {
  notificationTitle: PropTypes.string.isRequired,
  notificationBody: PropTypes.string.isRequired
}

const styles = StyleSheet.create({
  buttonStart: {
    
  },
  buttonStop: {

  },
  buttonText: {

  }
});

TaskManager.defineTask(LOCATION_TASK, ({ data, error }) => {
  if (error) {
    console.log(error);
  } else if (data) {
    console.log(data.locations);
  } else {
    console.log("no data");
  }
});