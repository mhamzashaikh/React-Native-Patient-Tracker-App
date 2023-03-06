
import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'

const Splash = ({ navigation }) => {
    useEffect(()=>{


        setTimeout(()=>{
            navigation.replace('Login');
        }, 3000)
    },[]);

    return (
        <View style={styles.container}>
            <Image source={require("../assets/splash.png")} />
            <Text style={styles.titleText}>Patient Tracker App</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    titleText: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold',
      },



})