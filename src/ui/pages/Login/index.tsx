import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Text, useToast } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FormEvent } from 'react'

import { auth } from '../../../api/firebase'
import password from '../../../assets/password.svg'
import user from '../../../assets/user.svg'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const toast = useToast()
   async function SingIn(e: FormEvent) {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, 'michelmartins9164@gmail.com', '123456') 
            navigate('/home')
        } catch(err) {
            console.log(err)
            toast({
                title: 'Erro ao fazer login',
                description: 'Usuário ou senha incorretos',
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }   
    }
    return (
        <Flex w={'100%'} h={'100vh'} bg={'#151316'} position={'relative'} align={'end'}>
            <Box as="span"
                w={'380px'}
                h={'380px'}
                position={'absolute'}
                borderRadius={'50%'}
                bgGradient='linear(to-r, #B379DF, #360060)'
                transform="translateX(-50%)"
                left={'50%'}
                top={'-390px'}
                filter={'blur(140px)'}
            />
            <Flex
                opacity={'100%'}
                h={'80%'}
                borderRadius={'20px 20px  0 0'}
                w={'100%'}
                justifyContent={'center'}
            >
                <Flex justifyContent={'center'} align={'center'}>
                    <form onSubmit={(e)=>SingIn(e)}>
                        <Flex flexDir={'column'} w={'100%'} justifyContent={'center'} align={'center'}>
                            <Flex align={'center'} mb={4}>
                                <InputGroup alignItems={'center'}>
                                    <InputLeftElement pointerEvents='none' h={'40px'} pl={2}>
                                        <Box as="img" src={user} w={6} h={6} />
                                    </InputLeftElement>
                                    <Input
                                        pl={10}
                                        placeholder="Usuário"
                                        w={'300px'}
                                        h={'40px'}
                                        bg={'#151316'}
                                        color={'#A4A4A4'}
                                        borderRadius={'6px'}
                                        border={'1px solid #A4A4A4'}
                                        _focus={{
                                            borderColor: '#ffffff',
                                            bg: '#151316'
                                        }}
                                        colorScheme="purple"
                                    />
                                </InputGroup>
                            </Flex>
                            <Flex align={'center'}>
                                <InputGroup alignItems={'center'}>
                                    <InputLeftElement pointerEvents='none' h={'40px'} pl={2}>
                                        <Box as="img" src={password} w={6} h={6} />
                                    </InputLeftElement>
                                    <Input
                                        type="password"
                                        variant={'unstyled'}
                                        pl={10}
                                        placeholder="Senha"
                                        w={'300px'}
                                        h={'40px'}
                                        bg={'#151316'}
                                        color={'#A4A4A4'}
                                        borderRadius={'6px'}
                                        border={'1px solid #A4A4A4'}

                                        _focus={{
                                            borderColor: '#ffffff'
                                        }}
                                    />
                                </InputGroup>
                            </Flex>
                        </Flex>
                        <Flex mt={10} w={'100%'} justifyContent={'center'}>
                            <Button bgGradient={'linear(to-r, #9C3FE4, #C65647)'} w={'100%'} h={'50px'} borderRadius={'15px'} type="submit">
                                <Text color={'#fff'}>
                                    Entrar
                                </Text>
                            </Button>
                        </Flex>
                    </form>
                </Flex>
            </Flex>
        </Flex >
    )
}