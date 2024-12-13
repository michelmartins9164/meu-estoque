import { Flex, Image, Text, Box, Button } from '@chakra-ui/react'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../api/firebase'
import { useNavigate } from 'react-router-dom'

export default function Card({
  id,
  name,
  age,
  avatar,
  classType,
  belt
}: {
  id: string
  name: string
  age: number
  avatar: string
  classType: string
  belt: string
}) {
  function colorBelt(belt: string) {
    switch (belt) {
      case 'Branca':
        return '#fff'
      case 'Cinza':
        return '#A4A4A4'
      case 'Amarela':
        return '#FFD700'
      case 'Laranja':
        return '#FFA500'
      case 'Verde':
        return '#008000'
      case 'Azul':
        return '#0000FF'
      case 'Roxa':
        return '#8A2BE2'
      case 'Marrom':
        return '#8B4513'
      case 'Preta':
        return '#000'
      default:
        return '#fff'
    }
  }

  const deleteOutfitById = async (id: string) => {
    try {
      // Acesse o documento usando o ID
      const docRef = doc(db, 'users', id) // 'outfits' é o nome da coleção, 'id' é o id do documento

      // Deletar o documento
      await deleteDoc(docRef)
      console.log('Documento deletado com sucesso')
    } catch (error) {
      console.error('Erro ao deletar documento:', error)
    }
  }

  const navigate = useNavigate()
  return (
    <Flex
      onClick={() => navigate(`/user/${id}`)}
      direction={'column'}
      bg={'#1A1A1A'}
      h={'440px'}
      w={'300px'}
      borderRadius={'12px'}
      boxShadow={'lg'}
      overflow={'hidden'}
    >
      <Image
        src={avatar}
        alt={name}
        w={'100%'}
        h={'240px'}
        objectFit={'cover'}
        borderRadius={'12px 12px 0 0'}
      />

      <Flex
        direction={'column'}
        p={4}
        bg={'#2C2C2C'}
        borderRadius={'0 0 12px 12px'}
      >
        <Text
          fontSize={'xl'}
          fontWeight={'600'}
          color={'#fff'}
          isTruncated
          noOfLines={1}
        >
          {name}
        </Text>

        <Text color={'#A4A4A4'} fontWeight={'400'}>
          {age} {age > 1 ? 'anos' : 'ano'}
        </Text>

        {/* Turma */}
        <Text color={'#A4A4A4'} fontWeight={'400'} mt={2}>
          <Flex border={'1px solid'} borderColor={colorBelt(belt)} w={'110px'}>
            <Box w={'70px'} h={'20px'} bg={colorBelt(belt)}></Box>
            <Box w={'30px'} h={'20px'} bg={'#000'}></Box>
            <Box w={'10px'} h={'20px'} bg={colorBelt(belt)}></Box>
          </Flex>
        </Text>
        <Text color={'#A4A4A4'} fontWeight={'400'} mt={2}>
          Turma: {classType}
        </Text>

        {/* Redes sociais */}
        <Flex mt={3} justifyContent={'flex-start'}></Flex>
        <Button onClick={() => deleteOutfitById(id)}>Deletar</Button>
      </Flex>
    </Flex>
  )
}
