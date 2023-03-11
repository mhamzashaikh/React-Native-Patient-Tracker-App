import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import Item from "./Item";
import Category from "./Category";
import {
  ref,
  onValue,
  query,
  child,
  orderByChild,
  equalTo,
} from "firebase/database";
import { database } from "../firebaseConfig";
import AuthContext from "../AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    name: "Mark Wood",
    age: 20,
    disease: "Diabetes",
    date: "19-feb-2021",
    cost: "150",
  },
  {
    name: "Mark Wood",
    age: 20,
    disease: "Diabetes",
    date: "19-feb-2021",
    cost: "150",
  },
  {
    name: "Mark Wood",
    age: 20,
    disease: "Diabetes",
    date: "19-feb-2021",
    cost: "150",
  },
  {
    name: "Mark Wood",
    age: 20,
    disease: "Diabetes",
    date: "19-feb-2021",
    cost: "150",
  },
  {
    name: "Mark Wood",
    age: 20,
    disease: "Diabetes",
    date: "19-feb-2021",
    cost: "150",
  },
  {
    name: "Mark Wood",
    age: 20,
    disease: "Diabetes",
    date: "19-feb-2021",
    cost: "150",
  },
  {
    name: "Mark Wood",
    age: 20,
    disease: "Diabetes",
    date: "19-feb-2021",
    cost: "150",
  },
  {
    name: "Mark Wood",
    age: 20,
    disease: "Diabetes",
    date: "19-feb-2021",
    cost: "150",
  },
  {
    name: "Mark Wood",
    age: 20,
    disease: "Diabetes",
    date: "19-feb-2021",
    cost: "150",
  },
  {
    name: "Mark Wood",
    age: 20,
    disease: "Diabetes",
    date: "19-feb-2021",
    cost: "150",
  },
];

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
  // const [patientData, setPatientData] = useState();
  const [diseaseFilter, setDiseaseFilter] = useState("All");
  const [filteredData, setFilteredData] = useState();
  const authContext = useContext(AuthContext);
  console.log("filter data: ", filteredData);
  console.log("Prop Search text: ", searchText);

  useEffect(() => {
    // // Get a reference to the 'data' node in the database
    // const dataRef = ref(database, "patients");

    // // Create a query that filters the data based on the doctorID field
    // const doctorIDQuery = query(
    //   dataRef,
    //   orderByChild("doctorID"),
    //   equalTo(authContext.user)
    // );

    // onValue(doctorIDQuery, (snapshot) => {
    //   const data = snapshot.val();
    //   if (data !== null) {
    //     const patientArray = Object.keys(data).map((key) => ({
    //       patientuid: key,
    //       ...data[key],
    //     }));
    //     setPatientData(patientArray);
    //     setFilteredData(patientArray);
    //   } else {
    //     console.log("No Data to show");
    //   }
    // },[]);
    if (searchText) {
      const filtered = patientData.filter((item) =>
        item.patientName.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    } else if (selectedDate) {
      console.log(
        "DATE clicked... ",
        selectedDate.toLocaleString().split(",")[0]
      );
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

  // if (searchText.length > 0) {
  //   const filtered = patientData.filter((item) =>
  //     item.patientName.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   console.log("Filtered: ", filtered.length);
  //   if (filtered.length != 0) {
  //     setFilteredData(filtered);
  //   }
  // }

  const handleDiseaseSelect = (disease) => {
    console.log("disease: ", disease);
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
    // flex: 1
    // borderWidth: 2,
    // borderColor: 'black'
  },
  text: {
    fontWeight: "bold",
    fontSize: 32,
    paddingBottom: 10,
  },
});
