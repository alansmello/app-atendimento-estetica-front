import React, { useState, useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Text,
    Box,
    Center,
    Stack,
    Input,
    Icon,
    FormControl,
    Button,
    VStack,
    Image
} from 'native-base';
import { api } from "../../services/clinicaestetica";

import { GestureResponderEvent } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({navigation}) => {
    
    const [show, setShow] = useState<Boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const handleLogin = async (e: GestureResponderEvent) => {
        e.preventDefault();

       
        try {
            const resposta = await api.post("login", {
                "username": username,
                "password": senha
            });
            if (resposta.status === 200) {
                
                storeData( JSON.stringify(resposta.data) )
                navigation.navigate("Patient")
              
            }} catch (error) {
            console.log('Erro ao realizar login' + JSON.stringify(error));
    
        }}
    
        const storeData = async (token: string) => {
            try {
              await AsyncStorage.setItem('auth', token)
            } catch (e) {
              console.log(e)
            }
          }

    return (
        <Center
            height={"full"}

        >
            <Box
                width={"full"}

            >
                <Center>
                    <Image source={require('../../images/logo.png')} alt="Alternate Text" size="2xl" />
                    <Stack mt={3} space={4} w="100%" maxW="300px">
                        <Text bold fontSize="md" mb="4" color={'black'}>
                            Login
                        </Text>
                        <FormControl>
                            <Input w={{
                                base: "100%",
                                md: "25%"
                            }} InputRightElement={<Icon as={<MaterialIcons name="person" />} size={5} mr="2" color="black" />} placeholder="Username" borderColor={'black'} type="text" value={username} onChangeText={setUsername} />
                        </FormControl>
                        <Input w={{
                            base: "100%",
                            md: "25%"
                        }} type={show ? "text" : "password"} InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="black" onPress={() => setShow(!show)} />} borderColor={'black'} placeholder="Senha"
                            value={senha} onChangeText={setSenha} />

                    </Stack>
                    <VStack space={4} alignItems="center">
                        <Button   mt="5" colorScheme="secondary" key={"lg"} size={"lg"} onPress={(e) =>{ handleLogin(e)}}>
                            Entrar
                        </Button>
                    </VStack>
                </Center>
            </Box>
        </Center>
    )
}