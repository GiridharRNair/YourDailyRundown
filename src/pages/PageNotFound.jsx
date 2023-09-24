import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

function PageNotFound() {
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        navigate('/');

        toast({
            title: 'Page Not Found',
            description: 'Redirected to home page',
            status: 'error',
            duration: 9000,
            isClosable: true,
        });
    }, [navigate, toast]);
    
    return null;
}

export default PageNotFound