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
import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import AuthContext from "../../AuthContext";
const Login = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const authcontext = useContext(AuthContext);

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

  const signinUser = () => {
    setLoader(true);
    console.log("Sigin btn clicked");
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        console.log("Successfully signin", userCredential);

        // --------- context auth --------
        authcontext.signin(userCredential.user.uid, () => {
          navigation.replace("BottomTab");
        });

        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.footer}
        source={require("../../assets/header-login-screen.png")}
      />
      <Text style={styles.topText}>Sign In</Text>
      <View style={styles.subContainer}>
        <Text style={styles.headingText}>Welcome Back</Text>
        <Text style={styles.simpleText}>Sign in to continue</Text>
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
        <Pressable style={styles.button} onPress={() => signinUser()}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
        <ActivityIndicator animating={loader} size="large" />
      </View>
      <Image
        style={styles.footer}
        source={require("../../assets/footer-login-screen.png")}
      />
      <Text style={styles.bottomText}>
        Don’t have an account?{" "}
        <Text onPress={() => navigation.navigate("Signup")}>Signup Now</Text>
      </Text>
    </View>
  );
};

export default Login;

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
