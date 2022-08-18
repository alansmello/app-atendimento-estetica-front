import React, { useEffect, useState, useContext } from "react";
import { api } from '../../services/clinicaestetica';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Box, FlatList, Heading, Avatar, HStack, FormControl, Input, VStack, Text, Spacer, Center, NativeBaseProvider, Image, Button, Modal, Stack, Divider, ScrollView, Icon, IconButton } from "native-base";
import { GestureResponderEvent, TouchableOpacity } from "react-native";
import { AuthenticationContext } from "../../context/Authentication";
import  ImagePicker from "react-native-image-picker"
import { convertAbsoluteToRem } from "native-base/lib/typescript/theme/v33x-theme/tools";

interface PatientProps {
    id: number,
    name: string,
    whatsapp: string,
    email: string,
    birthday: string,
}

interface ServiceProps {
    id: number,
    name: string,
}

export const Attendance = ({ navigation }) => {

    const [PatientList, setPatientList] = useState<PatientProps[]>([]);
    const [ServiceList, setServiceList] = useState<ServiceProps[]>([]);
    const [PatientId, setPatientId] = useState(0);
    const [ServiceId, setServiceId] = useState(0);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalService, setShowModalService] = useState(false);
    const token = useContext(AuthenticationContext).token
    const [search, setSearch] = useState<string>("")
    const [searchService, setSearchService] = useState<string>("")
    const [anexo, setAnexo] = useState('');


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

    const getOneService = async () => {


        try {
            const serviceAPI = await api.get(`service/${searchService}`, {

                headers: { Authorization: `Bearer ${JSON.parse(token)}` }

            })

            setServiceList(serviceAPI.data);


        } catch (error) {
            console.log(error)

        }
    }

    const addAttendance = async (e: GestureResponderEvent) => {
        e.preventDefault();

        try {
            const attendanceAPI = await api.post(`attendance/addAttendance`, {
                description: `${description}`,
                patient: { id: `${PatientId}` },
                service: { id: `${ServiceId}` }

            }, {
                headers: { Authorization: `Bearer ${JSON.parse(token)}` }
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <Center height={"full"}>


            <Image source={require('../../images/logo.png')} alt="logomarca Priscila Haubrich" size="md" style={{ width: 290 }} />

            <FormControl>
                <FormControl.Label>Descrição</FormControl.Label>
                <Input value={description} onChangeText={setDescription} />
            </FormControl>
            <FormControl marginTop={"30px"} >

                <Input w={{
                    base: "100%",
                    md: "25%"
                }} borderColor={'black'} type="text" value={search} onChangeText={setSearch} />

            </FormControl>

            <Button mt="1" mb="8" colorScheme="indigo"
                onPress={() => {
                    getOne()
                    setShowModal(true)
                }}>
                Buscar Paciente
            </Button>

            <FormControl>

                <Input w={{
                    base: "100%",
                    md: "25%"
                }} borderColor={'black'} type="text" value={searchService} onChangeText={setSearchService} />

            </FormControl>

            <Button mt="1" mb="8" colorScheme="indigo"
                onPress={() => {
                    getOneService()
                    setShowModalService(true)
                }}>
                Buscar Serviço
            </Button>


            <IconButton size={"lg"} colorScheme="indigo" key={"solid"} variant={"solid"} _icon={{
                as: AntDesign,
                name: "adduser"
            }}
                onPress={(e) => {
                    addAttendance(e)
                }}
            />
            

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
                <Modal.Content maxWidth="350">
                    <Modal.CloseButton />
                    <Modal.Body>
                        <FlatList data={PatientList} renderItem={({ item }) =>


                            <Box borderBottomWidth="5" _dark={{
                                borderColor: "gray.900"
                            }} borderColor="coolGray.200" pl="4" pr="5" py="2" >
                                <HStack marginTop={"10px"} space={3} justifyContent="space-between">
                                    <VStack>
                                        <HStack alignItems="center" justifyContent="space-between">
                                            <Text alignItems="center" >   DESEJA INCLUIR ESSE PACIENTE?</Text>
                                        </HStack>
                                        <Text color="coolGray.600" _dark={{
                                            color: "warmGray.200"
                                        }}>
                                            id:  {item?.id}
                                        </Text>
                                        <Text color="coolGray.600" _dark={{
                                            color: "warmGray.200"
                                        }}>
                                            nome:  {item?.name}
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
                                        <Button margin={"10px"} flex="1" onPress={() => {
                                            setShowModal(false);
                                            setPatientId(item.id);
                                        }}>
                                            SIM
                                        </Button>
                                        <Button margin={"10px"} flex="1" onPress={() => {
                                            setShowModal(false);
                                        }}>
                                            NÃO
                                        </Button>
                                    </VStack>
                                </HStack>
                            </Box>} keyExtractor={item => item.name} />
                    </Modal.Body>

                    <Modal.Footer>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            <Spacer />
            <Modal isOpen={showModalService} onClose={() => setShowModalService(false)} size="lg">
                <Modal.Content maxWidth="350">
                    <Modal.CloseButton />
                    <Modal.Body>
                        <FlatList data={ServiceList} renderItem={({ item }) =>


                            <Box borderBottomWidth="5" _dark={{
                                borderColor: "gray.900"
                            }} borderColor="coolGray.200" pl="4" pr="5" py="2" >
                                <HStack marginTop={"10px"} space={3} justifyContent="space-between">
                                    {/* <Avatar size="48px" source={{
uri: item.avatarUrl
}} /> */}
                                    <VStack>
                                        <HStack alignItems="center" justifyContent="space-between">
                                            <Text alignItems="center" >   DESEJA INCLUIR ESSE SERVIÇO?</Text>
                                        </HStack>
                                        <Text color="coolGray.600" _dark={{
                                            color: "warmGray.200"
                                        }}>
                                            id:  {item?.id}
                                        </Text>
                                        <Text color="coolGray.600" _dark={{
                                            color: "warmGray.200"
                                        }}>
                                            nome:  {item?.name}
                                        </Text>
                                        <Button margin={"10px"} flex="1" onPress={() => {
                                            setShowModalService(false);
                                            setServiceId(item.id);
                                        }}>
                                            SIM
                                        </Button>
                                        <Button margin={"10px"} flex="1" onPress={() => {
                                            setShowModalService(false);
                                        }}>
                                            NÃO
                                        </Button>
                                    </VStack>
                                </HStack>
                            </Box>} keyExtractor={item => item.name} />
                    </Modal.Body>

                    <Modal.Footer>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>



        </Center>
    )
}


