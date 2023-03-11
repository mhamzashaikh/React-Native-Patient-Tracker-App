import { StyleSheet, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import AddPatient from "./screens/AddPatient";
import Profile from "./screens/Profile";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/home-blue.png")
                  : require("../assets/home.png")
              }
              style={{
                width: size,
                height: size,
                borderRadius: size,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddPatient"
        component={AddPatient}
        options={{
          tabBarLabel: "Add Patient",
          tabBarLabelStyle: {
            position: "relative",
            bottom: 8,
          },
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/add-blue.png")
                  : require("../assets/add.png")
              }
              style={{
                position: "relative",
                bottom: 20,
                width: size * 2,
                height: size * 2,
                borderRadius: size,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={
                focused
                  ? require("../assets/profile-blue.png")
                  : require("../assets/profile.png")
              }
              style={{
                width: size,
                height: size,
                borderRadius: size,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
