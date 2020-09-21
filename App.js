import React, { useReducer, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as GoogleSignIn from "expo-google-sign-in";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AuthenticationContext from "./src/contexts/AuthenticationContext";
import ws from "./src/util/ReusableWebSocket";
import Constant from "./src/util/Constant";


const Stack = createStackNavigator();

/**
 * Main component for the application.
 *
 * @component
 */
export default function App() {
  // eslint-disable-next-line consistent-return
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...prevState,
          user: action.user,
          platform: action.platform
        };
      case "LOGOUT":
        return {
          ...prevState,
          user: null,
          platform: null
        };
    }
  }, {
    user: null
  });

  // To be passed to the various login buttons.
  const actions = useMemo(() => ({
    login(platform, token) {
      ws.setHeaders({ headers: { authorisation: token } });
      ws.connect();

      ws.addEventListener("open", data => {
        dispatch({ type: "LOGIN", user: { id: "0" }, platform });
      });
    },
    async logout(platform) {
      console.log(platform === Constant.Platform.GOOGLE);
      if (platform === Constant.Platform.GOOGLE) {
        await GoogleSignIn.signOutAsync();
      }

      dispatch({ type: "LOGOUT" });
    }
  }), []);

  return (
    <AuthenticationContext.Provider value={{ actions, state }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          { state.user === null ?
            <Stack.Screen name="Login" component={LoginScreen} />
            :
            <Stack.Screen name="Home" component={HomeScreen} />
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthenticationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
