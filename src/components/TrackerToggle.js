import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import ws from "../util/ws";
import Settings from "../util/Settings";
import { FileSystem } from "react-native-unimodules";

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

      console.log("Disable streaming")
      watchPos?.remove()
      
      try {
        // signals the server to remove position from cache as button turns off tracking
        ws.send({ type: "remove" });
      } catch(error) {
        console.log(error);
      }

      setEnabled(false);
    } else {
      setEnabled(true);

      const { status } = await Location.requestPermissionsAsync();

      if (status === "granted") {
        await Location.startLocationUpdatesAsync(LOCATION_TASK, {
          accuracy,
          distanceInterval,
          foregroundService: {
            notificationTitle,
            notificationBody
          }
        });

        watchPos = await Location.watchPositionAsync(
            {
              accuracy,
              distanceInterval,
            },
            location => {
                let coords = location.coords;
                const cycData = {
                  type: "cyclist",
                  long: coords.longitude,
                  lat: coords.latitude,
                  direction: coords.heading,
                  speed: coords.speed,
                  task: "watcher"
                };

                if (Settings.DEVELOPER_MODE) {
                  const uri = `${FileSystem.documentDirectory}/location.json`;
                  const content = await FileSystem.readAsStringAsync(uri);
                  const locations = JSON.parse(content);
          
                  locations.push(cycData);
          
                  await FileSystem.writeAsStringAsync(uri, JSON.stringify(locations));
                }

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
    if (data.locations.length >= 1) {
      const location = data.locations[0];
      const cycData = {
        type: "cyclist",
        long: location.coords.longitude,
        lat: location.coords.latitude,
        direction: location.coords.heading,
        speed: location.coords.speed,
        task: "background"
      };

      if (Settings.DEVELOPER_MODE) {
        const uri = `${FileSystem.documentDirectory}/location.json`;
        const content = await FileSystem.readAsStringAsync(uri);
        const locations = JSON.parse(content);

        locations.push(cycData);

        await FileSystem.writeAsStringAsync(uri, JSON.stringify(locations));
      }

      try {
        console.log("Sending from task");
        ws.send(cycData);
      } catch (err) {
        console.log("Thrown at task");
        console.log(err);
      }
    }
  }

});
