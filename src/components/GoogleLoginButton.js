import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { SocialIcon } from "react-native-elements";
import * as GoogleSignIn from "expo-google-sign-in";
import ws from "../util/ReusableWebSocket";
import Constant from "../util/Constant";

/**
 * Component for logging in using Google.
 *
 * @component
 */
export default function GoogleLoginButton({ title, login, ...props }) {
  const [authenticating, setAuthenticating] = useState(false);

  const onPress = async () => {
    try {
      setAuthenticating(true);

      await GoogleSignIn.askForPlayServicesAsync();
      const res = await GoogleSignIn.signInAsync();

      if (res.type === "success") {
        login(Constant.Platform.GOOGLE, res.user.auth.idToken);
      } else {
        setAuthenticating(false);
      }
    } catch (err) {
      setAuthenticating(false);
    }
  };

  useEffect(() => {
    (async () => {
      await GoogleSignIn.initAsync({
        webClientId: "696826026859-sumcdf4qgaq69840vd3470b3gdtut883.apps.googleusercontent.com"
      });

      const user = await GoogleSignIn.signInSilentlyAsync();

      if (user) {
        login(Constant.Platform.GOOGLE, user.auth.idToken);
      }
    })();
  }, []);

  return (
    <SocialIcon
      button
      type="google"
      loading={authenticating}
      title={title}
      style={styles.google}
      onPress={onPress}
      {...props}
    />
  );
}

GoogleLoginButton.propTypes = {
  title: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired
};

const styles = StyleSheet.create({

});
