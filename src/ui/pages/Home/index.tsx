import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement
} from '@chakra-ui/react'
import Card from '../../../components/Card'
import search from '../../../assets/search.svg'
export default function Home() {
  return (
    <Flex
      bg={'#151316'}
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
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Flex>
    </Flex>
  )
}
