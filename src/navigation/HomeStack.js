import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/HomeScreen';
import AddTransaction from "../screens/AddTransaction";

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HomeMain"
                component={HomeScreen}
                options={{ headerShow: false }}
            />

            <Stack.Screen
                name="AddTransaction"
                component={AddTransaction}
                options={{ title: 'Add New Entry' }}
            />
        </Stack.Navigator>
    )
}

export default HomeStack;