import React, { useState } from 'react';
import axios from 'axios';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Typewriter from 'typewriter-effect';
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
} from '@chakra-ui/react';

const API_URL = import.meta.env.VITE_FLASK_BACKEND;
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

const HomePage = () => {
  const toast = useToast();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    category: [categories[0]],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.category.length > 0) {
      try {
        const response = await axios.post(`${API_URL}/register_user`, formData);
        toast({
          title: 'Success!',
          description: response.data.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error submitting data:", error);
        toast({
          title: 'Error Creating Account',
          description: error.response.data.error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Error creating account.',
        description: "Please select at least one category.",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleCategoryChange = (selectedOptions) => {
    setFormData({ ...formData, category: selectedOptions });
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
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            If our email is not visible, please check your spam folder. You can modify your preferences and update your name by visiting the specific link in each email to make changes. To unsubscribe, simply click the link at the email's bottom.
        </Text>
      </Stack>
    </Flex>
  );
};

export default HomePage;
