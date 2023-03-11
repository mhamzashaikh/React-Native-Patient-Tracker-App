import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";
import Splash from "./src/screens/Splash";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import AuthContext from "./AuthContext";
import BottomTabNavigation from "./src/BottomTabNavigation";
import PatientDetails from "./src/screens/PatientDetails";
import { auth } from "./firebaseConfig";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
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

  function signin(newUser, callback) {
    setUser(newUser);
    callback();
  }

  function signout() {
    setUser(null);
  }

  let value = { user, signin, signout };

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
  );
}
