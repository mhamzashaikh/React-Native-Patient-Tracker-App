// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Image,
//   useWindowDimensions,
//   TouchableOpacity,
//   Pressable,
//   Platform,
// } from "react-native";
// import React, { useContext, useState } from "react";
// import Background from "./Background";
// import { LinearGradient } from "expo-linear-gradient";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { database } from "../firebaseConfig";
// import {
//   ref,
//   set,
//   push,
//   child,
//   update,
//   serverTimestamp,
// } from "firebase/database";
// import AuthContext from "../AuthContext";
// import { Picker } from "@react-native-picker/picker";

// const AddPatient = () => {
//   const { styles } = useStyle();
//   const [date, setDate] = useState(new Date());
//   const [show, setShow] = useState(false);
//   const authContext = useContext(AuthContext);
//   const [formData, setFormData] = useState({
//     patientName: "",
//     patientPhoneNumber: "",
//     patientDisease: "",
//     patientDateOfBirth: "3/02/2002",
//     cost: "",
//     prescription: "",
//     dateOfArrival: serverTimestamp(),
//     doctorID: authContext.user,
//   });
//   const [selectedValue, setSelectedValue] = useState("java");

//   // Firebase
//   const myFirebase = () => {
//     // const DBRef = push(ref(database, "patients/")).key;
//     // set(DBRef, formData);

//     // Get a key for every new Patient.
//     const newPatientKey = push(child(ref(database), "patients")).key;

//     // Write the new patient's data simultaneously in the patients list.
//     const updates = {};
//     updates["/patients/" + newPatientKey] = formData;
//     console.log(updates);
//     return update(ref(database), updates);
//   };
//   // ---------

//   const handleDatePicked = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === "ios");
//     setDate(currentDate);
//   };

//   const showDatePicker = () => {
//     setShow(true);
//   };

//   return (


    
//     // <Background>
    
//     //   <View style={styles.headerContainer}>
      
//     //     <LinearGradient
//     //       style={styles.headerSubContainer}
//     //       colors={["#309FB1", "#3ABFBA"]}
//     //     >
//     //       <Image source={require("../assets/back.png")} />
//     //       <Text style={styles.headerText}>Add Patient Info</Text>
//     //       <Image
//     //         style={styles.headerIcon}
//     //         source={require("../assets/refresh.png")}
//     //       />
//     //     </LinearGradient>
//     //   </View>

//     //   <View style={styles.formContainer}>
      
//     //     <Text style={styles.formText}>Enter Patient Info</Text>
//     //     <TextInput
//     //       style={styles.input}
//     //       placeholder="Patient Name"
//     //       onChangeText={(text) =>
//     //         setFormData({ ...formData, patientName: text })
//     //       }
//     //     />
//     //     <TextInput
//     //       style={styles.input}
//     //       placeholder="Phone Number"
//     //       onChangeText={(text) =>
//     //         setFormData({ ...formData, patientPhoneNumber: text })
//     //       }
//     //     />

//     //     {/* <TextInput
//     //       style={styles.input}
//     //       placeholder="Patient Disease"
//     //       onChangeText={(text) =>
//     //         setFormData({ ...formData, patientDisease: text })
//     //       }
//     //     /> */}
//     //     <Pressable style={styles.dateStyle} onPress={showDatePicker}>
//     //       <Text style={styles.dateStyleText}>
//     //         Date of Birth : {!show && date.toLocaleString()}
//     //       </Text>
//     //       {show && (
//     //         <DateTimePicker
//     //           value={date}
//     //           mode={"date"}
//     //           // is24Hour={true}
//     //           display="calendar"
//     //           onChange={handleDatePicked}
//     //         />
//     //       )}
//     //     </Pressable>
//     //     <TextInput
//     //       style={styles.input}
//     //       placeholder="Cost"
//     //       onChangeText={(text) => setFormData({ ...formData, cost: text })}
//     //     />
//     //     <TextInput
//     //       style={styles.input}
//     //       placeholder="Medication Provided"
//     //       onChangeText={(text) =>
//     //         setFormData({ ...formData, prescription: text })
//     //       }
//     //     />
//     //     <TouchableOpacity style={styles.submitBtn} onPress={() => myFirebase()}>
//     //       <Text style={styles.submitBtnText}>Submit</Text>
//     //     </TouchableOpacity>
//     //   </View>
//     // </Background>
//   );
// };

// export default AddPatient;

// const useStyle = () => {
//   const { width, height } = useWindowDimensions();

//   const styles = StyleSheet.create({
//     headerContainer: {
//       flexDirection: "row",
//       width: width,
//       height: 70,
//       justifyContent: "center",
//       borderWidth: 0.7,
//       borderBottomColor: "#8C8FA5",
//     },
//     headerSubContainer: {
//       flexDirection: "row",
//       justifyContent: "space-around",
//       alignItems: "center",
//       width: width,
//       paddingTop: 10,
//       // backgroundColor: 'purple'
//     },
//     headerText: {
//       fontSize: 16,
//       fontWeight: "bold",
//       color: "#fff",
//     },
//     headerIcon: {
//       width: 28,
//       height: 28,
//     },

//     formContainer: {
//       height: height * 0.82,
//       borderWidth: 1,
//       borderColor: "red",
//       justifyContent: "center",
//       alignItems: "center",
//       flex: 1,
//     },
//     formText: {
//       fontSize: 24,
//       fontWeight: "bold",
//       color: "white",
//     },

//     input: {
//       width: "85%",
//       height: 45,
//       margin: 12,
//       backgroundColor: "rgb(220,220,220)",
//       padding: 10,
//       borderRadius: 12,
//     },
//     dateStyle: {
//       alignItems: "center",
//       justifyContent: "space-around",
//       width: "85%",
//       flexDirection: "row",
//       height: 45,
//       margin: 12,
//       backgroundColor: "rgb(220,220,220)",
//       padding: 0,
//       borderRadius: 12,
//     },
//     dateStyleText: {
//       color: "#8C8FA5",
//     },
//     submitBtn: {
//       marginTop: 10,
//       height: 35,
//       width: "50%",
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "#35A2CD",
//       borderRadius: 12,
//     },
//     submitBtnText: {
//       color: "white",
//     },
//   });

//   return { styles };
// };
