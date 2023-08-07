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
import Typewriter from 'typewriter-effect';

const API_URL = import.meta.env.VITE_FLASK_BACKEND; 
// const API_URL = 'http://127.0.0.1:5000/'
const categories = [
  { value: 'Business', label: 'Business' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'General', label: 'General' },
  { value: 'Health', label: 'Health' },
  { value: 'Science', label: 'Science' },
  { value: 'Sports', label: 'Sports' },
  { value: 'Technology', label: 'Technology' },
];


const App = () => {
  const toast = useToast()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState([categories[0]]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName,
      lastName,
      email,
      category,
    }
    if (userData.category.length > 0) {
      axios.post(`${API_URL}/register_user`, userData)
        .then((response) => {
          console.log(response.data);
          toast({
            title: 'Account created.',
            description: "We've created your account for you.",
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
            <Typewriter
              options={{
                strings: ['Your Daily Rundown', 'Subscribe Now!'],
                autoStart: true,
                loop: true,
              }}
            />
            </Heading>
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
                    Sign up
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

export default App;
