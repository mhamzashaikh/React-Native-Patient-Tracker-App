import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Item from "./Item";
import Category from "./Category";

const CATEGORYDATA = [
  {
    id: 1,
    disease: "All",
  },
  {
    id: 2,
    disease: "Covid19",
  },
  {
    id: 3,
    disease: "Diabetes",
  },
  {
    id: 4,
    disease: "HeartDisease",
  },
  {
    id: 5,
    disease: "Diarrheal",
  },
  {
    id: 6,
    disease: "Flu",
  },
  {
    id: 7,
    disease: "Fever",
  },
];

const ViewPatient = ({ navigation, searchText, patientData, selectedDate }) => {
  const [diseaseFilter, setDiseaseFilter] = useState("All");
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    if (searchText) {
      const filtered = patientData.filter((item) =>
        item.patientName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    } else if (selectedDate) {
      const filtered = patientData.filter(
        (item) => item.appointmentDate == selectedDate.toLocaleDateString()
      );
      if (filtered.length != 0) {
        setFilteredData(filtered);
      } else {
        setFilteredData(patientData);
      }
    } else {
      setFilteredData(patientData);
    }
  }, [patientData, searchText, selectedDate]);

  // Filtering Category
  const handleDiseaseSelect = (disease) => {
    setDiseaseFilter(disease);
    if (disease === "All") {
      setFilteredData(patientData);
    } else {
      setFilteredData(
        patientData.filter((item) => item.patientDisease === disease)
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Patient</Text>
      <FlatList
        data={CATEGORYDATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Category itemData={item} diseaseSelect={handleDiseaseSelect} />
        )}
        keyExtractor={(item) => item.id}
      />
      <FlatList
        style={{ height: 280 }}
        nestedScrollEnabled={true}
        data={filteredData}
        renderItem={({ item }) => (
          <Item itemData={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default ViewPatient;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: 50,
    height: "60%",
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
    paddingBottom: 10,
  },
});
