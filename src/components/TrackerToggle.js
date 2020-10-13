import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import ws from "../util/ws";

const LOCATION_TASK = "background-location-task";
let watchPos = null;
let listenHere = null;

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

      console.log("Disable streaming")
      watchPos?.remove()
      listenHere?.clearInterval();
      ws.send({ type: "remove" })

      setEnabled(false);
    } else {
      setEnabled(true);
      console.log("Now streaming")
      const { status } = await Location.requestPermissionsAsync();

      if (status === "granted") {
        await Location.startLocationUpdatesAsync(LOCATION_TASK, {
          accuracy,
          timeInterval: 600,
          distanceInterval,
          foregroundService: {
            notificationTitle,
            notificationBody
          }
        });

        watchPos = await Location.watchPositionAsync(
            {
              accuracy,
              timeInterval: 1200,
              distanceInterval,
            },
            async (location) => {
                let coords = location.coords;
                // This function gets more consistent direction heading
                let head = await Location.getHeadingAsync();
                const cycData = {
                  type: "cyclist",
                  long: coords.longitude,
                  lat: coords.latitude,
                  direction: head.magHeading,
                  speed: coords.speed,
                  task: "watcher"
                };

                console.log(cycData);

                try {
                  console.log("Sent at watcher");
                  ws.send(cycData);
                } catch (err) {
                  console.log(err);
                }
            },
            error => console.log(error)
        );

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

TaskManager.defineTask(LOCATION_TASK, async ({ data, error }) => {

  if (error) {
    console.log(error);
  } else if (data) {
    // Format the server expects.
    if (data.locations.length >= 1) {
      const location = data.locations[0];
      // This function gets more consistent direction heading
      // Note: Its possible that await can block a while before reaching ws send
      //       this doesn't happen 90% of time but might reorder or improve this
      let head = await Location.getHeadingAsync();
      const cycData = {
        type: "cyclist",
        long: location.coords.longitude,
        lat: location.coords.latitude,
        direction: head.magHeading,
        speed: location.coords.speed,
        task: "background"
      };

      console.log(cycData);

      try {
        console.log("Sending from task");
        ws.send(cycData);
      } catch (err) {
        console.log("Thrown at task");
        console.log(err);
      }
    }
  } else {
    console.log("no data");
  }
});
