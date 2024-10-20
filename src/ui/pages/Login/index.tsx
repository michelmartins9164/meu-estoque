import { Box, Button, Flex, FormControl, FormErrorMessage, Input, InputGroup, InputLeftElement, Text, useToast } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useForm } from "react-hook-form"
import { auth } from '../../../api/firebase'
import password from '../../../assets/password.svg'
import user from '../../../assets/user.svg'
import { useNavigate } from 'react-router-dom'
type FormData = {
    email: string
    password: string
}
export default function Login() {
    const navigate = useNavigate()
    const toast = useToast()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    async function SingIn({
        email,
        password
    }: {
        email: string
        password: string
    }) {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/home')
        } catch (err) {
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
                    <form onSubmit={handleSubmit((data) => SingIn({
                        email: data.email,
                        password: data.password
                    }))}>
                        <Flex flexDir={'column'} w={'100%'} justifyContent={'center'} align={'center'}>
                            <Flex align={'center'} mb={4}>
                                <FormControl isInvalid={!!errors.email}>
                                    <InputGroup alignItems={'center'}>
                                        <InputLeftElement pointerEvents='none' h={'40px'} pl={2}>
                                            <Box as="img" src={user} w={6} h={6} />
                                        </InputLeftElement>
                                        <Input
                                        {...register('email', { required: 'Campo obrigatório' })}
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
                                    <FormErrorMessage>
                                        {errors.email?.message}
                                    </FormErrorMessage>
                                </FormControl>
                            </Flex>
                            <Flex align={'center'}>
                                <FormControl isInvalid={!!errors.password}>
                                    <InputGroup alignItems={'center'}>
                                        <InputLeftElement pointerEvents='none' h={'40px'} pl={2}>
                                            <Box as="img" src={password} w={6} h={6} />
                                        </InputLeftElement>
                                        <Input
                                        {...register('password', { required: 'Campo obrigatório' })}
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
                                    <FormErrorMessage>
                                        {errors.password?.message}
                                    </FormErrorMessage>
                                </FormControl>
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