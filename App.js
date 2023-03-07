import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Splash from "./src/Splash";
import Login from "./src/Login";
import Signup from "./src/Signup";
import AuthContext from "./AuthContext";
import BottomTabNavigation from "./src/BottomTabNavigation";
import ProtectedWrapper from "./ProtectedWrapper";
import PatientDetails from "./src/PatientDetails";
// import * as SecureStore from "expo-secure-store";
import { auth } from "./firebaseConfig";
import { getAuth } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // console.log("user: ", user.uid);
      if (user) {
        console.log("User is signed in");
        setUser(user.uid);
        setLoader(false);
      } else {
        console.log("User is not signed in");
        setLoader(false);
      }
    });
  }, []);
  console.log("User state::::: ", user);
  // const authContext = useContext(AuthContext);
  // console.log("APP.js Auth: ", authContext);

  function signin(newUser, callback) {
    setUser(newUser);
    callback();
  }

  function signout() {
    setUser(null);
  }

  let value = { user, signin, signout };

  console.log("Auth: ", auth);

  // auth.onAuthStateChanged((user) => {
  //   console.log("user: ", user.uid);
  //   if (user) {
  //     console.log("User is signed in");
  //     setUser(user.uid);
  //   } else {
  //     console.log("User is not signed in");
  //   }
  // });
  // const gettingAuth = () => {
  //   const mauth = getAuth();
  //   // console.log("User auth: ", mauth.currentUser);
  //   const currentSiginedUser = mauth.currentUser;
  //   return currentSiginedUser;
  // };

  // console.log(gettingAuth());

  if (loader) {
    return (
      <View
        style={{
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator animating={loader} size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={user?.length > 0 ? "BottomTab" : "Splash"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
          <Stack.Screen name="PatientDetails" component={PatientDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>

    // <View style={styles.container}>
    //   <Text>This is Hamza App</Text>
    //   <Text>{text}</Text>
    //   <TextInput
    //     value={text}
    //     style={{ width:"80%", height: 40, borderColor: 'gray', borderWidth: 1 }}
    //   />
    //   <Button
    //   title='Click on me'
    //   onPress={updateCount}
    //   />

    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
