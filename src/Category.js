import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Category = ({ itemData, diseaseSelect }) => {
  console.log("item: ", itemData.disease)
  return (
    <Pressable style={styles.container} onPress={()=>diseaseSelect(itemData.disease)}>
      <LinearGradient
        style={styles.linearGradient}
        colors={["#d6fcfb", "#d6fcfb"]}
        
      >
        <Text style={styles.text}>{itemData.disease}</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "purple",
    marginBottom: 3,
  },
  linearGradient: {
    borderRadius: 8,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    // backgroundColor: "#38AFC7",
    color: "#3CC5BB",
    fontSize: 14,
    fontWeight: "bold",
    padding: 8,
  },
});
