import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import{Login} from "../screens/Login";
import{Patient} from "../screens/Patient"


const Stack = createStackNavigator();

export const Routes = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown:false,
                }}
            >
                <Stack.Screen name="Login" component = {Login}/>
                <Stack.Screen name="Patient" component= {Patient} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}