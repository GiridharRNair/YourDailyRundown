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
    useToast
} from '@chakra-ui/react'
import { useState } from 'react';
import axios from 'axios';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_FLASK_BACKEND; 
// const API_URL = 'http://127.0.0.1:5000'
const categories = [
    { value: 'arts', label: 'Arts' },
    { value: 'automobiles', label: 'Automobiles' },
    { value: 'business', label: 'Business' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'food', label: 'Food' },
    { value: 'health', label: 'Health' },
    { value: 'home', label: 'Home' },
    { value: 'insider', label: 'Insider' },
    { value: 'magazine', label: 'Magazine' },
    { value: 'movies', label: 'Movies' },
    { value: 'politics', label: 'Politics' },
    { value: 'realestate', label: 'Real Estate' },
    { value: 'nyregion', label: 'New York Region' },
    { value: 'science', label: 'Science' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' },
    { value: 'theater', label: 'Theater' },
    { value: 'travel', label: 'Travel' },
    { value: 'us', label: 'US' },
    { value: 'world', label: 'World' },
];

function ChangePreferences() {
    const toast = useToast()
    const { email } = useParams()
    const [category, setCategory] = useState([categories[0]]);

    const handleCategoryChange = (selectedOptions) => {
        setCategory(selectedOptions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {email, category}
        if (userData.category.length > 0) {
            axios.post(`${API_URL}/register_user`, userData)
            .then((response) => {
                console.log(response.data);
                toast({
                title: 'Success!',
                description: response.data.message,
                status: 'success',
                duration: 9000,
                isClosable: true,
                })
            })
            .catch((error) => {
                console.error("Error submitting data:", error);
                toast({
                title: 'Error creating account.',
                description: "We've encountered an error, check back later.",
                status: 'error',
                duration: 9000,
                isClosable: true,
                })
            });
        } else {
            toast({
            title: 'Error creating account.',
            description: "Please select at least one category.",
            status: 'error',
            duration: 9000,
            isClosable: true,
            })
        }
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
                    <Text fontSize={'md'} color={'gray.600'} textAlign={'center'}>
                        Stay informed and subscribe to our newsletter for the latest news! Each day at 8am CST, we curate and summarize the most relevant updates tailored to your interests. Join now!
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
                        <FormControl id="email" isRequired>
                            <FormLabel>Preferences</FormLabel>
                            <Select
                                isRequired
                                closeMenuOnSelect={false}
                                components={makeAnimated()}
                                defaultValue={categories[0]}
                                isMulti
                                options={categories}
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
                                }}
                            >
                                Change Preferences
                            </Button>
                        </Stack>
                    </Stack>
                </form>
                </Box>
                <Text fontSize={'xs'} color={'gray.600'} textAlign={'center'}>
                    Some news information may be incorrect or duplicated across categories. If you don't see our email, check the spam folder. Update your preferences and name by re-registering for our newsletter; no duplicates will be recorded. To unsubscribe, click the link at the bottom of each email.
                </Text>
            </Stack>
        </Flex>
    )
}

export default ChangePreferences