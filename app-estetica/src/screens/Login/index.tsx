import React, { useState, useContext } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
    Box,
    Image,
    Center,
    Stack,
    Input,
    Icon,
    FormControl,
    Button,
    Heading
} from 'native-base';

import { api } from "../../services/clinicaestetica";

import { GestureResponderEvent } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationContext } from '../../context/Authentication';

export const Login = ({ navigation }) => {

    const [show, setShow] = useState<Boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const addToken = useContext(AuthenticationContext).addToken

    const handleLogin = async (e: GestureResponderEvent) => {
        e.preventDefault();


        try {
            const resposta = await api.post("login", {
                "username": username,
                "password": senha
            });
            if (resposta.status === 200) {

                storeData(JSON.stringify(resposta.data))
                addToken(JSON.stringify(resposta.data))
                console.log("teste")
                navigation.navigate("Patient")

            }
        } catch (error) {
            console.log('Erro ao realizar login' + JSON.stringify(error));

        }
    }

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
                safeArea p="0" w="100%" maxW="290" py="9"

            >

                <Image source={require('../../images/logo.png')} alt="logomarca Priscila Haubrich" size="2xl" style={{width:290}} />
                <Stack mt={3} space={4} w="100%" maxW="300px">
                    <Heading size="lg" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }} fontWeight="semibold">
                        Bem vinda,
                    </Heading>
                    <Heading mt="1" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                    }} fontWeight="medium" size="xs">
                        Faça o Login pra continuar!
                    </Heading>

                    <FormControl>
                        <FormControl.Label >Username</FormControl.Label>
                        <Input w={{
                            base: "100%",
                            md: "25%"
                        }} InputRightElement={<Icon as={<MaterialIcons name="person" />} size={5} mr="2" color="black" />} borderColor={'black'} type="text" value={username} onChangeText={setUsername} />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label >Senha</FormControl.Label>
                        <Input w={{
                            base: "100%",
                            md: "25%"
                        }} type={show ? "text" : "password"} InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="black" onPress={() => setShow(!show)} />} borderColor={'black'}
                            value={senha} onChangeText={setSenha} />
                    </FormControl>
                </Stack>
                <Button mt="8" colorScheme="indigo" onPress={(e)=>handleLogin(e)}>
                    Entrar
                </Button>


            </Box>
        </Center>
    )
}