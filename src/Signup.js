import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { database } from "../firebaseConfig";
import { ref, set } from "firebase/database";

// import { useFonts } from 'expo-font'

const Signup = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  console.log("UseState: ", user);

  // Firebase
  const myFirebase = (userID) => {
    const DBRef = ref(database, "user/" + userID);
    set(DBRef, user);
  };

  const handleUserNameChange = (username) => {
    setUser((prevUser) => ({
      ...prevUser,
      username: username,
    }));
  };
  const handleEmailChange = (email) => {
    setUser((prevUser) => ({
      ...prevUser,
      email: email,
    }));
  };

  const handlePasswordChange = (password) => {
    setUser((prevUser) => ({
      ...prevUser,
      password: password,
    }));
  };

  const signupUser = () => {
    setLoader(true);
    console.log("Signup btn clicked");
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
        myFirebase(userCredential.user.uid);
        // console.log(userCredential.user.uid)
        console.log("Successfully signup");
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const [fontsLoaded] = useFonts({
  //     'Raleway-Regular': require('../assets/fonts/static/Raleway-Regular.ttf'),
  //   });

  return (
    <View style={styles.container}>
      <Image
        style={styles.footer}
        source={require("../assets/header-login-screen.png")}
      />
      <Text style={styles.topText}>Sign Up</Text>
      <View style={styles.subContainer}>
        <Text style={styles.headingText}>Sign up new account</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          onChangeText={handleUserNameChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={handleEmailChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry={true}
          onChangeText={handlePasswordChange}
        />
        <Pressable style={styles.button} onPress={() => signupUser()}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        <ActivityIndicator animating={loader} size="large" />
      </View>
      <Image
        style={styles.footer}
        source={require("../assets/footer-login-screen.png")}
      />
      <Text style={styles.bottomText}>
        Already have an account?
        <Text onPress={() => navigation.navigate("Login")}> Login Now</Text>
      </Text>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subContainer: {
    justifyContent: "center",
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
    marginBottom: 13,
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
