import {
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import Card from '../../../components/Card'
import search from '../../../assets/search.svg'
import { useEffect } from 'react'
import { useAllOutfitsQuery } from '../../../services/queries/useAllOutfitsQuery'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const teste = useAllOutfitsQuery().data
  useEffect(() => {
    console.log(teste)
  }, [teste])

  const navigate = useNavigate()
  return (
    <Flex
      bg={'#131313'}
      h={'100vh'}
      w={'100%'}
      overflow={'clip'}
      flexDir={'column'}
    >
      <Flex mt={3} justifyContent={'center'}>
        <InputGroup>
          <InputLeftElement>
            <Image src={search} w={6} h={6} />
          </InputLeftElement>

          <Input
            w={'70%'}
            type="text"
            bg="#151316"
            color="#A4A4A4"
            borderRadius="6px"
            border="1px solid #A4A4A4"
            _focus={{
              borderColor: '#ffffff',
              bg: '#151316'
            }}
          />
        </InputGroup>
        <Button onClick={() => navigate('/cadastrar')}>Cadastrar</Button>
      </Flex>
      <Flex
        overflow={'auto'}
        mt={4}
        mb={4}
        flex={'1'}
        justifyContent={'space-around'}
        flexWrap={'wrap'}
        rowGap={3}
      >
        {teste?.map((item: any) => (
          <Card
            id={item.id}
            belt={item.belt}
            classType={item.classType}
            key={item.id}
            name={item.name}
            age={item.age}
            avatar={`${item.avatar}`}
          />
        ))}
      </Flex>
    </Flex>
  )
}
