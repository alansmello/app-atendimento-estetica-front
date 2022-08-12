import React, { useEffect, useState, useContext } from "react";
import { api } from '../../services/clinicaestetica';
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider } from "native-base";
import { AuthenticationContext } from '../../context/Authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PatientProps {
  id: number,
  name: string,
  whatsapp: string,
  email: string,
  birthday: string,
  avatarUrl: "https://i.pinimg.com/originals/eb/7a/76/eb7a76586b59150000d30b3b3339c883.png"
}
export const Patient = () => {
  
  const [PatientList, setPatientList] = useState<PatientProps[]>([]);

  useEffect(() => {
    const list = async () => {
      let token = JSON.parse(await AsyncStorage.getItem('auth'));
     
      try {
        const patientAPI = await api.get(`patient/getAllPatient`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setPatientList(patientAPI.data);

      } catch (error) {
        console.log(error)
      }
    }
    list();
  }, []);
  

   return <Box>
    <Heading marginTop="50 px" fontSize="xl" p="4" pb="3">
      Lista de Pacientes
    </Heading>
    <FlatList data={PatientList} renderItem={({ item }) =>
      <Box borderBottomWidth="1" _dark={{
        borderColor: "gray.600"
      }} borderColor="coolGray.200" pl="4" pr="5" py="2">
        <HStack space={3} justifyContent="space-between">
          <Avatar size="48px" source={{
            uri: item.avatarUrl
          }} />
          <VStack>
            <Text _dark={{
              color: "warmGray.50"
            }} color="coolGray.800" bold>
              {item.name}
            </Text>
            <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
              {item.email}
            </Text>
            <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
              {item.whatsapp}
            </Text>
            <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
              {item.birthday.split("-").reverse().join("/")}
            </Text>
          </VStack>
          <Spacer />
          <Text fontSize="xs" _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" alignSelf="flex-start">

          </Text>
        </HStack>
      </Box>} keyExtractor={item => item.name} />
  </Box>;
};