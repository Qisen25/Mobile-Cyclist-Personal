import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Button(props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.onPress}
    >
      <Text
        style={{ color: props.style?.backgroundColor ? getContrastTextColour(props.style.backgroundColor) : "#000000"}}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 15,
    borderRadius: 15
  }
});

function getContrastTextColour(hex) {
  const colour = (hex.charAt(0) === '#') ? hex.substring(1, 7) : hex;
  const r = parseInt(colour.substring(0, 2), 16);
  const g = parseInt(colour.substring(2, 4), 16);
  const b = parseInt(colour.substring(4, 6), 16);

  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? darkColour : lightColour;
}