import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const Item = ({ itemData, navigation}) => {

  const unixTimestamp = itemData.dateOfArrival;
  const dateObject = new Date(unixTimestamp);
  const humanReadableDate = dateObject.toLocaleString();

  return (
    <View style={styles.container}>
      <Image source={require("../assets/patientimg.png")} />
      <View style={styles.subContainer}>
        <Text style={styles.name}>{itemData.patientName}</Text>
        <Text style={styles.patientDisease}>{itemData.patientDisease}</Text>
        <Text style={styles.date}>{humanReadableDate}</Text>
        <Text style={styles.cost}>${itemData.cost}</Text>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate("PatientDetails", itemData)}>
        <Image source={require('../assets/view.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingBottom: 5,
    paddingLeft: 5,
    borderWidth: 2,
    borderColor: "#F3F4F8",
    borderRadius: 8,
  },
  subContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  patientDisease: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#8C8FA5",
    paddingBottom: 3,
  },
  date: {
    fontSize: 12,
    fontStyle: "italic",
  },
  cost: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0F7DE3",
  },
});
