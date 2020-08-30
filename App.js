import React, { useReducer, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import AuthenticationContext from "./src/contexts/AuthenticationContext";

const Stack = createStackNavigator();

export default function App() {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...prevState,
          user: action.user
        };
      case "LOGOUT":
        return {
          ...prevState,
          user: null
        };
    }
  }, {
    user: null
  });

  const authContext = useMemo(() => ({
    async login(data) {
      dispatch({ type: "LOGIN", user: { id: "0" } });
    },
    async logout() {
      dispatch({ type: "LOGOUT" });
    }
  }), []);

  return (
    <AuthenticationContext.Provider value={authContext}>
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
    justifyContent: "center",
  },
});