import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import Splash from "./src/Splash";
import Login from "./src/Login";
import Signup from "./src/Signup";
import AuthContext from "./AuthContext";
import BottomTabNavigation from "./src/BottomTabNavigation";
import ProtectedWrapper from "./ProtectedWrapper";
import PatientDetails from "./src/PatientDetails";

// function HomeScreen({ navigation }) {

//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//       <Button title="Click here" onPress={() => navigation.navigate("New")} />
//     </View>
//   );
// }
// function NewScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>New Screen</Text>
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState("");

  function signin(newUser, callback) {
    setUser(newUser);
    callback();
  }

  function signout() {
    setUser(null);
  }

  let value = { user, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
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
