import React, { useEffect, useState, useContext } from "react";
import { api } from '../../services/clinicaestetica';
import { MaterialIcons } from '@expo/vector-icons';

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Box, FlatList, Heading, Avatar, HStack, FormControl, Input, VStack, Text, Spacer, Center, NativeBaseProvider,Image, Button, Modal, Stack, Divider, ScrollView, Icon } from "native-base";
import { GestureResponderEvent } from "react-native";
import { AuthenticationContext } from "../../context/Authentication";


interface PatientProps {
  id: number,
  name: string,
  whatsapp: string,
  email: string,
  birthday: string,
  avatarUrl: "https://www.w3schools.com/css/img_lights.jpg"
}
export const Patient = ({ navigation }) => {

  const [PatientList, setPatientList] = useState<PatientProps[]>([]);
  const [PatientId, setPatientId] = useState(0);
  const [name, setName] = useState("");
  const [whatsApp, setwhatsApp] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  //const [token, setToken] = useState<String>("");
  const token = useContext(AuthenticationContext).token
  const [search, setSearch] = useState<string>("")

  /*  useEffect(() => {
     const list = async () => {
       //setToken(JSON.parse(await AsyncStorage.getItem('auth')));
 
       try { <Button onPress={() => {
       setShowModalAdd(true)
     }}>Novo Paciente</Button>
         const patientAPI =  await api.get(`patient/getAllPatient`, {
 
        
          headers: { Authorization: `Bearer ${JSON.parse(token)}` }
 
         })
         
         setPatientList(patientAPI.data);
         setRefresh(false);
 
       } catch (error) {
         console.log(error)
         console.log(token);
       }
     }
     list();
   }, [refresh]); */

  const getOne = async () => {


    try {
      const patientAPI = await api.get(`patient/${search}`, {

        headers: { Authorization: `Bearer ${JSON.parse(token)}` }

      })

      setPatientList(patientAPI.data);


    } catch (error) {
      console.log(error)

    }
  }

  const deletePatient = async () => {
    try {
      const patientAPI = await api.delete(`patient/deletePatient/${PatientId}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      setRefresh(true)
    } catch (error) {
      console.log("error")
    }
  }

  const editPatient = async () => {
    try {
      const patientAPI = await api.put(`patient/editPatient/${PatientId}`, {
        name: `${name}`,
        email: `${email}`,
        whatsapp: `${whatsApp}`,
        birthday: `${birthday}`
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      setRefresh(true)
    } catch (error) {
      // console.log("abc")
    }
  }

  const addPatient = async (e: GestureResponderEvent) => {
    e.preventDefault();

    try {
      const patientAPI = await api.post(`patient/addPatient`, {
        name: `${name}`,
        email: `${email}`,
        whatsapp: `${whatsApp}`,
        birthday: `${birthday}`
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      setRefresh(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Center height={"full"}>
      <Box safeArea p="0" h="80%" w="80%" maxW="290">

      <Image source={require('../../images/logo.png')} alt="logomarca Priscila Haubrich" size="md" style={{width:290}} />

        <FormControl>
     
          <Input w={{
            base: "100%",
            md: "25%"
          }}  borderColor={'black'} type="text" value={search} onChangeText={setSearch} />

        </FormControl>
        <Button mt="1" mb="8" colorScheme="indigo" onPress={() => getOne()}>
          Buscar Paciente
        </Button>

        <Button onPress={() => {
          setShowModalAdd(true)
        }}>Criar novo paciente</Button>


        <Modal isOpen={showModalAdd} onClose={() => setShowModalAdd(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Adicionar Pacientes</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Nome</FormControl.Label>
                <Input value={name} onChangeText={setName} />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Email</FormControl.Label>
                <Input value={email} onChangeText={setEmail} />
              </FormControl>
              <FormControl>
                <FormControl.Label>WhatsApp</FormControl.Label>
                <Input value={whatsApp} onChangeText={setwhatsApp} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Data de aniversário</FormControl.Label>
                <Input value={birthday} onChangeText={setBirthday} />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                  setShowModalAdd(false);
                }}>
                  Sair
                </Button>
                <Button onPress={(e) => {
                  addPatient(e);
                  setShowModalAdd(false);
                }}>
                  Confirmar
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>


        <FlatList data={PatientList} renderItem={({ item }) =>


          <Box borderBottomWidth="5" _dark={{
            borderColor: "gray.900"
          }} borderColor="coolGray.200" pl="4" pr="5" py="2" >
            <HStack marginTop={"10px"}  space={3} justifyContent="space-between">
              {/* <Avatar size="48px" source={{
            uri: item.avatarUrl
          }} /> */}
              <VStack>
                <Text _dark={{
                  color: "warmGray.50"
                }} color="coolGray.800" bold>
                  Nome: {item?.name}
                </Text>
                <Text color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }}>
                 Email:  {item?.email}
                </Text>
                <Text color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }}>
                  Whatsapp: {item?.whatsapp}
                </Text>
                <Text color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }}>
                  Nascimento: {item.birthday?.split("-").reverse().join("/")}
                </Text>
                <Stack mb="2.5" mt="1.5" direction={{
                  base: "row",
                  md: "row"
                }} space={2} mx={{
                  base: "auto",
                  md: "0"
                }}>
                  <Button marginLeft={"60px"} onPress={() => {
                    setPatientId(item.id)
                    setShowModalEdit(true)
                  }}>Editar</Button>
                  <Button onPress={() => {
                    setPatientId(item.id)
                    setShowModal(true)
                  }}>Excluir</Button>
                </Stack>
              </VStack>

              <Spacer />

              <Text fontSize="xs" _dark={{
                color: "warmGray.50"
              }} color="coolGray.800" alignSelf="flex-start">

                <Modal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)}>
                  <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Editar Pacientes</Modal.Header>
                    <Modal.Body>
                      <FormControl>
                        <FormControl.Label>Nome</FormControl.Label>
                        <Input value={name} onChangeText={setName} />
                      </FormControl>
                      <FormControl mt="3">
                        <FormControl.Label>Email</FormControl.Label>
                        <Input value={email} onChangeText={setEmail} />
                      </FormControl>
                      <FormControl>
                        <FormControl.Label>WhatsApp</FormControl.Label>
                        <Input value={whatsApp} onChangeText={setwhatsApp} />
                      </FormControl>
                      <FormControl>
                        <FormControl.Label>Data de aniversário</FormControl.Label>
                        <Input value={birthday} onChangeText={setBirthday} />
                      </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button.Group space={2}>
                        <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                          setShowModalEdit(false);
                        }}>
                          Sair
                        </Button>
                        <Button onPress={() => {
                          editPatient();
                          setShowModalEdit(false);
                        }}>
                          Confirmar
                        </Button>
                      </Button.Group>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                  <Modal.Content maxWidth="350">
                    <Modal.CloseButton />
                    <Modal.Body>
                      <VStack space={3}>
                        <HStack alignItems="center" justifyContent="space-between">
                          <Text alignItems="center" >TEM CERTEZA QUE DESEJA EXCLUIR O PACIENTE?</Text>
                        </HStack>
                      </VStack>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button margin={"10px"} flex="1" onPress={() => {
                        setShowModal(false);
                        deletePatient()
                      }}>
                        SIM
                      </Button>
                      <Button margin={"10px"} flex="1" onPress={() => {
                        setShowModal(false);
                      }}>
                        NÃO
                      </Button>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
              </Text>
            </HStack>
          </Box>} keyExtractor={item => item.name} />

      </Box>
    </Center>
  )
};