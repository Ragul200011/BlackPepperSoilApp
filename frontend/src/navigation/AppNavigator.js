import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SensorScreen from '../screens/SensorScreen';     
import HistoryScreen from '../screens/HistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';


const Tab = createBottomTabNavigator();


export default function AppNavigator() {
return (
<Tab.Navigator screenOptions={{ headerShown: false }}>
<Tab.Screen name="Home" component={HomeScreen} />
<Tab.Screen name="Sensors" component={SensorScreen} />
<Tab.Screen name="History" component={HistoryScreen} />
<Tab.Screen name="Settings" component={SettingsScreen} />
</Tab.Navigator>
);

}