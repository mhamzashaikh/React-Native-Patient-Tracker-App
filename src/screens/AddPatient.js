import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useContext } from "react";
import RNPickerSelect from "react-native-picker-select";
import AuthContext from "../../AuthContext";
import { database } from "../../firebaseConfig";
import { ref, push, child, update, serverTimestamp } from "firebase/database";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddPatient = () => {
  const authContext = useContext(AuthContext);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    appointmentDate: "",
    patientPhoneNumber: "",
    patientDisease: "",
    cost: "",
    prescription: "",
    dateOfArrival: serverTimestamp(),
    doctorID: authContext.user,
  });

  console.log("Date:::::: <<< >>> : ", formData);

  const pickerItems = [
    { label: "Covid19", value: "Covid19" },
    { label: "Diabetes", value: "Diabetes" },
    { label: "Flu", value: "Flu" },
    { label: "Fever", value: "Fever" },
    { label: "Heart Disease", value: "HeartDisease" },
    { label: "Diarrheal", value: "Diarrheal" },
  ];

  // Firebase
  const myFirebase = () => {
    // Get a key for every new Patient.
    const newPatientKey = push(child(ref(database), "patients")).key;

    // Write the new patient's data simultaneously in the patients list.
    const updates = {};
    updates["/patients/" + newPatientKey] = formData;
    console.log(updates);
    return update(ref(database), updates);
  };
  // ---------

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setFormData({
      ...formData,
      appointmentDate: currentDate.toLocaleDateString(),
    });
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.footer}
          source={require("../../assets/header-login-screen.png")}
        />
        <Text style={styles.topText}>Add Patient</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <KeyboardAvoidingView behavior="position">
          <Text style={styles.headingText}>Add your Patient Info</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Patient Name"
              onChangeText={(text) =>
                setFormData({ ...formData, patientName: text })
              }
            />
          </View>
          <View>
            <View style={styles.datePicker}>
              <Text onPress={showDatePicker} style={{ opacity: 0.3 }}>
                Appointment Date:{" "}
              </Text>
              {show && (
                <DateTimePicker value={date} onChange={handleDateChange} />
              )}
            </View>
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Patient Phone Number"
              onChangeText={(text) =>
                setFormData({ ...formData, patientPhoneNumber: text })
              }
            />
          </View>
          <View style={styles.input}>
            <RNPickerSelect
              onValueChange={(value) => {
                setFormData({ ...formData, patientDisease: value });
              }}
              items={pickerItems}
              placeholder={{ label: "Select an option", value: "" }}
              value={formData.patientDisease}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Cost"
              onChangeText={(text) => setFormData({ ...formData, cost: text })}
            />
          </View>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Prescription"
              onChangeText={(text) =>
                setFormData({ ...formData, prescription: text })
              }
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => myFirebase()}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default AddPatient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
  },
  scrollContainer: {
    height: "40%",
    width: "80%",
  },
  topText: {
    position: "absolute",
    top: 70,
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
  bottomText: {
    position: "absolute",
    bottom: 50,
    color: "white",
    fontSize: 14,
  },
  headingText: {
    fontWeight: "bold",
    color: "#35A2CD",
    fontSize: 25,
    marginBottom: 8,
  },
  input: {
    width: "90%",
    height: 40,
    margin: 12,
    backgroundColor: "rgb(220,220,220)",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  datePicker: {
    width: "90%",
    height: 40,
    margin: 12,
    backgroundColor: "rgb(220,220,220)",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    marginTop: 10,
    height: 35,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#35A2CD",
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
  },
});
