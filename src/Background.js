import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";

const Background = ({ children }) => {
  return (
    <View>
      <ImageBackground
        source={require("../assets/home-bg.png")}
        style={styles.imageBackground}
      />
      <View style={styles.childrenView}>{children}</View>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  imageBackground: {
    height: "100%",
  },
  childrenView: {
    position: "absolute",
  },
});
