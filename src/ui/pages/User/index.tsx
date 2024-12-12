import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { Box, Text, Image } from '@chakra-ui/react'
import { db } from '../../../api/firebase'
import moment from 'moment'

export default function User() {
  const { id } = useParams() // Pega o ID da URL
  const [userData, setUserData] = useState<any>(null) // Armazena os dados do usuário
  const [loading, setLoading] = useState(true) // Controla o estado de carregamento

  // Buscar os dados do usuário quando o ID mudar
  useEffect(() => {
    const fetchUserData = async () => {
      if (!id) return // Se não houver id, não faz nada

      try {
        const userRef = doc(db, 'users', id) // Refere-se ao documento do usuário pelo ID
        const docSnap = await getDoc(userRef) // Obtém o documento

        if (docSnap.exists()) {
          setUserData(docSnap.data()) // Armazena os dados no estado
        } else {
          console.log('Documento não encontrado')
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error)
      } finally {
        setLoading(false) // Termina o carregamento
      }
    }

    fetchUserData()
  }, [id]) // Dependendo do ID, irá buscar os dados novamente

  if (loading) {
    return <Text>Carregando...</Text> // Exibe uma mensagem de carregamento
  }

  if (!userData) {
    return <Text>Usuário não encontrado</Text> // Se não encontrar dados, exibe mensagem
  }

  return (
    <Box p={4} bg="gray.100" borderRadius="md" h={'100vh'} overflow={'clip'}>
      <Image
        src={userData.avatar}
        alt="Avatar"
        borderRadius="full"
        boxSize="150px"
      />
      <Text fontSize="2xl" fontWeight="bold">
        {userData.name}
      </Text>
      <Text>Idade: {userData.age}</Text>
      <Text>Gênero: {userData.gender}</Text>
      <Text>Faixa: {userData.belt}</Text>
      <Text>Entoru em: {moment(userData.entryDate).format('DD/MM/YYYY')}</Text>
      <Text>
        Data de Nascimento: {moment(userData.birthDate).format('DD/MM/YYYY')}
      </Text>
      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold">
          Responsável
        </Text>
        <Text>Nome: {userData.responsible.name}</Text>
        <Text>Contato: {userData.responsible.contact}</Text>
        <Text>Endereço: {userData.responsible.address}</Text>
      </Box>
    </Box>
  )
}
