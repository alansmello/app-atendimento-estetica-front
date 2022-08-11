import React, { useState } from 'react';
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

export const Login = () => {
    const [show, setShow] = useState<Boolean>(false);

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
                            }} InputRightElement={<Icon as={<MaterialIcons name="person" />} size={5} mr="2" color="black" />} placeholder="Username" borderColor={'black'} />
                        </FormControl>
                        <Input w={{
                            base: "100%",
                            md: "25%"
                        }} type={show ? "text" : "password"} InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="black" onPress={() => setShow(!show)} />} borderColor={'black'} placeholder="Senha" />

                    </Stack>
                    <VStack space={4} alignItems="center">
                        <Button mt="5" backgroundColor={'black'} key={"md"} size={"md"}>
                            Entrar
                        </Button>
                    </VStack>;
                </Center>
            </Box>
        </Center>
    )
}