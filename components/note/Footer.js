import Link from 'next/link';
import { Box, Flex, Center, Link as ChakraLink } from '@chakra-ui/react';

const Footer = ({ title }) => {
  return (
    <Center
      mt="6"
      p="4"
      as="footer"
      borderTopWidth="1px"
      borderTopColor="gray.300"
    >
      <Box>
        &copy; 2020 - {new Date().getFullYear()}{' '}
        <Link href="/" as="/">
          <ChakraLink fontWeight="semibold">codehex</ChakraLink>
        </Link>
      </Box>
    </Center>
  );
};

export default Footer;
