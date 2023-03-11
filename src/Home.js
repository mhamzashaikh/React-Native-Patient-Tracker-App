import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Background from "./Background";
import { useWindowDimensions } from "react-native";
import ViewPatient from "./ViewPatient";
import AuthContext from "../AuthContext";
import {
  ref,
  onValue,
  query,
  child,
  orderByChild,
  equalTo,
} from "firebase/database";
import { database } from "../firebaseConfig";
import DateTimePicker from "@react-native-community/datetimepicker";

const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [patientData, setPatientData] = useState();
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();
  const [show, setShow] = useState(false);
  const { height, width } = useWindowDimensions();
  const Auth = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  console.log("AuthContext: >>>>>> : ", authContext);

  // console.log("DATEEEE: ", date.toLocaleString().split(",")[0]);
  console.log("DATEEEE: ", selectedDate);

  console.log("Searchtext: ", searchText);
  useEffect(() => {
    // Get a reference to the 'data' node in the database
    const dataRef = ref(database, "patients");

    // Create a query that filters the data based on the doctorID field
    const doctorIDQuery = query(
      dataRef,
      orderByChild("doctorID"),
      equalTo(authContext.user)
    );

    onValue(
      doctorIDQuery,
      (snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          const patientArray = Object.keys(data).map((key) => ({
            patientuid: key,
            ...data[key],
          }));
          setPatientData(patientArray);
        } else {
          console.log("No Data to show");
        }
      },
      []
    );
  }, []);

  console.log("useContext: ", Auth);

  const handleDateChange = (event, selectedDate) => {
    console.log("Selected Date: ", selectedDate);
    // const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(selectedDate);
    setSelectedDate(selectedDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <Background>
      {/* <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 25 }}>
                <View style={{ alignItems: 'flex-end', width: '90%' }}>
                    <Image source={require('../assets/doctorimg.png')}
                        style={styles.topImage} />

                </View>
            </View> */}
      <View style={{ alignItems: "center", width: width }}>
        <View
          style={{
            paddingTop: 40,
            flexDirection: "row",
            alignItems: "flex-start",
            width: "90%",
          }}
        >
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 32,
                fontWeight: "bold",
                paddingTop: 10,
              }}
            >
              {" "}
              Find your Patient{" "}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 24,
                fontWeight: "bold",
                paddingTop: 5,
                paddingBottom: 10,
              }}
            >
              {" "}
              Right Now
            </Text>
          </View>
          <Pressable
            style={{ padding: 10, width: "90%" }}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              source={require("../assets/doctorimg.png")}
              style={styles.topImage}
            />
          </Pressable>
        </View>
        <View style={styles.searchSection}>
          <Image
            style={styles.searchIcon}
            source={require("../assets/search-bar.png")}
          />
          <TextInput
            style={styles.input}
            placeholder="Search"
            onChangeText={(value) => setSearchText(value)}
          />

          <View>
            <Image
              style={styles.dateIcon}
              source={require("../assets/date.png")}
            />
            <View
              style={{
                opacity: 0,
                position: "absolute",
                right: 10,
                top: -5,
              }}
            >
              <DateTimePicker
                style={{ height: 50, width: 50 }}
                value={date}
                onChange={handleDateChange}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            height: height,
            width: width,
            borderTopLeftRadius: 80,
            borderTopRightRadius: 80,
            alignItems: "center",
          }}
        >
          <ViewPatient
            navigation={navigation}
            searchText={searchText}
            patientData={patientData}
            selectedDate={selectedDate}
          />
        </View>
      </View>
    </Background>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchSection: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    padding: 6,
    borderRadius: 10,
    marginBottom: 25,
    justifyContent: "space-between",
  },
  searchIcon: {
    padding: 10,
    marginLeft: 10,
  },
  dateIcon: {
    width: 32,
    height: 32,
    // paddingRight: 10,
    marginRight: 15,
  },
  input: {
    width: "80%",
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 15,
  },

  topImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
  },
});
