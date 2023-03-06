import { StyleSheet, Text, View } from "react-native";
import ViewPatient from "./ViewPatient";
import React from "react";
import { useWindowDimensions } from "react-native";
import SearchBar from "./SearchBar";

const SearchPatient = () => {
  const { height, width } = useWindowDimensions();
  return (
    <View
      style={{
        backgroundColor: "#38AFC7",
        flex: 2,
      }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <SearchBar />
      </View>
      <View
        style={{
          backgroundColor: "white",
          // height: height,
          // width: width,
          flex: 5,
          alignItems: "center",
        }}
      >
        <ViewPatient />
      </View>
    </View>
  );
};

export default SearchPatient;

const styles = StyleSheet.create({});
