import React, { Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Provider from './components/Provider'
import User from './components/User'

const Stack = createStackNavigator()

function App({navigation}) {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={App} />
                <Stack.Screen name="Provider" component={Provider} />
                <Stack.Screen name="User" component={User} />
            </Stack.Navigator>
        </NavigationContainer>
        <Button title="Health Provider"
        onPress={() => navigation.navigate("Provider")} />
        <Button title="Patient Record Access"
        onPress={() => navigation.navigate("User")} />
    )
}


export default App;
