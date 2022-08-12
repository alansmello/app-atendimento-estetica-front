import React, { useEffect, useState } from "react";
import { api } from '../../services/clinicaestetica';
import { Box, FlatList, Heading, Avatar, HStack,FormControl, Input, VStack, Text, Spacer, Center, NativeBaseProvider, Button, Modal } from "native-base";

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
  const [PatientId, setPatientId] = useState(0);
  const [name, setName] = useState("");
  const [whatsApp, setwhatsApp] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [error1, setError1] = useState("");



  useEffect(() => {
    const list = async () => {
      try {
        const patientAPI = await api.get(`patient/getAllPatient`, {
          headers: { Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYXNzYSIsImV4cCI6MTY2MDQwNzg4OX0.1nod-M8sL9ETCf34PuDC_SmxpMc14L1uNgUGiQMAjpTwo8F65Ypgt3oT70jPYx7VQT0LVUOxcjKkPIoBO5jfww" }
        })
        setPatientList(patientAPI.data);

      } catch (error) {
        console.log(error)
      }
    }
    list();
  }, []);

  const deletePatient = async () => {
    try {
      const patientAPI = await api.delete(`patient/deletePatient/${PatientId}`, {
        headers: { Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYXNzYSIsImV4cCI6MTY2MDQwNzg4OX0.1nod-M8sL9ETCf34PuDC_SmxpMc14L1uNgUGiQMAjpTwo8F65Ypgt3oT70jPYx7VQT0LVUOxcjKkPIoBO5jfww" }
      })
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
        headers: { Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYXNzYSIsImV4cCI6MTY2MDQwNzg4OX0.1nod-M8sL9ETCf34PuDC_SmxpMc14L1uNgUGiQMAjpTwo8F65Ypgt3oT70jPYx7VQT0LVUOxcjKkPIoBO5jfww" }
      })
    } catch (error) {
      // console.log("abc")
    }
  }

  const addPatient = async () => {
    try {
      const patientAPI = await api.post(`patient/addPatient`, {
        name: `${name}`,
        email: `${email}`,
        whatsapp: `${whatsApp}`,
        birthday: `${birthday}`
      }, {
        headers: { Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYXNzYSIsImV4cCI6MTY2MDQwNzg4OX0.1nod-M8sL9ETCf34PuDC_SmxpMc14L1uNgUGiQMAjpTwo8F65Ypgt3oT70jPYx7VQT0LVUOxcjKkPIoBO5jfww" }
      })
    } catch (error) {
      console.log(error.patientAPI?.headers.error)
    }
  }

  return <Box>
    <Heading marginTop="50 px" fontSize="xl" p="4" pb="3">
      Lista de Pacientes
    </Heading>
    <Button onPress={() => {
              setShowModalAdd(true)}}>Novo Paciente</Button>
              <Modal isOpen={showModalAdd} onClose={() => setShowModalAdd(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Adicionar Pacientes</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Nome</FormControl.Label>
              <Input value={name} onChangeText={setName}/>
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input value={email} onChangeText={setEmail}/>
            </FormControl>
            <FormControl>
              <FormControl.Label>WhatsApp</FormControl.Label>
              <Input value={whatsApp} onChangeText={setwhatsApp}/>
              </FormControl>
              <FormControl>
              <FormControl.Label>Data de aniversário</FormControl.Label>
              <Input value={birthday} onChangeText={setBirthday}/>
              </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModalAdd(false);
            }}>
                Sair
              </Button>
              <Button onPress={() => {
              addPatient();
              setShowModalAdd(false);
            }}>
                Confirmar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    <FlatList marginTop="5 px" data={PatientList} renderItem={({ item }) =>
      <Box borderBottomWidth="1" _dark={{
        borderColor: "gray.600"
      }} borderColor="coolGray.200" pl="4" pr="5" py="2">
        <HStack  marginTop={"10px"} space={3} justifyContent="space-between">
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
            <Button margin={"10px"} onPress={() => {setPatientId(item.id) 
              setShowModalEdit(true)}}>Editar</Button>
            <Modal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Editar Pacientes</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Nome</FormControl.Label>
              <Input value={name} onChangeText={setName}/>
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input value={email} onChangeText={setEmail}/>
            </FormControl>
            <FormControl>
              <FormControl.Label>WhatsApp</FormControl.Label>
              <Input value={whatsApp} onChangeText={setwhatsApp}/>
              </FormControl>
              <FormControl>
              <FormControl.Label>Data de aniversário</FormControl.Label>
              <Input value={birthday} onChangeText={setBirthday}/>
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
            <Button onPress={() => {
              setPatientId(item.id)
              setShowModal(true)
            }}>Excluir</Button>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
              <Modal.Content maxWidth="350">
                <Modal.CloseButton />
                <Modal.Body>
                  <VStack space={3}>
                    <HStack alignItems="center" justifyContent="space-between">
                      <Text alignItems="center" >TEM CERTEZA QUE DESEJA EXCLUIR ESSE PACIENTE?</Text>
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
  </Box>;
};