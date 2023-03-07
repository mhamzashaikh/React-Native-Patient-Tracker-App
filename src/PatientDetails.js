import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

const PatientDetails = ({route}) => {
  console.log("DATA: ", route.params)
  const { cost, dateOfArrival, doctorID, patientDisease, patientName, patientPhoneNumber,patientuid,prescription} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.footer}
          source={require("../assets/header-login-screen.png")}
        />
        <Text style={styles.topText}>Patient Details</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.headingText}>Patient Information</Text>
        {/* <Text style={styles.simpleText}>Sign in to continue</Text> */}
        <Image source={require("../assets/patientimg.png")} />
        <TextInput
          style={styles.input}
          placeholder="Patient Name"
          value={patientName}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Patient Disease"
          value={patientDisease}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={patientPhoneNumber}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Prescription"
          value={prescription}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Cost"
          value={cost}
          editable={false}
        />
        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity> */}
      </View>
      {/* <Image
        style={styles.footer}
        source={require("../assets/footer-login-screen.png")}
      /> */}
      {/* <Text style={styles.bottomText}>
        Don’t have an account?{" "}
        <Text onPress={() => navigation.navigate("Signup")}>Signup Now</Text>
      </Text> */}
    </View>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    flex: 3,
    justifyContent: "start",
    alignItems: "center",
    width: "95%",
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
  simpleText: {
    marginBottom: 15,
  },
  input: {
    width: "90%",
    height: 40,
    margin: 12,
    // borderWidth: 1,
    // borderColor:'#35A2CD',
    backgroundColor: "rgb(220,220,220)",
    padding: 10,
    borderRadius: 12,
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
