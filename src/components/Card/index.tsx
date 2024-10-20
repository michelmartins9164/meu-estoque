import { Flex, Image, Text } from '@chakra-ui/react'

export default function Card() {
  return (
    <Flex>
      <Flex flexDir={'column'}>
        <Image
          borderRadius={'6px 6px 0 0'}
          fit={'cover'}
          w={'100%'}
          h={'240px'}
          src="https://img.ltwebstatic.com/images3_spmp/2023/11/27/60/17010958424872eaa65a2fe14079d25fa33a9069a5.png"
        />
        <Flex
          py={2}
          bg={'#fff'}
          flexDir={'column'}
          borderRadius={'0 0 4px 4px'}
        >
          <Text
            fontWeight={'500'}
            ml={2}
            w={'150px'}
            textOverflow={'ellipsis'}
            overflow={'hidden'}
            whiteSpace={'nowrap'}
          >
            Camisa branca tatata
          </Text>
          <Text color={'#FA635E'} fontWeight={'500'} ml={2} w={'150px'}>
            R$ 100,00
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
