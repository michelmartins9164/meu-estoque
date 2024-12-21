import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../api/firebase'
import moment from 'moment'

export default function Register() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [belt, setBelt] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [responsibleName, setResponsibleName] = useState('')
  const [responsibleContact, setResponsibleContact] = useState('')
  const [responsibleAddress, setResponsibleAddress] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoBase64, setPhotoBase64] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState('')
  const navigate = useNavigate()

  // Converte a imagem para Base64
  useEffect(() => {
    if (photo) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) {
          setPhotoBase64(reader.result as string)
        }
      }
      reader.readAsDataURL(photo)
    } else {
      setPhotoBase64(null)
    }
  }, [photo])

  const handleRegister = async () => {
    console.log({
      name,
      age,
      gender,
      belt,
      birthDate,
      responsibleName
    })
    if (
      !name ||
      !age ||
      !gender ||
      !belt ||
      !birthDate ||
      !responsibleName ||
      !startDate
    ) {
      alert('Por favor, preencha todos os campos obrigatórios!')
      return
    }

    setIsLoading(true)

    try {
      // Adiciona os dados no Firestore
      await addDoc(collection(db, 'users'), {
        name,
        age: parseInt(age, 10),
        gender,
        belt: belt,
        startDate: moment().format('YYYY-MM-DD'),
        birthDate,
        responsible: {
          name: responsibleName,
          contact: responsibleContact,
          address: responsibleAddress
        },
        avatar: photoBase64
      })

      alert('Usuário cadastrado com sucesso!')
      navigate('/home')
    } catch (error) {
      console.error('Erro ao salvar os dados:', error)
      alert('Erro ao salvar os dados. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Flex
      bg={'#ddd'}
      h="100vh"
      w="100%"
      justifyContent="center"
      alignItems="center"
      overflow={'clip'}
    >
      <Flex
        overflow={'auto'}
        h={'100%'}
        p={8}
        borderRadius="8px"
        flexDir="column"
        boxShadow="lg"
        w="400px"
      >
        <VStack spacing={4}>
          <FormControl>
            <FormLabel color="#000">Nome</FormLabel>
            <Input
              border={'1px solid #000'}
              bg={'#fff'}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              color="#000"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="#000">Idade</FormLabel>
            <Input
              border={'1px solid #000'}
              bg={'#fff'}
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              color="#000"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="#000">Gênero</FormLabel>
            <Select
              border={'1px solid #000'}
              bg={'#fff'}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Selecione um gênero"
            >
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel color="#000">Faixa</FormLabel>
            <Select
              border={'1px solid #000'}
              bg={'#fff'}
              value={belt}
              onChange={(e) => setBelt(e.target.value)}
              placeholder="Selecione uma faixa"
            >
              <option value="Branca">Branca</option>
              <option value="Cinza">Cinza</option>
              <option value="Amarela">Amarela</option>
              <option value="Laranja">Laranja</option>
              <option value="Verde">Verde</option>
              <option value="Azul">Azul</option>
              <option value="Roxa">Roxa</option>
              <option value="Marrom">Marrom</option>
              <option value="Preta">Preta</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel color="#000">Data de Nascimento</FormLabel>
            <Input
              border={'1px solid #000'}
              bg={'#fff'}
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              color="#000"
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#000">Data de Inicio</FormLabel>
            <Input
              border={'1px solid #000'}
              bg={'#fff'}
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              color="#000"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="#000">Nome do Responsável</FormLabel>
            <Input
              border={'1px solid #000'}
              bg={'#fff'}
              type="text"
              value={responsibleName}
              onChange={(e) => setResponsibleName(e.target.value)}
              color="#000"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="#000">Contato do Responsável</FormLabel>
            <Input
              border={'1px solid #000'}
              bg={'#fff'}
              type="text"
              value={responsibleContact}
              onChange={(e) => setResponsibleContact(e.target.value)}
              color="#000"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="#000">Endereço do Responsável</FormLabel>
            <Input
              border={'1px solid #000'}
              bg={'#fff'}
              type="text"
              value={responsibleAddress}
              onChange={(e) => setResponsibleAddress(e.target.value)}
              color="#000"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="#000">Foto</FormLabel>
            <Input
              border={'1px solid #000'}
              bg={'#fff'}
              type="file"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              color="#000"
            />
          </FormControl>

          <Button
            colorScheme="blue"
            w="full"
            onClick={handleRegister}
            isLoading={isLoading}
          >
            Cadastrar
          </Button>
        </VStack>
      </Flex>
    </Flex>
  )
}
