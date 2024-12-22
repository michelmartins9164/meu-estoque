import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import {
  Box,
  Text,
  Image,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react'
import { db } from '../../../api/firebase'
import moment from 'moment'

export default function User() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  // Estados individuais para os campos
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [belt, setBelt] = useState('')
  const [startDate, setStartDate] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [responsibleName, setResponsibleName] = useState('')
  const [responsibleContact, setResponsibleContact] = useState('')
  const [responsibleAddress, setResponsibleAddress] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [userData, setUserData] = useState<any>()
  const [photoBase64, setPhotoBase64] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return

      try {
        const userRef = doc(db, 'users', id)
        const docSnap = await getDoc(userRef)

        if (docSnap.exists()) {
          setUserData(docSnap.data())
          const data = docSnap.data()
          // Atualiza os estados individuais
          setName(data.name || '')
          setAge(data.age || '')
          setGender(data.gender || '')
          setBelt(data.belt || '')
          setStartDate(data.startDate || '')
          setBirthDate(data.birthDate || '')
          setResponsibleName(data.responsible?.name || '')
          setResponsibleContact(data.responsible?.contact || '')
          setResponsibleAddress(data.responsible?.address || '')
          setPhoto(data.avatar || '')
        } else {
          console.log('Documento não encontrado')
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [id])

  const saveChanges = async () => {
    if (!id) return

    try {
      const userRef = doc(db, 'users', id)
      await updateDoc(userRef, {
        name,
        age,
        avatar: photoBase64,
        gender,
        belt,
        startDate,
        birthDate,
        responsible: {
          name: responsibleName,
          contact: responsibleContact,
          address: responsibleAddress
        }
      })
      setIsEditing(false)
    } catch (error) {
      console.error('Erro ao salvar dados do usuário:', error)
    }
  }

  useEffect(() => {
    if (photo && photo instanceof File) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setPhotoBase64(reader.result as string)
        }
      }
      reader.readAsDataURL(photo)
    } else {
      setPhotoBase64(photo && (photo as string))
    }
  }, [photo])

  if (loading) {
    return <Text>Carregando...</Text>
  }

  return (
    <Flex
      p={4}
      bg="gray.100"
      borderRadius="md"
      h={'100vh'}
      overflow={'clip'}
      flexDir={'column'}
      justifyContent={'start'}
      alignItems={'center'}
      position={'relative'}
    >
      <Flex
        zIndex={1}
        bg={'#414141'}
        position={'absolute'}
        w={'100vw'}
        h={'150px'}
        top={'-1px'}
        justifyContent={'center'}
        alignItems={'start'}
      >
        <Text fontSize="2xl" mt={4} color={'#fff'} fontWeight="bold">
          {userData.name}
        </Text>
      </Flex>
      <Image
        mt={'50px'}
        zIndex={2}
        border={'4px solid #414141'}
        src={userData.avatar}
        alt="Avatar"
        bg={'#fff'}
        w={'100%'}
        h={'100%'}
        objectFit={'contain'}
        borderRadius="full"
        boxSize="150px"
      />
      <Input
        border={'1px solid #000'}
        bg={'#fff'}
        type="file"
        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
        color="#000"
      />
      <Box as="form" w="100%" p={4} overflow={'auto'}>
        <FormControl mb={2}>
          <FormLabel>Nome</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <FormControl mb={2}>
          <FormLabel>Idade</FormLabel>
          <Input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <FormControl mb={2}>
          <FormLabel>Gênero</FormLabel>
          <Input
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <FormControl mb={2}>
          <FormLabel>Faixa</FormLabel>
          <Input
            value={belt}
            onChange={(e) => setBelt(e.target.value)}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <FormControl mb={2}>
          <FormLabel>Entrou em</FormLabel>
          <Input
            value={moment(startDate).format('DD/MM/YYYY')}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <FormControl mb={2}>
          <FormLabel>Data de Nascimento</FormLabel>
          <Input
            value={moment(birthDate).format('DD/MM/YYYY')}
            isReadOnly={!isEditing}
          />
        </FormControl>
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Responsável
          </Text>
          <FormControl mb={2}>
            <FormLabel>Nome</FormLabel>
            <Input
              value={responsibleName}
              onChange={(e) => setResponsibleName(e.target.value)}
              isReadOnly={!isEditing}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Contato</FormLabel>
            <Input
              value={responsibleContact}
              onChange={(e) => setResponsibleContact(e.target.value)}
              isReadOnly={!isEditing}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Endereço</FormLabel>
            <Input
              value={responsibleAddress}
              onChange={(e) => setResponsibleAddress(e.target.value)}
              isReadOnly={!isEditing}
            />
          </FormControl>
        </Box>
        <Flex mt={4} justifyContent="space-between">
          {!isEditing ? (
            <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          ) : (
            <Button colorScheme="green" onClick={saveChanges}>
              Salvar
            </Button>
          )}
          {isEditing && (
            <Button colorScheme="red" onClick={() => setIsEditing(false)}>
              Cancelar
            </Button>
          )}
        </Flex>
      </Box>
    </Flex>
  )
}
