import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import { View, Text } from "react-native";
import { COLORS } from "../utils/theme";

const Tab = createBottomTabNavigator();

const InsightsScreen = () => (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <Text>
            Isights Coming Soon!
        </Text>
    </View>
)

const TabNavigator = () => {
    return (
        <Tab.Navigator 
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: 'gray'
            }}
        >
            <Tab.Screen 
                name="Dashboard"
                component={HomeStack}
            />
            <Tab.Screen 
                name="Insights"
                component={InsightsScreen}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;