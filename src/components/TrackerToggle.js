import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import ws from "../util/ws";

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
    timeInterval,
    distanceInterval,
    notificationTitle,
    notificationBody,
    children,
    ...rest
  } = props;

  const [enabled, setEnabled] = useState(false);

  const onPress = async () => {
    if (enabled) {
      await Location.stopLocationUpdatesAsync(LOCATION_TASK);

      setEnabled(false);
    } else {
      setEnabled(true);

      const { status } = await Location.requestPermissionsAsync();

      if (status === "granted") {
        await Location.startLocationUpdatesAsync(LOCATION_TASK, {
          accuracy,
          timeInterval,
          distanceInterval,
          foregroundService: {
            notificationTitle,
            notificationBody
          }
        });
      } else {
        setEnabled(false);
      }
    }
  };

  useEffect(() => onToggle(enabled), [enabled]);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} {...rest}>
      {children}
    </TouchableOpacity>
  );
}

TrackerToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
  accuracy: PropTypes.number.isRequired,
  timeInterval: PropTypes.number,
  distanceInterval: PropTypes.number,
  notificationTitle: PropTypes.string.isRequired,
  notificationBody: PropTypes.string.isRequired,
  children: PropTypes.any
};

TrackerToggle.Accuracy = Location.Accuracy;

TaskManager.defineTask(LOCATION_TASK, ({ data, error }) => {
  if (error) {
    console.log(error);
  } else if (data) {
    console.log(data.locations);

    // Format the server expects.
    if (data.locations.length >= 1) {
      const location = data.locations[0];
      const cycData = {
        type: "cyclist",
        long: location.longitude,
        lat: location.coords.latitude,
        direction: location.heading,
        speed: location.speed
      };

      try {
        ws.send(cycData);
      } catch (err) {
        console.log(err);
      }
    }
  } else {
    console.log("no data");
  }
});
