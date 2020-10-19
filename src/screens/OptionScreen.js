import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Linking, StyleSheet, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { FileSystem } from "react-native-unimodules";
import AuthenticationContext from "../contexts/AuthenticationContext";
import Settings from "../util/Settings";
import ws from "../util/ws";

/**
 * Component for the account screen.
 *
 * @component
 */
export default function OptionScreen({ navigation }) {
  const auth = useContext(AuthenticationContext);

  const list = [
    {
      title: "Profile",
      icon: "face",
      onPress() {
        navigation.navigate("Profile");
      }
    },
    {
      title: "About",
      icon: "info",
      onPress() {
        Linking.openURL("https://expektus.io/about");
      }
    },
    {
      title: "Help",
      icon: "help",
      onPress() {
        Linking.openURL("https://expektus.io/help");
      }
    },
    {
      title: "Logout",
      icon: "exit-to-app",
      onPress() {
        auth.actions.logout(auth.state.platform);
      }
    },
    {
      title: "Developer Mode",
      icon: "code",
      async onPress() {
        const uri = `${FileSystem.documentDirectory}/location.json`;
        const info = await FileSystem.getInfoAsync(uri);

        if (info.exists) {
          await FileSystem.deleteAsync(uri);
        }

        if (!Settings.DEVELOPER_MODE) {
          await FileSystem.writeAsStringAsync(uri, JSON.stringify([]));
        }

        Settings.DEVELOPER_MODE = !Settings.DEVELOPER_MODE;

        console.log(`Dev mode on: ${Settings.DEVELOPER_MODE}`);
      }
    },
    {
      title: "Send",
      icon: "code",
      async onPress() {
        const uri = `${FileSystem.documentDirectory}/location.json`;
        const info = await FileSystem.getInfoAsync(uri);

        if (info.exists) {
          const content = await FileSystem.readAsStringAsync(uri);
          const locations = JSON.parse(content);

          try {
            ws.send(locations[Settings.ROUTE_POSITION]);
          } catch (err) {
            console.log(err);
          }

          console.log(`Position: ${Settings.ROUTE_POSITION}`);

          if (Settings.ROUTE_POSITION === locations.length - 1) {
            Settings.ROUTE_POSITION = 0;
          } else {
            Settings.ROUTE_POSITION++;
          }

          await FileSystem.writeAsStringAsync(uri, JSON.stringify(locations));
        }
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

OptionScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {

  }
});
