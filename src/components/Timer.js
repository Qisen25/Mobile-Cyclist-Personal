import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

function formatTime(millis) {
  const seconds = Math.floor((millis / 1000) % 60);
  const minutes = Math.floor((millis / 1000 / 60) % 60);
  const hours = Math.floor((millis / 1000 / 60 / 60) % 24);

  const ss = `0${seconds}`.slice(-2);
  const mm = `0${minutes}`.slice(-2);
  const hh = `0${hours}`.slice(-2);

  return `${hh}:${mm}:${ss}`;
}

export default function Timer({ start = false, ...props }) {
  const [time, setTime] = useState(null);
  const interval = useRef();

  useEffect(() => {
    if (start) {
      const startTime = Date.now();

      interval.current = setInterval(() => setTime(Date.now() - startTime));
    }

    return () => clearInterval(interval.current);
  }, [start]);

  return (
    <Text {...props}>{formatTime(time)}</Text>
  );
}

Timer.propTypes = {
  start: PropTypes.bool
};
