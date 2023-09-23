import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useParams, useNavigate } from 'react-router-dom';

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

function ChangePreferences() {
  const toast = useToast();
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    category: [categories[0]],
  });

  const handleCategoryChange = (selectedOptions) => {
    setFormData({ ...formData, category: selectedOptions });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${uuid}/get_user_info`);
        const { first_name, last_name, categories: userCategories } = response.data.user_info;
        setFormData((prevData) => ({
          ...prevData,
          firstName: first_name,
          lastName: last_name,
          category: userCategories.map((categoryValue) =>
            categories.find((category) => category.value === categoryValue) || categories[0]
          ),
        }));
        if (response.data.user_info.validated === 'false') {
          toast({
            title: 'Error',
            description: 'Please validate your email before updating your preferences',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          navigate('/');
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error.response.data.error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        navigate('/');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      uuid: uuid,
      firstName: toTitleCase(formData.firstName.trim()),
      lastName: toTitleCase(formData.lastName.trim()),
      category: formData.category,
    };
    if (userData.category.length > 0) {
      try {
        const response = await axios.post(`${API_URL}/update_user_preferences`, userData);
        console.log(response.data);
        toast({
          title: 'Success!',
          description: response.data.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Error updating preferences:', error);
        toast({
          title: 'Error Updating Preferences',
          description: error.response.data.error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Error',
        description: 'Please select at least one category.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
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
            Hello {formData.firstName} {formData.lastName}! You have the option to update your
            information and preferences below. Your current preferences are displayed for your
            reference.
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
                <FormLabel>Preferences</FormLabel>
                <Select
                  isRequired
                  closeMenuOnSelect={false}
                  components={makeAnimated()}
                  value={formData.category}
                  isMulti
                  options={categories}
                  onChange={handleCategoryChange}
                />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  type="submit"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Update Preferences
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
        <Text fontSize={'xs'} color={'gray.600'} textAlign={'center'}>
          If our email is not visible, please check your spam folder. You can modify your preferences and update your name either by re-registering for our newsletter, with no duplicates recorded, or by visiting the specific endpoint in each email to make changes. To unsubscribe, simply click the link at the email's bottom.
        </Text>
      </Stack>
    </Flex>
  );
}

function toTitleCase(text) {
  return text.toLowerCase().replace(
    /(?<![^\s\p{Pd}])[^\s\p{Pd}]/ug, match => match.toUpperCase()
  );
}

export default ChangePreferences;
