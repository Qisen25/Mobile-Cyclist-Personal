import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import AuthenticationContext from "../contexts/AuthenticationContext";

/**
 * Component for the settings screen.
 *
 * @component
 */
export default function SettingsScreen() {
  const auth = useContext(AuthenticationContext);

  const list = [
    {
      title: "Profile",
      icon: "account-box"
    },
    {
      title: "About",
      icon: "info"
    },
    {
      title: "Logout",
      icon: "exit-to-app",
      onPress() {
        auth.actions.logout(auth.state.platform);
      }
    }
  ];

  return (
    <View style={styles.container}>
      {
        list.map((item, i) => (
          <ListItem key={i} bottomDivider onPress={item.onPress}>
            <Icon type="material" name={item.icon} />
            <ListItem.Content>
              <ListItem.Title>{item.title}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color="black" />
          </ListItem>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  }
});
