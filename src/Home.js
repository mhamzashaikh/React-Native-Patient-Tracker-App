import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React, { useContext } from "react";
import Background from "./Background";
import { useWindowDimensions } from "react-native";
import ViewPatient from "./ViewPatient";
import AuthContext from "../AuthContext";

const Home = () => {
  const { height, width } = useWindowDimensions();
  const Auth = useContext(AuthContext);

  console.log("useContext: ", Auth);
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
          <View style={{ padding: 10, width: "90%" }}>
            <Image
              source={require("../assets/doctorimg.png")}
              style={styles.topImage}
            />
          </View>
        </View>
        <View style={styles.searchSection}>
          <Image
            style={styles.searchIcon}
            source={require("../assets/search-bar.png")}
          />
          <TextInput style={styles.input} placeholder="Search" />
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
          <ViewPatient />
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
  },
  searchIcon: {
    padding: 10,
    marginLeft: 10,
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
