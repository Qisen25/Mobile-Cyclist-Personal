import "react-native";
import React from "react";

const App = require("../App.js").default;

// Note: test renderer must be required after react-native.
import renderer, { act } from "react-test-renderer";

jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");

it("renders correctly", async () => {
  await act(async () => {
    renderer.create(<App />);
  });
});
