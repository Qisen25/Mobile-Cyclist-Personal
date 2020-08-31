import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableHighlight } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";

const LOCATION_TASK = "background-location-task";

/**
 * Component for toggling background geolocation.
 *
 * @component
 */
export default function TrackerToggle(props) {
  const {
    onToggle,
    accuracy,
    notificationTitle,
    notificationBody,
    children,
    ...rest
  } = props

  const [enabled, setEnabled] = useState(false);

  const onPress = async () => {
    if (enabled) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK);

      setEnabled(false);
    } else {
      const { status } = await Location.requestPermissionsAsync();

      if (status === "granted") {
        await Location.startLocationUpdatesAsync(LOCATION_TASK, {
          accuracy: accuracy,
          foregroundService: {
            notificationTitle: notificationTitle,
            notificationBody: notificationBody
          }
        });

        setEnabled(true);
      }
    }
  };

  useEffect(() => onToggle(enabled), [enabled]);

  return (
    <TouchableHighlight onPress={onPress} {...rest}>
      {children}
    </TouchableHighlight>
  );
}

TrackerToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  accuracy: PropTypes.number.isRequired,
  notificationTitle: PropTypes.string.isRequired,
  notificationBody: PropTypes.string.isRequired
}

TrackerToggle.Accuracy = Location.Accuracy;

TaskManager.defineTask(LOCATION_TASK, ({ data, error }) => {
  if (error) {
    console.log(error);
  } else if (data) {
    console.log(data.locations);
  } else {
    console.log("no data");
  }
});