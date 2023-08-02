import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react';
import axios from 'axios';
import Select from "react-select";
import makeAnimated from "react-select/animated";

const API_URL = "http://127.0.0.1:8000"; // Replace this with your Flask backend URL
const categories = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];

export default function SignupCard() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            firstName,
            lastName,
            email,
            category,
        };
        axios.post(`${API_URL}/register_user`, userData)
            .then((response) => {
                console.log(response.data);
                // Handle successful response here (e.g., show a success message)
            })
            .catch((error) => {
                console.error("Error submitting data:", error);
                // Handle error here (e.g., show an error message)
            });
    };

    const handleCategoryChange = (selectedOptions) => {
        setCategory(selectedOptions);
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Stack spacing={5} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'3xl'} textAlign={'center'}>
                        Your Daily Rundown
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'} textAlign={'center'}>
                        Stay informed with our newsletter! Get the latest news, curated and summarized to suit your preferences. Subscribe now!
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                >
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input 
                                            type="text" 
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName" isRequired>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input 
                                            type="text" 
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input 
                                    type="email" 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel>Prefrences</FormLabel>
                                <Select
                                    isRequired
                                    closeMenuOnSelect={false}
                                    components={makeAnimated()}
                                    defaultValue={[{ value: categories[0], label: categories[0] }]}
                                    isMulti
                                    options={categories.map((category) => ({ value: category, label: category }))}
                                    onChange={handleCategoryChange}
                                />
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    type='submit'
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
                <Text fontSize={'xs'} color={'gray.600'} textAlign={'center'}>
                    By modifying your preferences during re-registration, you can avoid receiving multiple emails under the same address from our newsletter. Rest assured, your updated choices will be recorded. Additionally, you can unsubscribe from our newsletter by clicking the link provided at the end of each email.
                </Text>
            </Stack>
        </Flex>
    )
}