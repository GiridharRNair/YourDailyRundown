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
import Typewriter from "typewriter-effect";

const API_URL = "http://127.0.0.1:8000"; 
const categories = ['Business', 'Entertainment', 'General', 'Health', 'Science', 'Sports', 'Technology'];

const App = () => {
  const toast = useToast()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState([]);

  const handleSubmit = (e) => {
    userData = {
      firstName,
      lastName,
      email,
      category,
    }
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
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Your Daily Rundown")
                    .pauseFor(3000)
                    .deleteAll()
                    .typeString("Subscribe Now!")
                    .start();
                  }}
                />
              </Heading>
              <Text fontSize={'md'} color={'gray.600'} textAlign={'center'}>
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
                      }}
                    >
                      Sign up
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
            <Text fontSize={'xs'} color={'gray.600'} textAlign={'center'}>
              You can update your preferences and name by registering for our newsletter. We ensure no duplicate emails, and your changes will be recorded. To unsubscribe, click the link provided at the bottom of each email.
            </Text>
        </Stack>
      </Flex>
  )
}

export default App;
