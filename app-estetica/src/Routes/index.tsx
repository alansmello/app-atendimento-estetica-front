import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import{Login} from "../screens/Login";
import{Patient} from "../screens/Patient"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';



  
const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
 const Feed = () => {
    return(
<Stack.Navigator
                screenOptions={{
                    headerShown:false,
                }}
            >
                <Tab.Screen name="Login" component = {Login}/>
                <Stack.Screen name="Patient" component= {Patient} />
            </Stack.Navigator>
    )
} 

export const Routes = ()=>{
    return (
       
        <NavigationContainer>
            <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle: { backgroundColor: "#000", paddingVertical: 2 },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#a5a9a8',
        }}
        >
            <Tab.Screen name="Login" component={Feed} options={{tabBarIcon: ({color}) => (
                           <MaterialCommunityIcons name="login" size={24} color="white" />
                        ),}} />

            <Tab.Screen name="Pacientes" component={Patient} options={{tabBarIcon: ({color}) => (
                           <Entypo name="users" size={24} color="white" />
                        ),}}/>
               
            
            </Tab.Navigator>
        </NavigationContainer>
    )
}