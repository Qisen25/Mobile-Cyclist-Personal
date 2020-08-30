import React, { useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import { SocialIcon } from "react-native-elements";
import AuthenticationContext from "../contexts/AuthenticationContext";
import GoogleSignInButton from "../components/GoogleLoginButton";
import expektusLogo from "../../assets/expektus-logo.png";

/**
 * Component for the login screen.
 * 
 * @component
 */
export default function LoginScreen() {
  const authContext = useContext(AuthenticationContext);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={expektusLogo}/>
      <GoogleSignInButton 
        style={styles.google}
        login={authContext.login}
      />
      <SocialIcon
        button
        type="windows"
        title="Log In With Microsoft"
        style={styles.microsoft}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: "95%",
    resizeMode: "contain"
  },
  google: {
    width: "90%"
  },
  microsoft: {
    backgroundColor: "#127bd6",
    width: "90%"
  }
});