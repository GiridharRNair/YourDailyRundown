import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Textarea,
  Stack,
  Button,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_FLASK_BACKEND;

function Unsubscribe() {
  const toast = useToast();
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${uuid}/get_user_info`);
        const { first_name, last_name } = response.data.user_info;
        setFormData((prevData) => ({
          ...prevData,
          firstName: first_name,
          lastName: last_name,
        }));
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
  }, [uuid, navigate, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      uuid: uuid,
      feedback: feedback,
    };
    try {
        const response = await axios.post(`${API_URL}/unsubscribe`, userData);
        console.log(response.data);
        toast({
          title: 'Success!',
          description: response.data.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        navigate('/');
    } catch (error) {
        console.error('Error unsubscribing:', error);
        toast({
          title: 'Error!',
          description: error.response.data.error,
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
            Hello {formData.firstName} {formData.lastName}! Thanks for being part of the YourDailyRundown community!
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
              <FormControl id="feedback">
                <FormLabel textAlign="center">Feedback</FormLabel>
                <Textarea
                  type="text"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  size="lg" 
                />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit" 
                >
                  Unsubscribe
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Unsubscribe;
