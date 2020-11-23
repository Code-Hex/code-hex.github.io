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
      <Flex flexDirection="row" minH="100%">
        <Box fontWeight="semibold" color="green.500" px="2">
          <Link href="/note" as="/note">
            <a>{title}</a>
          </Link>
        </Box>
        <Box>by</Box>
        <Box px="2" fontWeight="semibold">
          <Link href="/" as="/">
            <a>codehex</a>
          </Link>
        </Box>
        <Box> &copy; 2020 - {new Date().getFullYear()}</Box>
      </Flex>
    </Center>
  );
};

export default Footer;
