import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";

const SearchBar = () => {
  return (
    <View style={styles.searchSection}>
      <Image
        style={styles.searchIcon}
        source={require("../assets/search-bar.png")}
      />
      <TextInput style={styles.input} placeholder="Search" />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchSection: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    padding: 10,
    borderRadius: 10,
  },
  searchIcon: {
    padding: 10,
    marginLeft: 10,
  },
});
