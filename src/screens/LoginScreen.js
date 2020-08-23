import React from "react";
import { StyleSheet, View } from "react-native";
import Button from "../components/Button";

export default function LoginScreen({ navigation }) {
  const onLoginPress = () => {
    navigation.navigate("Tracker");
  };

  return (
    <View style={styles.container}>
      <Button title="Login" onPress={onLoginPress}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});